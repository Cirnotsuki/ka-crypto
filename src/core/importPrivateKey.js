const base64ToArrayBuffer = require('../lib/base64ToArrayBuffer');
// @ts-ignore
const subtle = require("../lib/requreSubtle");

module.exports = async function importPrivateKey(key) {
  const keyBuffer = base64ToArrayBuffer(key);
  // @ts-ignore
  return subtle.importKey(
    "pkcs8",
    keyBuffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-1",
    },
    false,
    ["decrypt"],
  );
};
