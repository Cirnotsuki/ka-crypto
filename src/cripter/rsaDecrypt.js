const base64ToArrayBuffer = require('../lib/base64ToArrayBuffer');
const importPrivateKey = require('../core/importPrivateKey');
const subtle = require("../lib/requreSubtle");

  /**
   * RSA解密
   */
  module.exports = async function(data, privateKey) {
    const key = await importPrivateKey(privateKey);

    const decrypted = await subtle.decrypt(
      {
        name: "RSA-OAEP",
      },
      key,
      base64ToArrayBuffer(data),
    );

    return JSON.parse(new TextDecoder().decode(decrypted));
  }