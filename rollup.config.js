import { join } from 'path';
import buble from 'rollup-plugin-buble';

const pkg = require('./package.json');

export default {
  input: join(__dirname, 'src/index.js'),
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ],
  plugins: [buble()],
  external: Object.keys(pkg.dependencies),
  sourcemap: true
};
