// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages project sites live under /<repo>/ — set BASE_PATH=/xplore-odyssey/ in CI.
const rawBase = process.env.BASE_PATH || "/";
const base = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;
const startPath = base === "/" ? "/" : base.replace(/\/$/, "");

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    spa: {
      enabled: true,
      prerender: {
        outputPath: "/",
        crawlLinks: true,
        autoSubfolderIndex: true,
      },
    },
    prerender: {
      enabled: true,
      crawlLinks: true,
      autoSubfolderIndex: true,
      // os.cpus() can be 0 in constrained CI/sandbox → queue never drains
      concurrency: 4,
      failOnError: false,
      pages: [{ path: startPath }],
    },
  },
  vite: {
    base,
  },
});
