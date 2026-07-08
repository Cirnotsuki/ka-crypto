import { base64ToArrayBuffer } from "../lib/base64ToArrayBuffer";
import { aesEncrypt } from "./aesEncrypt";
import { rsaEncrypt } from "./rsaEncrypt";

/**
 * 混合加密
 */
export async function encrypt(data: ArrayBuffer, publicKey: string, bufferMode: true): Promise<ArrayBuffer | null>;
export async function encrypt<T>(data: T, publicKey: string, bufferMode: false): Promise<{ valid: string; data: string } | null>;

export async function encrypt<T>(data: T, publicKey: string, bufferMode = false) {
	if (!publicKey) {
		return null;
	}

	if (bufferMode === true) {
		const bufAes = await aesEncrypt(data, true);
		const bufValid = await rsaEncrypt(bufAes.payload, publicKey, true);
		
		const combinated = new Uint8Array(bufValid.byteLength + bufAes.data.byteLength);
		combinated.set(new Uint8Array(bufValid), 0);
		combinated.set(new Uint8Array(bufAes.data), bufValid.byteLength);
		return combinated.buffer;
	}

	const aes = await aesEncrypt(data, false);
	const valid = await rsaEncrypt(base64ToArrayBuffer(aes.payload), publicKey, false);

	return {
		valid,
		data: aes.data,
	};
}
