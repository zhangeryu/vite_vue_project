import { VitePWA } from 'vite-plugin-pwa'
import { ViteEnv } from '../../../types/plugins'

export function configVitePwaPlugin(env: ViteEnv) {
  // 先获取环境变量
  const { VITE_USE_PWA, VITE_GLOB_APP_TITLE, VITE_GLOB_APP_SHORT_NAME } = env
  if (VITE_USE_PWA) {
    const pwaPlugin = VitePWA({
      manifest: {
        name: VITE_GLOB_APP_TITLE,
        short_name: VITE_GLOB_APP_SHORT_NAME,
        icons: [
          {
            // ./表示public文件夹
            src: './resource/img/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './resource/img/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    })
    return pwaPlugin
  }
  return []
}
