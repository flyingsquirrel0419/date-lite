const { execFileSync } = require("node:child_process");
const { mkdtempSync, rmSync, unlinkSync } = require("node:fs");
const { tmpdir } = require("node:os");
const path = require("node:path");

const rootDir = process.cwd();
const tempDir = mkdtempSync(path.join(tmpdir(), "date-light-package-"));
let tarballPath;

function run(command, args, options = {}) {
  execFileSync(command, args, {
    cwd: options.cwd ?? rootDir,
    stdio: "inherit",
  });
}

try {
  const tarballName = execFileSync("npm", ["pack", "--silent"], {
    cwd: rootDir,
    encoding: "utf8",
  }).trim();
  tarballPath = path.join(rootDir, tarballName);

  run("npm", ["install", tarballPath, "--ignore-scripts", "--no-audit", "--no-fund"], {
    cwd: tempDir,
  });

  run(
    "node",
    [
      "-e",
      "const lib = require('date-light'); if (typeof lib.format !== 'function') throw new Error('CJS entrypoint failed')",
    ],
    { cwd: tempDir },
  );

  run(
    "node",
    [
      "--input-type=module",
      "-e",
      "const lib = await import('date-light'); if (typeof lib.format !== 'function') throw new Error('ESM entrypoint failed')",
    ],
    { cwd: tempDir },
  );
} finally {
  if (tarballPath) {
    try {
      unlinkSync(tarballPath);
    } catch {
      // The pack command failed before creating a tarball.
    }
  }
  rmSync(tempDir, { recursive: true, force: true });
}
