import { arrayBufferToBase64 } from "../lib/arrayBufferToBase64";
import { getSubtle } from "../core/getSubtle";
import { getRandomBytes } from "../lib/getRandomBytes";

/**
 * AES加密
 */
export async function aesEncrypt<T>(data: T, aesKey = getRandomBytes(32), aesIv = getRandomBytes(16)) {
	// @ts-ignore
	const cryptoKey = await getSubtle().importKey(
		"raw",
		aesKey,
		{
			name: "AES-GCM",
		},
		false,
		["encrypt"],
	);

	const aesEncrypted = await getSubtle().encrypt(
		{
			name: "AES-GCM",
			iv: aesIv,
		},
		cryptoKey,
		new TextEncoder().encode(JSON.stringify(data)),
	);

	return {
		data: arrayBufferToBase64(aesEncrypted),
		key: arrayBufferToBase64(aesKey),
		iv: arrayBufferToBase64(aesIv),
	};
}
