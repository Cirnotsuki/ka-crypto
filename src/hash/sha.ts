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

async function digest(algorithm: string, data: string | Uint8Array, raw: boolean): Promise<Uint8Array | string> {
	const buffer = await getSubtle().digest(algorithm, normalize(data));

	if (raw) {
		return new Uint8Array(buffer);
	}

	return bufferToHex(buffer);
}

export function sha1(data: string | Uint8Array, raw: true): Promise<Uint8Array>;
export function sha1(data: string | Uint8Array, raw: false): Promise<string>;
export function sha1(data: string | Uint8Array): Promise<string>;
export function sha1(data: string | Uint8Array, raw = false) {
	return raw ? digest('SHA-1', data, true) : digest('SHA-1', data, false);
}

export function sha256(data: string | Uint8Array, raw: true): Promise<Uint8Array>;
export function sha256(data: string | Uint8Array, raw: false): Promise<string>;
export function sha256(data: string | Uint8Array): Promise<string>;
export function sha256(data: string | Uint8Array, raw = false) {
	return raw ? digest('SHA-256', data, true) : digest('SHA-256', data, false);
}

export function sha384(data: string | Uint8Array, raw: true): Promise<Uint8Array>;
export function sha384(data: string | Uint8Array, raw: false): Promise<string>;
export function sha384(data: string | Uint8Array): Promise<string>;
export function sha384(data: string | Uint8Array, raw = false) {
	return raw ? digest('SHA-384', data, true) : digest('SHA-384', data, false);
}

export function sha512(data: string | Uint8Array, raw: true): Promise<Uint8Array>;
export function sha512(data: string | Uint8Array, raw: false): Promise<string>;
export function sha512(data: string | Uint8Array): Promise<string>;
export function sha512(data: string | Uint8Array, raw = false) {
	return raw ? digest('SHA-512', data, true) : digest('SHA-512', data, false);
}
