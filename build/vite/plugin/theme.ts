import { viteThemePlugin, mixLighten, mixDarken, tinycolor } from 'vite-plugin-theme'

import { getThemeColors, generateColors } from '../../config/themeConfig'

export function configThemePlugin() {
  // 获取随机颜色数据
  const colors = generateColors({ mixDarken, mixLighten, tinycolor })
  console.log(colors)
}
