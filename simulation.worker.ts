import { parentPort, workerData } from "worker_threads";
import { CourseData } from "../uma-tools/uma-skill-tools/CourseData";
import { Mood, RaceParameters } from "../uma-tools/uma-skill-tools/RaceParameters";
import { HorseState, SkillSet } from "../uma-tools/components/HorseDefTypes";
import { runComparison } from "../uma-tools/umalator/compare";
import skillmeta from "../uma-tools/skill_meta.json";

interface SimulationTask {
    skillId: string;
    skillName: string;
    course: CourseData;
    racedef: RaceParameters;
    baseUma: any;
    simOptions: any;
    numSimulations: number;
    useRandomMood?: boolean;
    confidenceInterval?: number;
    returnRawResults?: boolean;
}

function convertSkillsToArray(skills: any): string[] {
    if (Array.isArray(skills)) {
        return skills;
    }
    if (skills && typeof skills === "object") {
        return Object.values(skills) as string[];
    }
    return [];
}

function runSkillSimulation(task: SimulationTask) {
    const results: number[] = [];

    // Convert serialized skills object to array of skill IDs
    const baseSkillIds = convertSkillsToArray(task.baseUma.skills);
    const skillIdsWithNewSkill = [...baseSkillIds];
    const newSkillGroupId = skillmeta[task.skillId].groupId;
    // Remove any existing skill with the same groupId and add the new one
    const filteredSkillIds = skillIdsWithNewSkill.filter((id) => skillmeta[id]?.groupId !== newSkillGroupId);
    filteredSkillIds.push(task.skillId);

    if (task.useRandomMood) {
        const moods: Mood[] = [-2, -1, 0, 1, 2];

        for (let i = 0; i < task.numSimulations; i++) {
            const mood = moods[i % moods.length];
            const baseUma = new HorseState({ ...task.baseUma, mood: mood }).set("skills", SkillSet(baseSkillIds));
            const umaWithSkill = new HorseState({ ...task.baseUma, mood: mood }).set(
                "skills",
                SkillSet(filteredSkillIds)
            );
            const singleSimOptions = { ...task.simOptions };
            if (singleSimOptions.seed !== undefined && singleSimOptions.seed !== null) {
                singleSimOptions.seed = singleSimOptions.seed + i;
            }
            const { results: singleResults } = runComparison(
                1,
                task.course,
                task.racedef,
                baseUma,
                umaWithSkill,
                singleSimOptions
            );
            results.push(singleResults[0]);
        }
    } else {
        const baseUma = new HorseState(task.baseUma).set("skills", SkillSet(baseSkillIds));
        const umaWithSkill = new HorseState(task.baseUma).set("skills", SkillSet(filteredSkillIds));
        const { results: batchResults } = runComparison(
            task.numSimulations,
            task.course,
            task.racedef,
            baseUma,
            umaWithSkill,
            task.simOptions
        );
        results.push(...batchResults);
    }

    results.sort((a, b) => a - b);
    const mean = results.reduce((a, b) => a + b, 0) / results.length;
    const min = results[0];
    const max = results[results.length - 1];

    // Calculate median (results are sorted)
    const mid = Math.floor(results.length / 2);
    const median = results.length % 2 === 0 ? (results[mid - 1] + results[mid]) / 2 : results[mid];

    // Calculate confidence interval based on configured percentage
    const ciPercent = task.confidenceInterval ?? 95;
    const lowerPercentile = (100 - ciPercent) / 2;
    const upperPercentile = 100 - lowerPercentile;
    const lower_Index = Math.floor(results.length * (lowerPercentile / 100));
    const upper_Index = Math.floor(results.length * (upperPercentile / 100));
    const ciLower = results[lower_Index];
    const ciUpper = results[upper_Index];

    if (task.returnRawResults) {
        return {
            skillName: task.skillName,
            rawResults: results,
        };
    }

    return {
        skillName: task.skillName,
        mean,
        median,
        min,
        max,
        ciLower,
        ciUpper,
    };
}

if (parentPort && workerData) {
    try {
        const result = runSkillSimulation(workerData as SimulationTask);
        parentPort.postMessage({ success: true, result });
    } catch (error) {
        parentPort.postMessage({ success: false, error: String(error) });
    }
}
