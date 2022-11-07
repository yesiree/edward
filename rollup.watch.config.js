import del from 'rollup-plugin-delete'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import serve from 'rollup-plugin-serve'


export default {
  input: './src/index.ts',
  output: {
      file: 'demo/dist/edward.js',
      format: 'iife',
      name: 'edward',
      sourcemap: true
  },
  plugins: [
    del({ targets: './demo/dist/**' }),
    typescript({ tsconfig: 'tsconfig.json' }),
    terser(),
    serve({
      contentBase: 'demo',
      host: 'localhost',
      port: 3080,
      onListening: function (server) {
        const address = server.address()
        const host = address.address === '::1' ? 'localhost' : address.address
        const schema = server.https ? 'https' : 'http'
        console.log(`Server listening at ${schema}://${host}:${address.port}/`)
      }
    })
  ]
}
