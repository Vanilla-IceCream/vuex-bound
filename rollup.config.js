import { join } from 'path';
import buble from 'rollup-plugin-buble';

import pkg from './package.json';

export default {
  input: join(__dirname, 'src/index.js'),
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  plugins: [buble()],
  external: Object.keys(pkg.dependencies),
};
