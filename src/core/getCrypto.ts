export function getCrypto(): Crypto {
	// Native crypto from window (Browser)
	if (typeof window !== "undefined" && window.crypto) {
		return window.crypto;
	}

	// Native crypto in web worker (Browser)
	if (typeof self !== "undefined" && self.crypto) {
		return self.crypto;
	}

	// Native crypto from worker
	if (typeof globalThis !== "undefined" && globalThis.crypto) {
		return globalThis.crypto;
	}

	// Native (experimental IE 11) crypto from window (Browser)
	if (typeof window !== "undefined" && (window as any).msCrypto) {
		return (window as any).msCrypto as Crypto;
	}

	// Native crypto from global (NodeJS)
	if (typeof global !== "undefined" && global.crypto) {
		return global.crypto;
	}

	// Native crypto import via require (NodeJS)
	if (typeof require === "function") {
		return require("crypto").webcrypto as Crypto;
	}

	throw new Error("WebCrypto not available");
}
