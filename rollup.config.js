import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

export default {
  // 你的源码入口
  input: "src/index.js",
  output: [
    {
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: false,
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: false,
    },
  ],
  plugins: [
    resolve({ browser: true }),
    commonjs({
      requireReturnsDefault: true,
      defaultIsModuleExports: true,
      transformMixedEsModules: true,
    }),
    terser(),
  ],
  // node内置crypto不打包，跨端兼容
  external: ["crypto", "fs", "path"],
};
