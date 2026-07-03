import { base64Cleaner } from "./base64Cleaner";

export function base64ToArrayBuffer(input: Base64URLString): ArrayBuffer {
	const base64 = base64Cleaner(input);

	// Node.js
	if (typeof globalThis.Buffer !== "undefined") {
		const buf = globalThis.Buffer.from(base64, "base64");

		return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
	}

	// Browser
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);

	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}

	return bytes.buffer;
}
