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
	const valid = await rsaEncrypt(
		{
			key: aes.key,
			iv: aes.iv,
		},
		publicKey,
	);

	return {
		valid,
		data: aes.data,
	};
}
