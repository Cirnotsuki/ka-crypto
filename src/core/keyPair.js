const arrayBufferToBase64 = require("../lib/arrayBufferToBase64");
// @ts-ignore
const subtle = require("../lib/requreSubtle");

module.exports = async function () {
  const keyPair = await subtle.generateKey(
    {
      name: "RSA-OAEP",
      // @ts-ignore
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-1",
    },
    true,
    ["encrypt", "decrypt"],
  );

  const publicKey =
    "-----BEGIN PUBLIC KEY-----\n" +
    arrayBufferToBase64(
      // @ts-ignore
      await subtle.exportKey("spki", keyPair.publicKey),
    ) +
    "\n-----END PUBLIC KEY-----";

  const privateKey =
    "-----BEGIN PRIVATE KEY-----\n" +
    arrayBufferToBase64(
      // @ts-ignore
      await subtle.exportKey("pkcs8", keyPair.privateKey),
    ) +
    "\n-----END PRIVATE KEY-----";

  return [publicKey, privateKey];
};
