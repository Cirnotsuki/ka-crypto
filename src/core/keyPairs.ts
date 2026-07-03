import { arrayBufferToBase64 } from "../lib/arrayBufferToBase64";
// @ts-ignore
import { getSubtle } from "./getSubtle";

export async function keyPairs() {
	const keyPair = await getSubtle().generateKey(
		{
			name: "RSA-OAEP",
			modulusLength: 2048,
			publicExponent: new Uint8Array([1, 0, 1]),
			hash: "SHA-1",
		},
		true,
		["encrypt", "decrypt"],
	);

	const publicKey =
		"-----BEGIN PUBLIC KEY-----\n" +
		arrayBufferToBase64(
			// @ts-ignore
			await getSubtle().exportKey("spki", keyPair.publicKey),
		) +
		"\n-----END PUBLIC KEY-----";

	const privateKey =
		"-----BEGIN PRIVATE KEY-----\n" +
		arrayBufferToBase64(
			// @ts-ignore
			await getSubtle().exportKey("pkcs8", keyPair.privateKey),
		) +
		"\n-----END PRIVATE KEY-----";

	return [publicKey, privateKey];
}
