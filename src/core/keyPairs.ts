import { arrayBufferToBase64 } from "../lib/arrayBufferToBase64";
// @ts-ignore
import { getSubtle } from "./getSubtle";

async function toPem(key: CryptoKey) {
	const format = key.type === "public" ? "spki" : "pkcs8";
	const label = key.type.toLocaleUpperCase();
	const base64Der = arrayBufferToBase64(await getSubtle().exportKey(format, key));
	const lines = base64Der.match(/.{1,64}/g)?.join("\n") ?? "";
	return `-----BEGIN ${label} KEY-----\n${lines}\n-----END ${label} KEY-----`;
}

function toJwk(key: CryptoKey) {
	return getSubtle().exportKey("jwk", key);
}

function toDer(key: CryptoKey) {
	if (key.type === "private") {
		return getSubtle().exportKey("pkcs8", key);
	}
	return getSubtle().exportKey("spki", key);
}

export async function keyPairs(): Promise<[string, string]>;
export async function keyPairs(format: "pem"): Promise<[string, string]>;
export async function keyPairs(format: "jwk"): Promise<[JsonWebKey, JsonWebKey]>;
export async function keyPairs(format: "der"): Promise<[ArrayBuffer, ArrayBuffer]>;
export async function keyPairs(format?: "pem" | "jwk" | "der") {
	const keyPair = await getSubtle().generateKey(
		{
			name: "RSA-OAEP",
			modulusLength: 2048,
			publicExponent: new Uint8Array([1, 0, 1]),
			hash: "SHA-1"
		},
		true,
		["encrypt", "decrypt"],
	);

	switch (format) {
		case "jwk":
			return Promise.all([toJwk(keyPair.publicKey), toJwk(keyPair.privateKey)]);
		case "der":
			return Promise.all([toDer(keyPair.publicKey), toDer(keyPair.privateKey)]);
		default:
			return Promise.all([toPem(keyPair.publicKey), toPem(keyPair.privateKey)]);
	}
}
