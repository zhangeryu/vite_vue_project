// 统一做plugin配置处理，方便后期维护管理
import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuejsx from '@vitejs/plugin-vue-jsx'

import windiCss from 'vite-plugin-windicss' // 快速编译css,热更新加载更快
import PurgeIcons from 'vite-plugin-purge-icons' // use iconify(图标库)
import { ViteEnv } from '../../../types/plugins'
import { configHtmlPlugins } from './html' // 配置一个为index.html提供minify和基于EJS模板功能的Vite插件
import { configSvgIconsPlugin } from './svgSprite' // 图标插件
import { configStyleImportPlugin } from './styleImport' // 按需导入组件库样式的插件
import { configVisualize } from './visualizer' // 依赖收集
import { configThemePlugin } from './theme' // 更改界面主题色
import { configImageminPlugin } from './imagemin' // 图片压缩
import { configCompressPlugin } from './compress' // 压缩文件以及生成后的文件格式
import { configVitePwaPlugin } from './pwa' // 技术集成

// 创建配置选项
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_IMAGEMIN, VITE_USE_MOCK, VITE_LEGACY, VITE_BUILD_COMPRESS } = viteEnv
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), vuejsx()]

  vitePlugins.push(configHtmlPlugins(viteEnv, isBuild))

  vitePlugins.push(configSvgIconsPlugin(isBuild))

  vitePlugins.push(windiCss())

  vitePlugins.push(PurgeIcons())

  vitePlugins.push(configStyleImportPlugin())

  vitePlugins.push(configVisualize())

  vitePlugins.push(configThemePlugin())

  // 执行build命令之后才会触发以下配置项
  if (isBuild) {
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin())

    vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS))

    vitePlugins.push(configVitePwaPlugin(viteEnv))
  }

  return vitePlugins
}
