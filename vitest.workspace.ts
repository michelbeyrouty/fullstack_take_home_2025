import { defineWorkspace } from "vitest/config";

/**
 * Generate workspace config for a monorepo
 * @see https://vitest.dev/guide/workspace
 */
export default defineWorkspace(["**/vite.config.*"]);
