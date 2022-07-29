import { generate } from '@ant-design/colors'

export const primaryColor = '#0960bd'

type GenerateTheme = 'default' | 'dark'

// 系统组件颜色配置
export function generateAntColors(color: string, theme: GenerateTheme = 'default') {
  return generate(color, {
    theme,
  })
}

// 主题颜色配置
export function getThemeColors(color?: string) {
  const tc = color || primaryColor
  const lightColors = generateAntColors(tc)
  const primary = lightColors[5]
  const modeColors = generateAntColors(primary, 'dark')
  return [...lightColors, ...modeColors]
}
