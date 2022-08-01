// 统一做plugin配置处理，方便后期维护管理
import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuejsx from '@vitejs/plugin-vue-jsx'

import { ViteEnv } from '../../../types/plugins'
import { configHtmlPlugins } from './html'
import { configSvgIconsPlugin } from './svgSprite'

// 创建配置选项
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_IMAGEMIN, VITE_USE_MOCK, VITE_LEGACY, VITE_BUILD_COMPRESS } = viteEnv
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), vuejsx()]
  vitePlugins.push(configHtmlPlugins(viteEnv, isBuild))
  vitePlugins.push(configSvgIconsPlugin(isBuild))
  return vitePlugins
}
