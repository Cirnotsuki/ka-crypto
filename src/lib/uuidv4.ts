import { bytesToUUID } from "./bytesToUUID";
import { getRandomValues } from "./getRandomValues";

export function uuidv4(simplify = false): string {
	const bytes = getRandomValues(new Uint8Array(16));

	// v4
	bytes[6] = (bytes[6] & 0x0f) | 0x40;
	bytes[8] = (bytes[8] & 0x3f) | 0x80;

	const uuid = bytesToUUID(bytes);

	return simplify ? uuid.replace(/-/g, "") : uuid;
}
