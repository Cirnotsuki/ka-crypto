// index.d.ts

export interface CipherValid {
	/**
	 * RSA-OAEP-SHA1 encrypted AES key (base64)
	 */
	key: string;

	/**
	 * AES-256-GCM initialization vector (base64)
	 */
	iv: string;
}

export interface CipherData {
	/**
	 * AES encrypted ciphertext (base64)
	 */
	data: string;

	/**
	 * RSA + AES metadata
	 */
	valid: CipherValid;
}

/**
 * =========================
 * RSA Key Pair Structure
 * =========================
 */
export type RSAKeyPair = [publicKey: string, privateKey: string];

/**
 * =========================
 * Hybrid Encryption Result
 * =========================
 */
export interface EncryptResult {
	data: string;
	valid: CipherValid;
}

/**
 * =========================
 * Core API
 * =========================
 */

/**
 * Generate RSA key pair (PEM format)
 * @returns [publicKey, privateKey]
 */
export function keyPairs(): Promise<RSAKeyPair>;

/**
 * Hybrid encryption (RSA-OAEP-SHA1 + AES-256-GCM)
 *
 * @param plainText plaintext string
 * @param publicKey PEM public key
 */
export function encrypt(plainText: string, publicKey: string): Promise<EncryptResult>;

/**
 * Hybrid decryption (RSA-OAEP-SHA1 + AES-256-GCM)
 *
 * @param data AES ciphertext
 * @param valid RSA + AES metadata
 * @param privateKey PEM private key
 */
export function decrypt(data: string, valid: CipherValid, privateKey: string): Promise<string>;

/**
 * =========================
 * AES (Standalone)
 * =========================
 */
export function aesEncrypt(
	plainText: string,
	key: string | Uint8Array,
	iv: string | Uint8Array,
): {
	data: string;
	tag: string;
};

export function aesDecrypt(cipherText: string, key: string | Uint8Array, iv: string | Uint8Array, tag: string | Uint8Array): string;

/**
 * =========================
 * RSA (Standalone)
 * =========================
 */
export function rsaEncrypt(plainData: string, publicKey: string): string;

export function rsaDecrypt(cipherData: string, privateKey: string): string;

/**
 * =========================
 * Random Generator
 * =========================
 */
export function getRandomValues<T extends Uint8Array>(buf: T): T;

/**
 * =========================
 * UUID Generator (RFC4122 v4)
 * =========================
 */
export function getUUID(simplify?: boolean): string;

/**
 * =========================
 * Node-only API
 * =========================
 * ⚠ Not available in browser
 */
export function exportKeyPairs(distPath: string): Promise<void>;
