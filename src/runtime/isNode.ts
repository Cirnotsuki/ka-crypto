/**
 * 判断当前是否为 Node 环境
 */
export function isNode() {
  return typeof process !== "undefined" && process.versions?.node;
}
