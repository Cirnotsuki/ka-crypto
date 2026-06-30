const base64ToArrayBuffer = require('../lib/base64ToArrayBuffer');
// @ts-ignore
const subtle = require("../lib/requreSubtle");

module.exports = async function (key) {
  const keyBuffer = base64ToArrayBuffer(key);
  // @ts-ignore
  return subtle.importKey(
    "spki",
    keyBuffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-1",
    },
    false,
    ["encrypt"],
  );
};
