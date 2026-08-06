type HashAlgorithm = 'md5' | 'sha1' | 'sha256' | 'sha384' | 'sha512';
export function hash(algorithm: HashAlgorithm, data: string | Uint8Array, type) {}