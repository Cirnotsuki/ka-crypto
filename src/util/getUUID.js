const getRandomValues = require("./getRandomValues");

module.exports = function getUUID() {
  const SplitNumber = [3, 5, 7, 9];
  const Verify =
    /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i;

  const HexList = [];

  for (let u = 0; u < 256; ++u) {
    HexList.push((u + 256).toString(16).substr(1));
  }

  return function (simplify) {
    // Create Ramdon Ranges
    const range = getRandomValues(new Uint8Array(16));

    let result = "";

    range[6] = (range[6] & 0x0f) | 0x40;
    range[8] = (range[8] & 0x3f) | 0x80; // Copy bytes to buffer, if provided

    // Generate UUID
    for (let i = 0; i < 16; ++i) {
      result += HexList[range[i]];
      SplitNumber.indexOf(i) >= 0 && (result += "-");
    }
    // Verify UUID
    if (typeof result === "string" && Verify.test(result)) {
      return simplify ? result.replace(/-/g, "") : result;
    }
    throw TypeError("Stringified UUID is invalid");
  };
};
