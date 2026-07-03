import { base64ToArrayBuffer } from "../lib/base64ToArrayBuffer";
import { getSubtle } from "../core/getSubtle";

/**
 * AES解密
 */
export async function aesDecrypt(data: string, aesKey: string, aesIv: string) {
	try {
		// @ts-ignore
		const cryptoKey = await getSubtle().importKey(
			"raw",
			base64ToArrayBuffer(aesKey),
			{
				name: "AES-GCM",
			},
			false,
			["decrypt"],
		);

		const aesDecrypted = await getSubtle().decrypt(
			{
				name: "AES-GCM",
				iv: base64ToArrayBuffer(aesIv),
			},
			cryptoKey,
			base64ToArrayBuffer(data),
		);

		return JSON.parse(new TextDecoder().decode(aesDecrypted));
	} catch (error) {
		console.error(error);
		return null;
	}
}
