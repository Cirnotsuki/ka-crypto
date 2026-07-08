import { arrayBufferToBase64 } from "../lib/arrayBufferToBase64";
import { getSubtle } from "../core/getSubtle";
import { getRandomBytes } from "../lib/getRandomBytes";
import { base64ToArrayBuffer } from "../lib/base64ToArrayBuffer";

/**
 * AES加密
 */
export async function aesEncrypt<T>(data: T, bufferMode: false): Promise<{ data: Base64URLString; payload: Base64URLString }>;

export async function aesEncrypt<T>(data: T, bufferMode: true): Promise<{ data: ArrayBuffer; payload: ArrayBuffer }>;

export async function aesEncrypt<T>(
	data: T,
	aesKey: Base64URLString,
	aesIv: Base64URLString,
	bufferMode: false,
): Promise<{ data: Base64URLString; payload: Base64URLString }>;

export async function aesEncrypt<T>(
	data: T,
	aesKey: Base64URLString,
	aesIv: Base64URLString,
	bufferMode: true,
): Promise<{ data: ArrayBuffer; payload: ArrayBuffer }>;

export async function aesEncrypt<T>(data: T, arg1?: Base64URLString | boolean, arg2?: Base64URLString, arg3?: boolean) {
	let aesKey: Uint8Array = getRandomBytes(32);
	let aesIv: Uint8Array = getRandomBytes(12);
	let bufferMode: boolean = Boolean(arg3);

	if (typeof arg1 !== "boolean") {
		if (typeof arg1 === "string") {
			aesKey = new Uint8Array(base64ToArrayBuffer(arg1));
		}
		if (typeof arg2 === "string") {
			aesIv = new Uint8Array(base64ToArrayBuffer(arg2));
		}
	} else {
		bufferMode = arg1;
	}

	const cryptoKey = await getSubtle().importKey(
		"raw",
		aesKey as BufferSource,
		{
			name: "AES-GCM",
		},
		false,
		["encrypt"],
	);
	const tagLength = 128;
	const encrypted = await getSubtle().encrypt(
		{
			name: "AES-GCM",
			iv: aesIv as BufferSource,
			tagLength,
		},
		cryptoKey,
		new TextEncoder().encode(JSON.stringify(data)),
	);

	const u8a = new Uint8Array(encrypted);
	const bit = tagLength / 8;
	const aesTag = encrypted.slice(u8a.length - bit);

	const payloadBuff = new Uint8Array(aesKey.length + aesIv.length + bit);
	payloadBuff.set(aesKey, 0);
	payloadBuff.set(aesIv, aesKey.length);
	payloadBuff.set(new Uint8Array(aesTag), aesKey.length + aesIv.length);

	if (bufferMode) {
		return {
			data: encrypted.slice(0, u8a.length - bit),
			payload: payloadBuff.buffer,
		};
	}
	return {
		data: arrayBufferToBase64(encrypted.slice(0, u8a.length - bit)),
		payload: arrayBufferToBase64(payloadBuff),
	};
}
