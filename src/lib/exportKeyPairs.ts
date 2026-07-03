import { keyPairs } from "../core/keyPairs";
import { isNode } from "../runtime/isNode";
import fs from "fs";
import path from "path";
export async function exportKeyPairs(dist: string) {
	if (isNode()) {
		const [publicKey, privateKey] = await keyPairs();

		// Node 直接写入本地文件
		fs.writeFileSync(path.join(dist, "public.pem"), publicKey, "utf-8");
		fs.writeFileSync(path.join(dist, "private.pem"), privateKey, "utf-8");
		return;
	}

	throw new Error("require Node runtime environment");
}
