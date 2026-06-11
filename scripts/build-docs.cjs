const { copyFile, mkdir } = require("node:fs/promises");
const path = require("node:path");

async function main() {
  const outDir = path.resolve("dist-docs");
  const indexPath = path.join(outDir, "index.html");

  await mkdir(path.join(outDir, "docs"), { recursive: true });
  await mkdir(path.join(outDir, "playground"), { recursive: true });

  await copyFile(indexPath, path.join(outDir, "404.html"));
  await copyFile(indexPath, path.join(outDir, "docs", "index.html"));
  await copyFile(indexPath, path.join(outDir, "playground", "index.html"));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
