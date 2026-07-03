import { getSubtle } from "../core/getSubtle";
import { bytesToUUID } from "./bytesToUUID";

/**
 * UUID v5 namespaces (RFC 4122)
 */
export const UUID_NAMESPACE = {
	DNS: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
	URL: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
	OID: "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
	X500: "6ba7b814-9dad-11d1-80b4-00c04fd430c8",
} as const;

/**
 * UUID v5 generator
 */
export async function uuidv5(name: string, namespace: string = UUID_NAMESPACE.URL): Promise<string> {
	// 1. namespace → bytes
	const nsBytes = Uint8Array.from(
		namespace
			.replace(/-/g, "")
			.match(/.{2}/g)!
			.map((b) => parseInt(b, 16)),
	);

	// 2. encode name → UTF-8 bytes
	const encoder = new TextEncoder();
	const nameBytes = encoder.encode(name);

	// 3. concat namespace + name
	const data = new Uint8Array(nsBytes.length + nameBytes.length);
	data.set(nsBytes, 0);
	data.set(nameBytes, nsBytes.length);

	// 4. SHA-1 hash (20 bytes)
	const hashBuffer = await getSubtle().digest("SHA-1", data);

	const hash = new Uint8Array(hashBuffer);

	// 5. take first 16 bytes
	const bytes = hash.slice(0, 16);

	// 6. set version (v5)
	bytes[6] = (bytes[6] & 0x0f) | 0x50;

	// 7. set variant (RFC 4122)
	bytes[8] = (bytes[8] & 0x3f) | 0x80;

	// 8. format
	return bytesToUUID(bytes);
}
