const aesDecrypt = require("./aesDecrypt");
const rsaDecrypt = require("./rsaDecrypt");

/**
 * 混合解密
 */
module.exports = async function (data, valid, privateKey) {
  try {
    const aes = await rsaDecrypt(valid, privateKey);

    return aesDecrypt(data, aes.key, aes.iv);
  } catch (error) {
    console.error(error);
    return null;
  }
};
