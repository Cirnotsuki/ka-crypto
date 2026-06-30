const arrayBufferToBase64 = require('../lib/arrayBufferToBase64');
const importPublicKey = require("../core/importPublicKey");
const subtle = require("../lib/requreSubtle");

/**
 * RSA加密
 */
module.exports = async function (data, publicKey) {
  const key = await importPublicKey(publicKey);
  const encrypted = await subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    key,
    new TextEncoder().encode(JSON.stringify(data)),
  );

  return arrayBufferToBase64(encrypted);
};
