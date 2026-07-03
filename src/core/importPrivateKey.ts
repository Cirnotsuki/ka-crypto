import { base64ToArrayBuffer } from "../lib/base64ToArrayBuffer";
import { getSubtle } from "./getSubtle";

export async function importPrivateKey(key: string) {
	const keyBuffer = base64ToArrayBuffer(key);
	return getSubtle().importKey(
		"pkcs8",
		keyBuffer,
		{
			name: "RSA-OAEP",
			hash: "SHA-1",
		},
		false,
		["decrypt"],
	);
}
