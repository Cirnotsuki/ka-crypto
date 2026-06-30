/**
 * 判断当前是否为 Node 环境
 */
module.exports = function isNode() {
  return typeof process !== "undefined" && process.versions?.node;
};
