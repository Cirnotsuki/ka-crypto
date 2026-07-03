/**
 * 判断当前是否为浏览器环境
 */
export function isBrowser() {
	return typeof window !== "undefined" && typeof document !== "undefined";
}
