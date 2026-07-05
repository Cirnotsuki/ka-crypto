import { arrayBufferToBase64 } from "../lib/arrayBufferToBase64";
import { importPublicKey } from "../core/importPublicKey";
import { getSubtle } from "../core/getSubtle";

/**
 * RSA加密
 */
export async function rsaEncrypt<T>(data: T, publicKey: string) {
  const key = await importPublicKey(publicKey);
  let encodeData;
  if (data instanceof ArrayBuffer) {
    encodeData = data;
  } else {
    encodeData = new TextEncoder().encode(JSON.stringify(data));
  }
  const encrypted = await getSubtle().encrypt(
    {
      name: "RSA-OAEP",
    },
    key,
    encodeData,
  );

  return arrayBufferToBase64(encrypted);
}
