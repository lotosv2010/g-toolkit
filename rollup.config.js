import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';
import { readFileSync } from 'fs';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import eslint from '@rollup/plugin-eslint';
import friendlyFormatter from 'eslint-formatter-friendly';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
const isProduction = process.env.NODE_ENV === 'production';

const servers = () => [
  serve({
    port: 3000,
    contentBase: ['./dist'],
    open: true,
    openPage: '/index.html',
  }),
  livereload(),
];

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
    nodeResolve({ extensions: ['.ts', '.js'] }),
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
    eslint({
      include: ['src/**/*.ts'], // 检查的文件
      exclude: ['node_modules/**'], // 排除的文件
      throwOnError: true, // 发现错误时停止构建
      throwOnWarning: false, // 警告不会停止构建
      formatter: friendlyFormatter, // 使用友好格式化器
    }),
  ].concat(isProduction ? [terser()] : servers()),
};
