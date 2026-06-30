const base64ToArrayBuffer = require("../lib/base64ToArrayBuffer");
const subtle = require("../lib/requreSubtle");

/**
 * AES解密
 */
module.exports = async function (data, aesKey, aesIv) {
  try {
    // @ts-ignore
    const cryptoKey = await subtle.importKey(
      "raw",
      base64ToArrayBuffer(aesKey),
      {
        name: "AES-GCM",
      },
      false,
      ["decrypt"],
    );

    const aesDecrypted = await subtle.decrypt(
      {
        name: "AES-GCM",
        iv: new Uint8Array(base64ToArrayBuffer(aesIv)),
      },
      cryptoKey,
      base64ToArrayBuffer(data),
    );

    return JSON.parse(new TextDecoder().decode(aesDecrypted));
  } catch (error) {
    console.error(error);
    return null;
  }
};
