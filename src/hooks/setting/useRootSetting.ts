import { computed } from 'vue'
import { useAppStore } from '@/store/module/app'
import { ThemeEnum } from '@/enums/appEnum'
import { APP_DARK_MODE_KEY_ } from '@/enums/cacheEnum'

export function useRootSetting() {
  const appStore = useAppStore()

  const getDarkMode = computed(() => appStore.getDarkMode) // 获取主题

  const getShowDarkModeToggle = computed(() => appStore.getProjectConfig.showDarkModeToggle) // 控制是否展示主题切换组件

  // 设置主题
  function setDarkMode(mode: ThemeEnum) {
    appStore.setDarkMode(mode)
    localStorage.setItem(APP_DARK_MODE_KEY_, mode)
  }

  return {
    getDarkMode,
    setDarkMode,
    getShowDarkModeToggle,
  }
}
