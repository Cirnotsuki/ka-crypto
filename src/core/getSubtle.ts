import { getCrypto } from "./getCrypto";
export function getSubtle() {
	const crypto = getCrypto();

	const subtle = crypto.subtle;

	if (!subtle) {
		throw new Error("SubtleCrypto not available");
	}

	return subtle as SubtleCrypto;
}
