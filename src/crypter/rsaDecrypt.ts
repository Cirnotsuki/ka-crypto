import { base64ToArrayBuffer } from "../lib/base64ToArrayBuffer";
import { importPrivateKey } from "../core/importPrivateKey";
import { getSubtle } from "../core/getSubtle";

/**
 * RSA解密
 */
export async function rsaDecrypt(data: Base64URLString | ArrayBuffer, privateKey: Base64URLString, sourceIsBuffer: true): Promise<ArrayBuffer>;
export async function rsaDecrypt(data: Base64URLString | ArrayBuffer, privateKey: Base64URLString): Promise<any>;
export async function rsaDecrypt(data: Base64URLString | ArrayBuffer, privateKey: Base64URLString, sourceIsBuffer: boolean = false) {
	const key = await importPrivateKey(privateKey);

	const decrypted = await getSubtle().decrypt(
		{
			name: "RSA-OAEP",
		},
		key,
		typeof data === "string" ? base64ToArrayBuffer(data) : data,
	);

	if (sourceIsBuffer) {
		return decrypted;
	} else {
		return JSON.parse(new TextDecoder().decode(decrypted));
	}
}
