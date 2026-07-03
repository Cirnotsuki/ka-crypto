import {aesDecrypt} from "./aesDecrypt";
import {rsaDecrypt} from "./rsaDecrypt";

/**
 * 混合解密
 */
export async function decrypt(data: string, valid: string, privateKey: string) {
  try {
    const aes = await rsaDecrypt(valid, privateKey);

    return aesDecrypt(data, aes.key, aes.iv);
  } catch (error) {
    console.error(error);
    return null;
  }
};
