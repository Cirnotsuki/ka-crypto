import { getRandomValues } from "./getRandomValues";

export function getRandomBytes(length: number = 16) {
	return getRandomValues(new Uint8Array(length));
}
