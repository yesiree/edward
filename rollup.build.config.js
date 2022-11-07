import del from 'rollup-plugin-delete'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import serve from 'rollup-plugin-serve'


export default {
  input: './src/index.ts',
  output: {
    file: './dist/edward.js',
    format: 'iife',
    name: 'edward',
    sourcemap: true
  },
  plugins: [
    del({ targets: './dist/**' }),
    typescript({ tsconfig: 'tsconfig.json' }),
    terser()
  ]
}
