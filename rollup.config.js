import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: 'GToolkitPlus',
      sourcemap: true,
    },
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      include: ['src/**/*'],
      skipPreflightCheck: true, // 避免与TypeScript插件冲突
    }),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    terser(),
  ],
};
