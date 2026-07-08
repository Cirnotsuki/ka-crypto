import { base64ToArrayBuffer } from "../lib/base64ToArrayBuffer";
import { getSubtle } from "../core/getSubtle";

/**
 * AES解密
 */
export async function aesDecrypt(data: string | ArrayBuffer, payload: string | ArrayBuffer) {
	try {
		const payloadBuf = typeof payload === "string" ? base64ToArrayBuffer(payload) : payload;
		const aesKey = payloadBuf.slice(0, 32);
		const aesIv = payloadBuf.slice(32, 32 + 12);
		const aesTag = payloadBuf.slice(-16);
		// @ts-ignore
		const cryptoKey = await getSubtle().importKey(
			"raw",
			aesKey,
			{
				name: "AES-GCM",
			},
			false,
			["decrypt"],
		);

		// 1. 将传入的 data 和 tag 转换为 Uint8Array 以便拼接
		const dataBuffer = typeof data === "string" ? new Uint8Array(base64ToArrayBuffer(data)) : new Uint8Array(data);

		// 2. 创建一个新的 ArrayBuffer，长度为 data + tag
		const combinedBuffer = new Uint8Array(dataBuffer.length + 16);

		// 3. 将密文放在前面
		combinedBuffer.set(dataBuffer, 0);
		// 4. 将 tag 拼接在最后面
		combinedBuffer.set(new Uint8Array(aesTag), dataBuffer.length);

		const aesDecrypted = await getSubtle().decrypt(
			{
				name: "AES-GCM",
				iv: aesIv,
				// 注意：解密时 tagLength 默认也是 128，如果加密时指定了，这里最好也显式加上保持一致
				tagLength: 128,
			},
			cryptoKey,
			combinedBuffer.buffer, // 传入拼接好的完整数据
		);

		return JSON.parse(new TextDecoder().decode(aesDecrypted));
	} catch (error) {
		console.error(error);
		return null;
	}
}
