const fs = require("fs");
const path = require("path");

const from = path.resolve(__dirname, "./src/index.d.ts");
const to = path.resolve(__dirname, "./dist/index.d.ts");

fs.mkdirSync(path.dirname(to), { recursive: true });
fs.copyFileSync(from, to);

console.log("types copied to dist");
