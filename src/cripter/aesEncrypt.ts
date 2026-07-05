import { arrayBufferToBase64 } from "../lib/arrayBufferToBase64";
import { getSubtle } from "../core/getSubtle";
import { getRandomBytes } from "../lib/getRandomBytes";

/**
 * AES加密
 */
export async function aesEncrypt<T>(
  data: T,
  aesKey = getRandomBytes(32),
  aesIv = getRandomBytes(12),
) {
  const cryptoKey = await getSubtle().importKey(
    "raw",
    aesKey,
    {
      name: "AES-GCM",
    },
    false,
    ["encrypt"],
  );
  const tagLength = 128;
  const encrypted = await getSubtle().encrypt(
    {
      name: "AES-GCM",
      iv: aesIv,
      tagLength,
    },
    cryptoKey,
    new TextEncoder().encode(JSON.stringify(data)),
  );

  const u8a = new Uint8Array(encrypted);
  const bit = tagLength / 8;
  const aesTag = encrypted.slice(u8a.length - bit);

  const payloadBuff = new Uint8Array(aesKey.length + aesIv.length + bit);
  payloadBuff.set(aesKey, 0);
  payloadBuff.set(aesIv, aesKey.length);
  payloadBuff.set(new Uint8Array(aesTag), aesKey.length + aesIv.length);

  return {
    data: arrayBufferToBase64(encrypted.slice(0, u8a.length - bit)),
    payload: arrayBufferToBase64(payloadBuff),
  };
}
