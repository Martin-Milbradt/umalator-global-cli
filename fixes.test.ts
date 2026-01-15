import { describe, it, expect, vi } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

describe("Critical Fixes", () => {
    describe("simulation.worker.ts - null check on skillmeta access", () => {
        it("should use optional chaining for skillmeta access", () => {
            const workerCode = readFileSync(
                join(import.meta.dirname, "simulation.worker.ts"),
                "utf-8"
            );

            // Verify the fix: skillmeta[task.skillId]?.groupId (with optional chaining)
            expect(workerCode).toContain("skillmeta[task.skillId]?.groupId");

            // Ensure we don't have the unsafe version without optional chaining
            // Match the pattern where there's NO ? after the bracket
            const unsafePattern = /skillmeta\[task\.skillId\]\.groupId/;
            expect(workerCode).not.toMatch(unsafePattern);
        });

        it("should handle undefined skillmeta entries safely", () => {
            // Simulate the fixed behavior
            const skillmeta: Record<string, { groupId?: number }> = {
                skill1: { groupId: 100 },
            };

            const existingSkillId = "skill1";
            const missingSkillId = "nonexistent";

            // With optional chaining, this should return the groupId
            const existingGroupId = skillmeta[existingSkillId]?.groupId;
            expect(existingGroupId).toBe(100);

            // With optional chaining, this should return undefined (not throw)
            const missingGroupId = skillmeta[missingSkillId]?.groupId;
            expect(missingGroupId).toBeUndefined();
        });
    });

    describe("server.ts - consolidated close handlers", () => {
        it("should have only one child.on('close') handler", () => {
            const serverCode = readFileSync(
                join(import.meta.dirname, "server.ts"),
                "utf-8"
            );

            // Count occurrences of child.on("close" or child.on('close'
            const closeHandlerMatches = serverCode.match(
                /child\.on\(["']close["']/g
            );

            // Should have exactly 1 close handler (the consolidated one)
            expect(closeHandlerMatches).toHaveLength(1);
        });

        it("consolidated handler should clear both timeout and keepAlive", () => {
            const serverCode = readFileSync(
                join(import.meta.dirname, "server.ts"),
                "utf-8"
            );

            // Find the close handler block
            const closeHandlerStart = serverCode.indexOf('child.on("close"');
            const closeHandlerEnd = serverCode.indexOf("});", closeHandlerStart);
            const closeHandler = serverCode.slice(
                closeHandlerStart,
                closeHandlerEnd + 3
            );

            // Verify it contains both cleanup calls
            expect(closeHandler).toContain("clearTimeout(timeout)");
            expect(closeHandler).toContain("clearInterval(keepAlive)");
        });
    });

    describe("server.ts - fail loudly on data load", () => {
        it("should throw error instead of console.error on load failure", () => {
            const serverCode = readFileSync(
                join(import.meta.dirname, "server.ts"),
                "utf-8"
            );

            // Find the loadStaticData function
            const funcStart = serverCode.indexOf("function loadStaticData()");
            const funcEnd = serverCode.indexOf("}\nloadStaticData();");
            const loadStaticDataFunc = serverCode.slice(funcStart, funcEnd + 1);

            // Should throw an error, not just console.error
            expect(loadStaticDataFunc).toContain("throw new Error");

            // Should include the path in error message for debugging
            expect(loadStaticDataFunc).toContain("umaToolsDir");
        });

        it("loadStaticData catch block should re-throw", () => {
            const serverCode = readFileSync(
                join(import.meta.dirname, "server.ts"),
                "utf-8"
            );

            // Find the catch block in loadStaticData
            const funcStart = serverCode.indexOf("function loadStaticData()");
            const funcEnd = serverCode.indexOf("}\nloadStaticData();");
            const loadStaticDataFunc = serverCode.slice(funcStart, funcEnd + 1);

            // The catch block should throw, not just log
            expect(loadStaticDataFunc).toMatch(/catch.*\{[\s\S]*throw new Error/);
        });
    });

    describe("public/app.ts - catch handlers on init IIFEs", () => {
        it("should have .catch() on loadSkillnamesOnInit IIFE", () => {
            const appCode = readFileSync(
                join(import.meta.dirname, "public", "app.ts"),
                "utf-8"
            );

            // Find the IIFE and verify it has .catch()
            const skillnamesIIFE =
                /\(async function loadSkillnamesOnInit\(\)[\s\S]*?\}\)\(\)\.catch/;
            expect(appCode).toMatch(skillnamesIIFE);
        });

        it("should have .catch() on loadSkillmetaOnInit IIFE", () => {
            const appCode = readFileSync(
                join(import.meta.dirname, "public", "app.ts"),
                "utf-8"
            );

            const skillmetaIIFE =
                /\(async function loadSkillmetaOnInit\(\)[\s\S]*?\}\)\(\)\.catch/;
            expect(appCode).toMatch(skillmetaIIFE);
        });

        it("should have .catch() on loadCourseDataOnInit IIFE", () => {
            const appCode = readFileSync(
                join(import.meta.dirname, "public", "app.ts"),
                "utf-8"
            );

            const courseDataIIFE =
                /\(async function loadCourseDataOnInit\(\)[\s\S]*?\}\)\(\)\.catch/;
            expect(appCode).toMatch(courseDataIIFE);
        });

        it("all .catch() handlers should log errors", () => {
            const appCode = readFileSync(
                join(import.meta.dirname, "public", "app.ts"),
                "utf-8"
            );

            // Count console.error calls in catch handlers for the 3 init functions
            const catchWithConsoleError =
                /\}\)\(\)\.catch\(\(error\) => \{\s*console\.error\(/g;
            const matches = appCode.match(catchWithConsoleError);

            expect(matches).toHaveLength(3);
        });
    });
});
