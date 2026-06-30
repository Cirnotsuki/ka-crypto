const base64Cleaner = require("./base64Cleaner");
module.exports = function base64ToArrayBuffer(input) {
  const base64 = base64Cleaner(input);

  if (typeof Buffer !== "undefined") {
    const buffer = Buffer.from(base64, "base64");
    return Uint8Array.from(buffer).buffer;
  }

  const binary = atob(base64);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0)).buffer;
};
