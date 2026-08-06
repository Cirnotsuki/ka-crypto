import { getSubtle } from '../core/getSubtle';
const HEX = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0'));

function normalize(data: string | Uint8Array) {
	const encoder = new TextEncoder();
	if (typeof data === 'string') {
		return encoder.encode(data) as BufferSource;
	}
	return data as BufferSource;
}

function bufferToHex(buffer: ArrayBuffer): string {
	const bytes = new Uint8Array(buffer);
	const chars = new Array(bytes.length);
	for (let i = 0; i < bytes.length; i += 1) {
		chars[i] = HEX[bytes[i]];
	}
	return chars.join('');
}

async function digest(algorithm: string, data: string | Uint8Array, raw: boolean) {
	const buffer = await getSubtle().digest(algorithm, normalize(data));

	if (raw) {
		return new Uint8Array(buffer);
	}

	return bufferToHex(buffer);
}

export function sha1(data: string | Uint8Array, raw = false) {
	return digest('SHA-1', data, raw);
}

export function sha256(data: string | Uint8Array, raw = false) {
	return digest('SHA-256', data, raw);
}

export function sha384(data: string | Uint8Array, raw = false) {
	return digest('SHA-384', data, raw);
}

export function sha512(data: string | Uint8Array, raw = false) {
	return digest('SHA-512', data, raw);
}
