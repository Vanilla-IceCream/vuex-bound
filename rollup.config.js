import { readFileSync } from 'fs';
import { join } from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

import pkg from './package.json';

const babelrc = JSON.parse(readFileSync('./.babelrc', 'utf8'));

babelrc.presets.splice(0, 1, ['env', { modules: false }]);
babelrc.plugins.splice(0, 0, 'external-helpers');

const BABEL_CONFIG = {
  babelrc: false,
  ...babelrc,
  exclude: 'node_modules/**',
};

const UMD_CONFIG = {
  file: pkg.browser,
  format: 'umd',
  name: 'VuexBound',
  globals: {},
};

const ROLLUP_CONFIG = {
  input: join(__dirname, 'src/index.js'),
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  plugins: [babel(BABEL_CONFIG)],
  external: Object.keys(pkg.dependencies),
};

export default [
  ROLLUP_CONFIG,
  {
    ...ROLLUP_CONFIG,
    output: [UMD_CONFIG],
    plugins: [
      babel(BABEL_CONFIG),
      resolve(),
      commonjs(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    ],
  },
  {
    ...ROLLUP_CONFIG,
    output: [
      {
        ...UMD_CONFIG,
        file: (pkg.browser).replace('.js', '.min.js'),
      },
    ],
    plugins: [
      babel(BABEL_CONFIG),
      resolve(),
      commonjs(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      uglify(),
    ],
  },
];
