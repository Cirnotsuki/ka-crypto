import path from "path";
import fs from "fs";
import { exportKeyPairs } from "../dist/esm/lib/exportKeyPairs.js";
const [dist = ""] = process.argv.slice(2); // 去掉前两个系统参数

if (!dist) {
  console.error("请指定输出目录");
  process.exit(1);
}

try {
  fs.mkdirSync(dist, { recursive: true });
} catch (error) {}

exportKeyPairs(path.resolve("./", dist));
