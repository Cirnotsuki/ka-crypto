const arrayBufferToBase64 = require('../lib/arrayBufferToBase64');
const subtle = require('../lib/requreSubtle');
const randomBytes = require('../core/randomBytes');

/**
 * AES加密
 */
module.exports = async function (
  data,
  aesKey = randomBytes(32),
  aesIv = randomBytes(16),
) {
  // @ts-ignore
  const cryptoKey = await subtle.importKey(
    "raw",
    aesKey,
    {
      name: "AES-GCM",
    },
    false,
    ["encrypt"],
  );

  const aesEncrypted = await subtle.encrypt(
    {
      name: "AES-GCM",
      iv: aesIv,
    },
    cryptoKey,
    new TextEncoder().encode(JSON.stringify(data)),
  );

  return {
    data: arrayBufferToBase64(aesEncrypted),
    key: arrayBufferToBase64(aesKey),
    iv: arrayBufferToBase64(aesIv),
  };
};
