import { aesDecrypt } from "./aesDecrypt";
import { rsaDecrypt } from "./rsaDecrypt";

/**
 * 混合解密
 */
export async function decrypt(data: ArrayBuffer, privateKey: Base64URLString): Promise<any>;
export async function decrypt(data: Base64URLString, valid: Base64URLString, privateKey: Base64URLString): Promise<any>;
export async function decrypt(data: Base64URLString | ArrayBuffer, arg1: Base64URLString, arg2?: Base64URLString) {
	try {
		if (typeof data === "string") {
			if (!arg2) return null;
			const valid = arg1;
			const privateKey = arg2;

			const payload = await rsaDecrypt(valid, privateKey, true);
			return aesDecrypt(data, payload);
		} else {
			const privateKey = arg1;

			const bufValid = data.slice(0, 256);
			const bufData = data.slice(256);
      const bufPayload = await rsaDecrypt(bufValid, privateKey, true);
      return aesDecrypt(bufData, bufPayload);
      
		}
	} catch (error) {
		console.error(error);
		return null;
	}
}
