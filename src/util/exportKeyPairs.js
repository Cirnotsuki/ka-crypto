const fs = require("fs");
const path = require("path");
const keyPairs = require("../core/keyPair");
const isNode = require("../runtime/isNode");

module.exports = async function exportKeyPairs(dist) {
  if (isNode()) {
    const [publicKey, privateKey] = await keyPairs();

    // Node 直接写入本地文件
    fs.writeFileSync(path.join(dist, "public.pem"), publicKey, "utf-8");
    fs.writeFileSync(path.join(dist, "private.pem"), privateKey, "utf-8");
    return;
  }

  throw new Error("require Node runtime environment");
};
