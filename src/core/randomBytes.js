const getRandomValues = require('../util/getRandomValues');

module.exports = function (length = 16) {
  return getRandomValues(new Uint8Array(length));
};
