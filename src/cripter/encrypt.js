const aesEncrypt = require("./aesEncrypt");
const rsaEncrypt = require("./rsaEncrypt");

/**
 * 混合加密
 */
module.exports = async function (data, publicKey) {
  if (!publicKey) {
    return null;
  }

  const aes = await aesEncrypt(data);
  const valid = await rsaEncrypt(
    {
      key: aes.key,
      iv: aes.iv,
    },
    publicKey,
  );

  return {
    valid,
    data: aes.data,
  };
};
