let crypto;

// Native crypto from window (Browser)
if (typeof window !== "undefined" && window.crypto) {
  crypto = window.crypto;
}

// Native crypto in web worker (Browser)
if (typeof self !== "undefined" && self.crypto) {
  crypto = self.crypto;
}

// Native crypto from worker
if (typeof globalThis !== "undefined" && globalThis.crypto) {
  crypto = globalThis.crypto;
}

// Native (experimental IE 11) crypto from window (Browser)
// @ts-ignore
if (!crypto && typeof window !== "undefined" && window.msCrypto) {
  // @ts-ignore
  crypto = window.msCrypto;
}

// Native crypto from global (NodeJS)
if (!crypto && typeof global !== "undefined" && global.crypto) {
  crypto = global.crypto;
}

// Native crypto import via require (NodeJS)
if (!crypto && typeof require === "function") {
  try {
    crypto = require("crypto").webcrypto;
  } catch (err) {}
}

let subtle;
if (typeof crypto.subtle !== "undefined") {
  subtle = crypto.subtle;
}

module.exports = subtle;
