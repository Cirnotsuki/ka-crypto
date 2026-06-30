module.exports = function arrayBufferToBase64(buffer) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(buffer).toString("base64");
  }

  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
};
