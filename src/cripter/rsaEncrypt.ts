import { arrayBufferToBase64 } from "../lib/arrayBufferToBase64";
import { importPublicKey } from "../core/importPublicKey";
import { getSubtle } from "../core/getSubtle";

/**
 * RSA加密
 */
export async function rsaEncrypt<T>(data: T, publicKey: Base64URLString, bufferMode: true): Promise<ArrayBuffer>;
export async function rsaEncrypt<T>(data: T, publicKey: Base64URLString, bufferMode: false): Promise<Base64URLString>;
export async function rsaEncrypt<T>(data: T, publicKey: Base64URLString, bufferMode: boolean = false) {
	const key = await importPublicKey(publicKey);
	let encodeData;
	if (data instanceof ArrayBuffer) {
		encodeData = data;
	} else {
		encodeData = new TextEncoder().encode(JSON.stringify(data));
	}
	const encrypted = await getSubtle().encrypt(
		{
			name: "RSA-OAEP",
		},
		key,
		encodeData,
	);

	if (bufferMode) {
		return encrypted;
	}
	return arrayBufferToBase64(encrypted);
}
