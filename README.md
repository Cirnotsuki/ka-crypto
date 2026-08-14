# README\.md

# @ka\-libs/crypto

**Zero-dependency cross-platform RSA + AES hybrid encryption utility for Node.js & Browser. Solves the well-known OAEP-SHA1 interoperability gap between JavaScript and PHP OpenSSL, also powers the KA-C Runtime for build-time payload encryption.**

**GitHub:**[https://github\.com/Cirnotsuki/ka\-crypto](https://github.com/Cirnotsuki/ka-crypto)

Built on native Web Crypto / Node\.js Crypto API with no third\-party dependencies\. Lightweight and fully compliant with standard cryptographic specifications\.

**Core Advantage: 100% algorithm consistency with PHP openssl OAEP\-SHA1**, perfectly solving encryption compatibility issues between frontend and PHP backend\.

## ✨ Features

- **Cross\-platform**: Supports Node\.js and all modern desktop/mobile browsers

- **Zero dependency**: Relies purely on system\-native crypto APIs

- **Full PHP compatibility**: RSA\-OAEP\-SHA1 strictly matches PHP OpenSSL default OAEP mode

- **Secure hybrid encryption**: RSA key exchange \+ AES\-256\-GCM authenticated encryption

- **Tamper\-proof**: GCM authentication tag guarantees data integrity

- **Unified transmission structure**: Fixed cipher format for consistent frontend \& PHP backend interaction

- **Standard key support**: Compatible with PKCS\#1 / PKCS\#8 PEM RSA keys

- **Comprehensive crypto methods**: Built\-in symmetric/asymmetric encryption, hash digest, random generation, UUID generation and binary conversion utilities

- **Full TypeScript support**: Complete type declarations and intelligent type inference

## 🔐 Encryption Flow \(PHP Consistent\)

1. Randomly generate an AES\-256\-GCM session key and initialization vector \(IV\)

2. Encrypt plaintext data via AES\-256\-GCM to obtain ciphertext and authentication tag

3. Encrypt the AES session key with **RSA\-OAEP\-SHA1** \(PHP standard algorithm\)

4. Package all encrypted fields into a unified cipher object for network transmission

5. Decryption process: Recover the AES key via RSA private key, then decrypt the AES ciphertext

## 📦 Installation

```Plain Text
npm install @ka-libs/crypto
```

# CLI Scripts Documentation

## 🛠️ CLI Scripts

Built\-in command\-line tools for fast RSA key generation and UUID creation without extra coding\.

### Generate RSA Key Pairs

```Plain Text
npm run keyPairs -- ./keys
```

- **Parameter**: Target directory path \(relative or absolute\)

- **Output**: `public.pem` and `private.pem` saved in the target directory

- **Auto\-create**: The target directory will be recursively created if not exists

- **⚠️ Required**: Target directory must be specified, otherwise the command will exit with an error

### Generate UUID

```Plain Text
npm run uuid
```

- **Output**: Standard RFC4122 v4 UUID with dashes \(e\.g\., 550e8400\-e29b\-41d4\-a716\-446655440000\)

- **Scenario**: Suitable for shell scripting, CI/CD pipelines and rapid unique ID generation

## 🚀 Quick Usage \& Full API Docs

All functions support complete TypeScript type inference\. Below are full type declarations, parameter descriptions and practical usage examples\.

### 1\. RSA Key Pair Generation \(Multi\-Format\)

Supports three export formats: `pem / jwk / der` with strict type constraints\.

#### Type Declaration

#### Type \& Parameter Description

Generate RSA key pairs with multi\-format output support, with full function overloading:

- **No parameter**: Returns PEM format key pair `Promise<[string, string]>`

- **format = "pem"**: Returns standard PEM key pair `Promise<[string, string]>`

- **format = "jwk"**: Returns JWK format key pair `Promise<[JsonWebKey, JsonWebKey]>`

- **format = "der"**: Returns raw DER binary key pair `Promise<[ArrayBuffer, ArrayBuffer]>`

#### Usage

```Plain Text
import { keyPairs } from '@ka-libs/crypto';

// PEM format (default)
const [publicPem, privatePem] = await keyPairs();
const [publicPem2, privatePem2] = await keyPairs("pem");

// JWK format
const [publicJwk, privateJwk] = await keyPairs("jwk");

// DER format (ArrayBuffer binary)
const [publicDer, privateDer] = await keyPairs("der");
```

|**Format**|**Return Type**|**Description**|
|---|---|---|
|`pem`|`[string, string]`|Standard PEM\-encoded RSA key pair|
|`jwk`|`[JsonWebKey, JsonWebKey]`|JSON Web Key format objects|
|`der`|`[ArrayBuffer, ArrayBuffer]`|Raw DER binary keys \(SPKI / PKCS\#8\)|

### 2\. Export RSA Keys to Local File \(Node\.js Only\)

#### Type Declaration

#### Type \& Parameter Description

Export generated RSA PEM key pair to local directory \(Node\.js only\)\. Accepts a single string parameter`dist` for target directory path, returns `Promise<void>`\.

#### Usage

```Plain Text
import { exportKeyPairs } from '@ka-libs/crypto';
await exportKeyPairs('./keys');
```

- **dist**: Local directory path for storing key files \(relative or absolute\)

- **Output**: Automatically generates `public.pem` and `private.pem`

- **Restriction**: Unavailable in browser environments; only for Node\.js local development and server deployment

### 3\. Hybrid Encrypt / Decrypt \(RSA\+AES, PHP Compatible\)

#### Type Declaration

#### Type \& Parameter Description

Hybrid encryption function overloads:

- **bufferMode = true**: Accepts generic data and public key string, returns `Promise<ArrayBuffer | null>` binary cipher

- **bufferMode = false**: Accepts generic data and public key string, returns structured object `Promise<{ valid: string; data: string } | null>`

Hybrid decryption function overloads:

- Accepts `ArrayBuffer` cipher data and private key string, returns decrypted plaintext `Promise<any>`

- Accepts Base64 encoded `data` and `valid` payload with private key string, returns decrypted plaintext `Promise<any>`

#### Usage

```Plain Text
import { encrypt, decrypt } from '@ka-libs/crypto';

// String mode (default, suitable for front-backend transmission)
const cipher = await encrypt('test data', publicPem, false);
// Binary buffer mode (suitable for file and binary data encryption)
const bufferCipher = await encrypt('test data', publicPem, true);

// Decryption
const originData = await decrypt(cipher.data, cipher.valid, privatePem);
```

### 4\. Standalone RSA Encryption \& Decryption

#### Type Declaration

#### Type \& Parameter Description

RSA public key encryption overloads:

- **bufferMode = true**: Encrypt input data with public key, returns raw `Promise<ArrayBuffer>`

- **No bufferMode**: Encrypt input data with public key, returns Base64 string `Promise<Base64URLString>`

RSA private key decryption overloads:

- **sourceIsBuffer = true**: Decrypt binary buffer input with private key, returns `Promise<ArrayBuffer>`

- **No sourceIsBuffer**: Decrypt Base64 or buffer input with private key, returns parsed plaintext `Promise<any>`

#### Usage

```Plain Text
import { rsaEncrypt, rsaDecrypt } from '@ka-libs/crypto';

// Output Base64 encoded string
const cipher = await rsaEncrypt('hello world', publicPem);
// Output raw ArrayBuffer binary
const bufferCipher = await rsaEncrypt('hello world', publicPem, true);

// Decrypt data
const res1 = await rsaDecrypt(cipher, privatePem);
const res2 = await rsaDecrypt(bufferCipher, privatePem, true);
```

### 5\. Standalone AES\-256\-GCM Encryption \& Decryption

#### Type Declaration

#### Type \& Parameter Description

AES\-256\-GCM encryption supports multiple parameter combinations and mode switching:

- **Only data input**: Auto\-generate AES key and IV, return Base64 structured payload

- **data \+ bufferMode=false**: Return Base64 encoded `{ data, payload }`

- **data \+ bufferMode=true**: Return raw ArrayBuffer `{ data, payload }`

- **data \+ custom aesKey \+ aesIv**: Use manually specified key and IV, support both Base64 and buffer output modes

AES decryption accepts string or ArrayBuffer cipher data and corresponding payload, returns decrypted original data`Promise<any>`\.

#### Usage

```Plain Text
import { aesEncrypt, aesDecrypt } from '@ka-libs/crypto';

// Auto-generate AES key and IV
const aesCipher = await aesEncrypt('aes test data');
// Custom AES key & IV with binary buffer mode
const aesBufferCipher = await aesEncrypt('aes test data', key, iv, true);

// AES decryption
const origin = await aesDecrypt(aesCipher.data, aesCipher.payload);
```

### 6\. Random Bytes Generation Utilities

#### Type Declaration

#### Type \& Parameter Description

- **getRandomBytes**: Accepts optional numeric `length` parameter, returns random `Uint8Array<ArrayBuffer>` with specified byte length

- **getRandomValues**: Accepts a binary buffer source array, fills it with secure random bytes and returns the original mutated array

#### Usage

```Plain Text
import { getRandomBytes, getRandomValues } from '@ka-libs/crypto';

// Generate random bytes with specified length
const bytes = getRandomBytes(16);
// Fill binary array with secure random values
const buf = new Uint8Array(32);
getRandomValues(buf);
```

### 7\. Binary \& Base64 Conversion Tools

#### Type Declaration

#### Type \& Parameter Description

- **arrayBufferToBase64**: Accepts `ArrayBuffer` or `Uint8Array` binary input, returns Base64 encoded string

- **base64ToArrayBuffer**: Accepts Base64 URL string input, returns decoded `ArrayBuffer` binary data

- **base64Cleaner**: Accepts raw Base64 string with line breaks or invalid characters, returns standardized clean Base64 string

#### Usage

```Plain Text
import { arrayBufferToBase64, base64ToArrayBuffer, base64Cleaner } from '@ka-libs/crypto';

// Convert binary buffer to Base64 string
const base64 = arrayBufferToBase64(buffer);
// Convert Base64 string to binary buffer
const buffer = base64ToArrayBuffer(base64Str);
// Clean invalid characters and line breaks in Base64 content
const cleanStr = base64Cleaner(rawBase64);
```

### 8\. Hash Algorithms \(MD5 / SHA Series\)

#### Type Declaration

#### Type \& Parameter Description

**MD5 Function Overloads**: Supports plain input, salt key input, and multi output formats \(hex / binary / raw Uint8Array\)\.

**SHA Series Functions \(sha1 / sha256 / sha384 / sha512\)**: Accepts string or binary Uint8Array data, with optional `raw` boolean flag\. Returns hex string by default, returns raw binary array if `raw=true`\.

**Unified digest Function**: Accepts standard algorithm name \(md5 / sha1 / sha256 / sha384 / sha512\), input data and optional raw flag, supports unified hash calculation entry for all built\-in algorithms\.

#### Usage

```Plain Text
import { md5, sha256, digest } from '@ka-libs/crypto';

// MD5 hash with salt
const md5Str = md5('123456', 'salt123');
// SHA256 hash calculation
const shaStr = await sha256('test hash');
// Unified hash function call
const hash = await digest('sha1', 'test data');
```

### 9\. UUID Generation \(V4 / V5\)

#### Type Declaration

#### Type \& Parameter Description

#### Usage

```Plain Text
import { uuidv4, uuidv5 } from '@ka-libs/crypto';

// Standard UUID with hyphens
const uuid = uuidv4();
// Simplified 32-bit UUID without hyphens
const simpleUuid = uuidv4(true);
// UUID v5 generation with custom namespace
const v5Uuid = await uuidv5('custom-name');
```

## 📄 Cipher Structure \(JS \& PHP Interoperable\)

Unified JSON\-serializable transmission structure for seamless PHP backend integration:

```Plain Text
type AesPayload = Base64UrlString // Combined ArrayBuffer: AesKey(32) + AesIv(12) + AesTag(16)

interface CipherData {
    data: string;       // AES encrypted ciphertext (base64 encoded)
    valid: string;      // RSA-OAEP-SHA1 encrypted AES payload (base64 encoded)
}
```

## 🛡️ Algorithm Standards

- **AES**: AES\-256\-GCM \(authenticated encryption with tamper resistance\)

- **RSA**: RSA\-OAEP\-SHA1 \(fully compatible with PHP `openssl_public_encrypt` OAEP mode\)

- **Key Format**: Standard PKCS\#1 / PKCS\#8 PEM RSA keys

## 🌍 Compatibility

- Runtime: Node\.js 16\+, latest Chrome / Edge / Firefox / Safari browsers

- Backend: PHP 7\.4\+ / PHP 8\.x \(OpenSSL extension required\)

## 📦 Full Export List

```Plain Text
export { 
  aesDecrypt, aesEncrypt, 
  arrayBufferToBase64, base64Cleaner, base64ToArrayBuffer, 
  decrypt, digest, encrypt, exportKeyPairs, 
  getRandomBytes, getRandomValues, 
  keyPairs, md5, 
  rsaDecrypt, rsaEncrypt, 
  sha1, sha256, sha384, sha512, 
  uuidv4, uuidv5 
};
```

## 📝 License

[MIT](LICENSE)