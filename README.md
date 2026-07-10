# README\.md

# @ka\-libs/crypto

**Zero\-dependency cross\-platform RSA \+ AES hybrid encryption utility for Node\.js \& Browser, fully compatible with PHP RSA\-OAEP\-SHA1\.**

**GitHub:**[https://github\.com/Cirnotsuki/ka\-crypto](https://github.com/Cirnotsuki/ka-crypto)

Built on native Web Crypto / Node\.js Crypto API, no third\-party dependencies\. Lightweight and standard\-compliant\.

**Core advantage: 100% algorithm consistent with PHP openssl OAEP\-SHA1**, perfectly solving front\-end \& PHP backend encryption docking issues\.

## ✨ Features

- **Cross\-platform**: Support Node\.js \& all modern browsers

- **Zero dependency**: Only rely on system native crypto API

- **PHP full compatible**: RSA\-OAEP\-SHA1 strictly matches PHP openssl default OAEP mode

- **Secure hybrid encryption**: RSA key exchange \+ AES\-256\-GCM authenticated encryption

- **Tamper\-proof**: GCM auth tag ensures data integrity

- **Unified structure**: Fixed cipher format for front\-end \& PHP backend interaction

- **Standard key support**: Compatible with PKCS\#1 / PKCS\#8 PEM RSA keys

- **Independent crypto methods**: Expose standalone RSA / AES encrypt \& decrypt functions for flexible usage

## 🔐 Encryption Flow \(PHP Consistent\)

1. Randomly generate AES\-256\-GCM session key and IV

2. Encrypt plainData with AES\-256\-GCM, get ciphertext and auth tag

3. Encrypt AES session key via **RSA\-OAEP\-SHA1** \(PHP standard algorithm\)

4. Package all fields into unified cipher object for transmission

5. Decrypt: Restore AES key with RSA private key, then decrypt AES ciphertext

## 📦 Installation

```Plain Text
npm install @ka-libs/crypto
```

# CLI Scripts 使用文档

## 🛠️ CLI Scripts

Built\-in command\-line utilities for quick key generation and UUID creation, no extra code needed\.

### Generate RSA Key Pairs

```bash
# Generate PEM key pairs to specified directory
npm run keyPairs -- ./keys
```

- **Parameter**: Target directory path \(relative or absolute\)

- **Output**: public\.pem \+ private\.pem in the specified directory

- **Auto\-create**: Directory will be created recursively if it doesn't exist

- **⚠️ Required**: Must specify output directory, otherwise exits with error

### Generate UUID

```bash
# Print a standard RFC4122 v4 UUID to stdout
npm run uuid
```

- **Output**: Standard UUID with dashes \(e\.g\., 550e8400\-e29b\-41d4\-a716\-446655440000\)

- **Scenario**: Suitable for shell scripting, CI/CD pipelines, or quick ID generation

## 🚀 Quick Usage

### 1\. Generate Key Pairs (Multi-Format)

`keyPairs()` supports three export formats via optional parameter, defaulting to PEM. Format is automatically inferred from `CryptoKey.type`, no manual type specification needed.

**Parameters**

- `format?: "pem" | "jwk" | "der"` — Export format, defaults to `"pem"` when omitted

```js
import { keyPairs } from '@ka-libs/crypto';

// PEM format (default)
const [publicPem, privatePem] = await keyPairs();
const [publicPem2, privatePem2] = await keyPairs("pem");

// JWK format
const [publicJwk, privateJwk] = await keyPairs("jwk");

// DER format (ArrayBuffer)
const [publicDer, privateDer] = await keyPairs("der");
```

| Format  | Return Type               | Description                     |
| :------ | :------------------------ | :------------------------------ |
| `pem`   | `[string, string]`        | Standard PEM encoded keys       |
| `jwk`   | `[JsonWebKey, JsonWebKey]`| JSON Web Key objects            |
| `der`   | `[ArrayBuffer, ArrayBuffer]` | Raw DER binary (SPKI / PKCS#8) |


### 2\. Hybrid Encrypt \(RSA \+ AES\)

```js
import { encrypt } from '@ka-libs/crypto';

// Param: plainData, RSA publicKey (PEM format)
const { data, valid } = await encrypt('any type of data', publicKey);

```

### 3\. Hybrid Decrypt \(RSA \+ AES\)

```js
import { decrypt } from '@ka-libs/crypto';

// Param: data, valid, RSA privateKey (PEM format)
const plainData = await decrypt(data, valid, privateKey);

```

## 🧩 Standalone AES / RSA Methods

Support independent use of single encryption and decryption algorithm, flexible for custom business scenarios\.

### AES Encrypt / Decrypt \(AES\-256\-GCM\)

```js
import { aesEncrypt, aesDecrypt } from '@ka-libs/crypto';

// AES encryption
const { data, payload } = await aesEncrypt('any type of data');

// AES decryption
const originData = aesDecrypt(cipherText, payload);

```

### RSA Encrypt / Decrypt \(RSA\-OAEP\-SHA1\)

```js
import { rsaEncrypt, rsaDecrypt } from '@ka-libs/crypto';

// RSA public key encryption
const rsaCipher = rsaEncrypt(plainData, publicKey);

// RSA private key decryption
const originData = rsaDecrypt(rsaCipher, privateKey);

```

### Random Bytes Generator

High\-quality pseudo\-random byte generation based on Mersenne Twister algorithm, used for custom IV / key random filling, consistent random logic across Node\.js and browsers\.

```js
import { getRandomValues } from '@ka-libs/crypto';

// Fill Uint8Array with secure random bytes (0-255)
const buf = new Uint8Array(16);
getRandomValues(buf);

```

**Function Description**

- Based on Mersenne Twister pseudo\-random algorithm, stable and high randomness

- Cross\-environment consistency: unified random byte generation logic for browser and Node\.js

- Param: `Uint8Array` — Binary array to be filled with random bytes

- Param: `Uint8Array` — Binary array to be filled with random bytes

- Return: Filled original Uint8Array \(mutate in place\)

### UUID Generator \(RFC4122 Standard\)

Generate standard **RFC4122 Version 4 UUID**, based on internal Mersenne Twister random bytes, cross\-environment consistent and verifiable\.

```js
import { uuidv4 } from '@ka-libs/crypto';

// Standard UUID (with dash)
const uuid = uuidv4(false); 

// Simplified UUID (no dash)
const simpleUuid = uuidv4(true);

```

**Function Description**

- Strictly compliant with **RFC4122 v4 UUID** specification

- Random seed based on Mersenne Twister algorithm, uniform with crypto random logic

- Built\-in format verification, throws error if generated UUID is invalid

- Cross\-environment consistent output for Node\.js and browsers

**Parameters**

- `simplify: boolean`

- `false`\(default\): Return standard UUID with dashes `xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx`

- `true`: Return pure 32\-bit hex string without dashes

**Return Value**

- `string`: Valid RFC4122 UUID string

**Exception**

- Throw `TypeError` when UUID format verification fails

## 🔑 Keypairs Export \(Node Environment Only\)

Built\-in RSA key pair automatic generation \& local file export function,**only available in Node\.js environment**, disabled in browsers \(browser prohibits local file writing\)\.

### Function Description

Quickly generate standard RSA PEM key pairs \(public key \+ private key\) and automatically write them to the specified local directory, convenient for project initialization and backend PHP key deployment\.

### Usage

```js
import { exportKeyPairs } from '@ka-libs/crypto';

// Param: distPath (local folder path)
await exportKeyPairs('./keys');

```

### Parameter Explanation

- **distPath**: Local directory path for storing key files \(relative/absolute path supported\)

### Export Result

After successful execution, two standard PEM key files will be generated in the target directory:

- `public.pem`: RSA public key \(for frontend encryption / PHP public key encryption\)

- `private.pem`: RSA private key \(for backend decryption / JS private key decryption\)

### Important Notes

- ❌ **Unavailable in browsers**: Browser sandbox restricts local file system writing, calling this function in browser will throw an error

- ✅ **Only for Node\.js**: Suitable for local development, server initialization key generation

- Generated keys fully comply with **RSA\-OAEP\-SHA1** standard, natively compatible with PHP openssl encryption and decryption

## 📄 Cipher Structure \(JS \& PHP Interoperable\)

Unified transmission structure, directly JSON serializable for PHP backend docking:

```ts
type AesPayload = Base64UrlString // Base64 from Combined ArrayBuffer: AesKey(32) + AesIv(12) + AesTag(16)

interface CipherData {
    data: string;       // AES encrypted ciphertext (base64)
    valid: string;      // RSA-OAEP-SHA1 encrypted AES Payload (base64)
}

```

## 🛡️ Algorithm Standard

- **AES**: AES\-256\-GCM \(authenticated encryption, anti\-tampering\)

- **RSA**: RSA\-OAEP\-SHA1 \(fully compatible with PHP `openssl_public_encrypt` OAEP mode\)

- **Key Format**: Standard PEM public / private key

## 🌍 Compatibility

- Runtime: Node\.js 16\+, Chrome / Edge / Firefox / Safari latest

- Backend: PHP 7\.4\+ / PHP 8\.x \(openssl extension required\)

## 📝 License

MIT