import { base64ToArrayBuffer } from "../lib/base64ToArrayBuffer";
import { importPrivateKey } from "../core/importPrivateKey";
import { getSubtle } from "../core/getSubtle";

/**
 * RSA解密
 */
export async function rsaDecrypt(data: string, privateKey: string) {
	const key = await importPrivateKey(privateKey);

	const decrypted = await getSubtle().decrypt(
		{
			name: "RSA-OAEP",
		},
		key,
		base64ToArrayBuffer(data),
	);

	return JSON.parse(new TextDecoder().decode(decrypted));
}
