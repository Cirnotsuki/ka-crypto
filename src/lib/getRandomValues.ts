import { getCrypto } from "../core/getCrypto";
export function getRandomValues<T extends Exclude<BufferSource, ArrayBuffer>>(abv: T) {
	return getCrypto().getRandomValues(abv);
}
