import { base64ToArrayBuffer } from "../lib/base64ToArrayBuffer";
import { importPrivateKey } from "../core/importPrivateKey";
import { getSubtle } from "../core/getSubtle";
import { arrayBufferToBase64 } from "../exports";

/**
 * RSA解密
 */
export async function rsaDecrypt(
	data: string,
	privateKey: string,
	sourceIsBuffer: boolean,
): Promise<Base64URLString>;
export async function rsaDecrypt(
	data: string,
	privateKey: string,
): Promise<any>;
export async function rsaDecrypt(
	data: string,
	privateKey: string,
	sourceIsBuffer: boolean = false,
) {
	const key = await importPrivateKey(privateKey);

	const decrypted = await getSubtle().decrypt(
		{
			name: "RSA-OAEP",
		},
		key,
		base64ToArrayBuffer(data),
	);

	if (sourceIsBuffer) {
		return arrayBufferToBase64(decrypted);
	} else {
		return JSON.parse(new TextDecoder().decode(decrypted));
	}
}
