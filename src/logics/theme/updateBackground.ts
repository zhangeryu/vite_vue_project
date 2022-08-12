import { ThemeEnum } from '@/enums/appEnum'
import { useAppStore } from '@/store/module/app'
import { colorIsDark, lighten, darken } from '@/utils/colors'
import { setCssVar } from './util'

const HEADER_BG_COLOR_VAR = '--header-bg-color'
const HEADER_BG_HOVER_COLOR_VAR = '--header-bg-hover-color'
const HEADER_MENU_ACTIVE_BG_COLOR_VAR = '--header-active-menu-bg-color'

const SIDER_DARK_BG_COLOR = '--sider-dark-bg-color'
const SIDER_DARK_DARKEN_BG_COLOR = '--sider-dark-darken-bg-color'
const SIDER_LIGHTEN_BG_COLOR = '--sider-dark-lighten-bg-color'

// 设置header背景样式
export function updateHeaderBgColor(color?: string) {
  const appStore = useAppStore()
  const darkMode = appStore.getDarkMode === ThemeEnum.DARK

  if (!color) {
    if (darkMode) {
      color = '#151515'
    } else {
      color = appStore.getHeaderSetting.bgColor
    }
  }
  // 设置当前头部背景样式
  setCssVar(HEADER_BG_COLOR_VAR, color)

  // 设置hover样式
  const hoverColor = lighten(color!, 6)
  setCssVar(HEADER_BG_HOVER_COLOR_VAR, hoverColor)
  setCssVar(HEADER_MENU_ACTIVE_BG_COLOR_VAR, hoverColor)

  const isDark = colorIsDark(color!)
  appStore.setProjectConfig({
    headerSetting: {
      theme: isDark || darkMode ? ThemeEnum.DARK : ThemeEnum.LIGHT,
    },
  })
}

export function updateSidebarBgColor(color?: string) {
  const appStore = useAppStore()

  // if (!isHexColor(color)) return;
  const darkMode = appStore.getDarkMode === ThemeEnum.DARK
  if (!color) {
    if (darkMode) {
      color = '#212121'
    } else {
      color = appStore.getMenuSetting.bgColor
    }
  }
  setCssVar(SIDER_DARK_BG_COLOR, color)
  setCssVar(SIDER_DARK_DARKEN_BG_COLOR, darken(color!, 6))
  setCssVar(SIDER_LIGHTEN_BG_COLOR, lighten(color!, 5))

  // only #ffffff is light
  // Only when the background color is #fff, the theme of the menu will be changed to light
  const isLight = ['#fff', '#ffffff'].includes(color!.toLowerCase())

  appStore.setProjectConfig({
    menuSetting: {
      theme: isLight && !darkMode ? ThemeEnum.LIGHT : ThemeEnum.DARK,
    },
  })
}
