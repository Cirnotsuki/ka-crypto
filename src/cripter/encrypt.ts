import { base64ToArrayBuffer } from "../lib/base64ToArrayBuffer";
import { aesEncrypt } from "./aesEncrypt";
import { rsaEncrypt } from "./rsaEncrypt";

/**
 * 混合加密
 */
export async function encrypt<T>(data: T, publicKey: string) {
	if (!publicKey) {
		return null;
	}

	const aes = await aesEncrypt(data);
	const valid = await rsaEncrypt(base64ToArrayBuffer(aes.payload), publicKey);

	return {
		valid,
		data: aes.data,
	};
}
