import { defineConfig, loadEnv } from 'vite'
import Uni from '@uni-helper/plugin-uni'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      Uni(),
      UnoCSS(),
      AutoImport({
        imports: ['vue', 'uni-app', 'pinia'],
        dts: './auto-imports.d.ts'
      })
    ],
    // 将 staticBaseUrl 注入为 SCSS 变量，供 uni.scss 中的 set_background_image 使用
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `$static-base-url: '${env.VITE_STATIC_BASE_URL}';`
        }
      }
    },
    server: {
      proxy: {
        [env.VITE_PROXY_PREFIX]: {
          target: env.VITE_BASE_URL,
          rewrite: p => p.replace(new RegExp(`^${env.VITE_PROXY_PREFIX}`), ''),
          changeOrigin: true,
          secure: false
        }
      }
    }
  }
})
