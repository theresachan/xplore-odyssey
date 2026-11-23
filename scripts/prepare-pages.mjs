import { copyFileSync, existsSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const out = join(process.cwd(), ".output", "public");
const index = join(out, "index.html");

if (!existsSync(index)) {
  console.error("Missing .output/public/index.html — build may have failed.");
  process.exit(1);
}

copyFileSync(index, join(out, "404.html"));
writeFileSync(join(out, ".nojekyll"), "");

// A prerender artifact named ".html" makes GitHub Pages serve / as
// application/octet-stream (browser downloads instead of rendering).
for (const junk of [".html", "_headers"]) {
  const path = join(out, junk);
  if (existsSync(path)) unlinkSync(path);
}

console.log("Prepared GitHub Pages output in .output/public");
