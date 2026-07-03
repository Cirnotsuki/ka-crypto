export default {
  input: "./src/index.ts",
  dist: "./dist",
  formats: ["cjs", "esm"],
  external: ["crypto", "fs", "path"],
};
