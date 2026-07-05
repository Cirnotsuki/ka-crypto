import { aesDecrypt } from "./aesDecrypt";
import { rsaDecrypt } from "./rsaDecrypt";

/**
 * 混合解密
 */
export async function decrypt(data: string, valid: string, privateKey: string) {
  try {
    const payload = await rsaDecrypt(valid, privateKey, true);

    return aesDecrypt(data, payload);
  } catch (error) {
    console.error(error);
    return null;
  }
}
