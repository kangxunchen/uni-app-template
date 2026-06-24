import { defineConfig } from 'vite'
import Uni from '@uni-helper/plugin-uni'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Uni(),
    UnoCSS(),
    AutoImport({
      imports: ['vue', 'uni-app', 'pinia'],
      dts: './auto-imports.d.ts'
    })
  ]
})
