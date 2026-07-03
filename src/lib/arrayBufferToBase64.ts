export function arrayBufferToBase64(input: ArrayBuffer | Uint8Array): string {
	const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);

	// Node.js
	if (typeof globalThis.Buffer !== "undefined") {
		return globalThis.Buffer.from(bytes).toString("base64");
	}

	// Browser safe (no stack overflow)
	let binary = "";
	const chunkSize = 0x8000; // 32KB

	for (let i = 0; i < bytes.length; i += chunkSize) {
		binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
	}

	return btoa(binary);
}
