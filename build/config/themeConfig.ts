import { generate } from '@ant-design/colors'

export const primaryColor = '#0960bd'

export const themeMode = 'light' // 默认主题

type GenerateTheme = 'default' | 'dark'

// 解决临时检查的方法类型
type Fn = (...args: any) => any

// Vite生成颜色组的方法参数
export interface GenerateColorsParams {
  mixLighten: Fn
  mixDarken: Fn
  tinycolor: any
  color?: string
}

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

// 生成随机颜色
export function generateColors({
  color = primaryColor,
  mixLighten,
  mixDarken,
  tinycolor,
}: GenerateColorsParams) {
  const arr = new Array(19).fill(0)
  const lightens = arr.map((_t, i) => {
    return mixLighten(color, i / 5)
  })

  const darkens = arr.map((_t, i) => {
    return mixDarken(color, i / 5)
  })

  const alphaColors = arr.map((_t, i) => {
    return tinycolor(color)
      .setAlpha(i / 20)
      .toRgbString()
  })

  const shortAlphaColors = alphaColors.map((item) => item.replace(/\s/g, '').replace(/0\./g, '.'))

  const tinycolorLightens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .lighten(i * 5)
        .toHexString()
    })
    .filter((item) => item !== '#ffffff')

  const tinycolorDarkens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .darken(i * 5)
        .toHexString()
    })
    .filter((item) => item !== '#000000')
  return [
    ...lightens,
    ...darkens,
    ...alphaColors,
    ...shortAlphaColors,
    ...tinycolorDarkens,
    ...tinycolorLightens,
  ].filter((item) => !item.includes('-'))
}
