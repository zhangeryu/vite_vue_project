import { addClass, hasClass, removeClass } from '@/utils/domUtils'
import { darkCssIsReady, loadDarkThemeCss } from 'vite-plugin-theme/es/client'

export function updateDarkTheme(mode: string | null = 'light') {
  const _htmlRoot = document.getElementById('html-root')
  if (!_htmlRoot) {
    return false
  }
  // 获取dark主题下的class
  const hasDarkClass = hasClass(_htmlRoot, 'dark')
  // 首先要先判断当前的主题是否dark
  if (mode === 'dark') {
    if (import.meta.env.PROD && !darkCssIsReady) {
      loadDarkThemeCss()
    }
    _htmlRoot.setAttribute('data-theme', 'dark')

    if (!hasDarkClass) {
      addClass(_htmlRoot, 'dark')
    }
  } else {
    _htmlRoot.setAttribute('data-theme', 'light')
    if (hasDarkClass) {
      removeClass(_htmlRoot, 'dark')
    }
  }
}
