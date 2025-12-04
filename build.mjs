import * as esbuild from "esbuild";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(dirname, "..", "uma-tools");

const redirectData = {
    name: "redirectData",
    setup(build) {
        build.onResolve({ filter: /skill_data\.json$/ }, (args) => ({
            path: path.join(root, "umalator-global", "skill_data.json"),
        }));
        build.onResolve({ filter: /skill_meta\.json$/ }, (args) => ({
            path: path.join(root, "umalator-global", "skill_meta.json"),
        }));
        build.onResolve({ filter: /course_data\.json$/ }, (args) => ({
            path: path.join(root, "umalator-global", "course_data.json"),
        }));
        build.onResolve({ filter: /skillnames\.json$/ }, (args) => ({
            path: path.join(root, "umalator-global", "skillnames.json"),
        }));
    },
};

const buildOptions = {
    entryPoints: ["cli.ts"],
    bundle: true,
    platform: "node",
    target: "node18",
    format: "cjs",
    outfile: "cli.js",
    define: { CC_GLOBAL: "false" },
    plugins: [redirectData],
};

const workerBuildOptions = {
    entryPoints: ["simulation.worker.ts"],
    bundle: true,
    platform: "node",
    target: "node18",
    format: "cjs",
    outfile: "simulation.worker.js",
    define: { CC_GLOBAL: "false" },
    plugins: [redirectData],
};

try {
    await Promise.all([esbuild.build(buildOptions), esbuild.build(workerBuildOptions)]);
} catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
}
