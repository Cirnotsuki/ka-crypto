# README\.md

# ka\-crypto

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

2. Encrypt plaintext with AES\-256\-GCM, get ciphertext and auth tag

3. Encrypt AES session key via **RSA\-OAEP\-SHA1** \(PHP standard algorithm\)

4. Package all fields into unified cipher object for transmission

5. Decrypt: Restore AES key with RSA private key, then decrypt AES ciphertext

## 📦 Installation

```Plain Text
npm install ka-crypto
```

## 🚀 Quick Usage

### 1\. Generate RSA Key Pairs

```js
import { keyPairs } from 'ka-crypto';

// Return RSA public key / private key (PEM format)
const [publicKey, privateKey] = await keyPairs();

```

### 2\. Hybrid Encrypt \(RSA \+ AES\)

```js
import { encrypt } from 'ka-crypto';

// Param: plaintext, RSA publicKey (PEM format)
const { data, valid } = await encrypt('your js', publicKey);

```

### 3\. Hybrid Decrypt \(RSA \+ AES\)

```js
import { decrypt } from 'ka-crypto';

// Param: data, valid, RSA privateKey (PEM format)
const plainText = await decrypt(data, valid, privateKey);

```

## 🧩 Standalone AES / RSA Methods

Support independent use of single encryption and decryption algorithm, flexible for custom business scenarios\.

### AES Encrypt / Decrypt \(AES\-256\-GCM\)

```js
import { aesEncrypt, aesDecrypt } from 'ka-crypto';

// AES encryption
const aesResult = aesEncrypt(plainText, aesKey, iv);

// AES decryption
const originText = aesDecrypt(cipherText, aesKey, iv, tag);

```

### RSA Encrypt / Decrypt \(RSA\-OAEP\-SHA1\)

```js
import { rsaEncrypt, rsaDecrypt } from 'ka-crypto';

// RSA public key encryption
const rsaCipher = rsaEncrypt(plainData, publicKey);

// RSA private key decryption
const originData = rsaDecrypt(rsaCipher, privateKey);

```

### Random Bytes Generator

High\-quality pseudo\-random byte generation based on Mersenne Twister algorithm, used for custom IV / key random filling, consistent random logic across Node\.js and browsers\.

```js
import { getRandomValues } from 'ka-crypto';

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
import { getUUID } from 'ka-crypto';

// Standard UUID (with dash)
const uuid = getUUID(false); 

// Simplified UUID (no dash)
const simpleUuid = getUUID(true);

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
import { exportKeyPairs } from 'ka-crypto';

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
interface CipherData {
    data: string;       // AES encrypted ciphertext (base64)
    valid: {
        key: string;    // RSA-OAEP-SHA1 encrypted AES key (base64)
        iv: string;     // AES-256-GCM initialization vector (base64)
    },
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