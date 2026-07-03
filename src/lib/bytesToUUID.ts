/**
 * hex lookup table
 */
const HEX = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
/**
 * encode ArrayBuffer → hex string
 */
export function bytesToUUID(bytes: Uint8Array): string {
	const b = bytes;

	return (
		HEX[b[0]] +
		HEX[b[1]] +
		HEX[b[2]] +
		HEX[b[3]] +
		"-" +
		HEX[b[4]] +
		HEX[b[5]] +
		"-" +
		HEX[b[6]] +
		HEX[b[7]] +
		"-" +
		HEX[b[8]] +
		HEX[b[9]] +
		"-" +
		HEX[b[10]] +
		HEX[b[11]] +
		HEX[b[12]] +
		HEX[b[13]] +
		HEX[b[14]] +
		HEX[b[15]]
	);
}
