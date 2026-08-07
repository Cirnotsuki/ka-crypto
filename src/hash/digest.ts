import { md5 } from './md5';
import { sha1, sha256, sha384, sha512 } from './sha';

const HashAlgorithm = ['md5', 'sha1', 'sha256', 'sha384', 'sha512'] as const;
export async function digest(algorithm: (typeof HashAlgorithm)[number], data: string | Uint8Array, raw = false) {
	switch (algorithm) {
		case 'sha1':
			return await sha1(data, raw);
		case 'sha256':
			return await sha256(data, raw);
		case 'sha384':
			return await sha384(data, raw);
		case 'sha512':
			return await sha512(data, raw);
		case 'md5':
		default:
			return md5(data, raw ? 'raw' : 'hex');
	}
}
