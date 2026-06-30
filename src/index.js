// 替换你原来的 module.exports = {}
const getRandomValues = require("./util/getRandomValues");
const exportKeyPairs = require("./util/exportKeyPairs");
const getUUID = require("./util/getUUID");

const keyPairs = require("./core/keyPair");
const encrypt = require("./cripter/encrypt");
const decrypt = require("./cripter/decrypt");
const rsaEncrypt = require("./cripter/rsaEncrypt");
const rsaDecrypt = require("./cripter/rsaDecrypt");
const aesEncrypt = require("./cripter/aesEncrypt");
const aesDecrypt = require("./cripter/aesDecrypt");

// 逐条静态导出，无动态对象
exports.exportKeyPairs = exportKeyPairs;
exports.getRandomValues = getRandomValues;
exports.getUUID = getUUID;

exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.rsaEncrypt = rsaEncrypt;
exports.rsaDecrypt = rsaDecrypt;
exports.aesEncrypt = aesEncrypt;
exports.aesDecrypt = aesDecrypt;
// 兼容默认导出
exports.default = {
  exportKeyPairs,
  getRandomValues,
  getUUID,
  keyPairs,
  encrypt,
  decrypt,
  rsaEncrypt,
  rsaDecrypt,
  aesEncrypt,
  aesDecrypt,
};
