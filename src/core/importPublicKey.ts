import { base64ToArrayBuffer } from "../lib/base64ToArrayBuffer";
import { getSubtle } from "./getSubtle";

export async function importPublicKey(key: Base64URLString) {
  const keyBuffer = base64ToArrayBuffer(key);
	return getSubtle().importKey(
		"spki",
		keyBuffer,
		{
			name: "RSA-OAEP",
			hash: "SHA-1",
		},
		false,
		["encrypt"],
	);
}
