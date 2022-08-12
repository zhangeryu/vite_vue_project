import { defineStore } from 'pinia'
import { HeaderSetting, ProjectConfig, MenuSetting } from '#/config'

import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from '@/enums/cacheEnum'
import { darkMode } from '@/settings/designSetting'
import { Persistent } from '@/utils/cache/persistent'
import { ThemeEnum } from '@/enums/appEnum'
import { deepMerge } from '@/utils'

interface AppStore {
  darkMode?: ThemeEnum
  projectConfig: ProjectConfig | null
}

export const useAppStore = defineStore({
  id: 'app',

  state: (): AppStore => ({
    darkMode: undefined,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
  }),

  getters: {
    // 获取当前主题
    getDarkMode(): 'light' | 'dark' | string {
      return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode
    },

    // 获取当前项目配置列表
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig)
    },

    // 获取头部背景颜色配置
    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting
    },

    //
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting
    },
  },
  actions: {
    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode
      localStorage.setItem(APP_DARK_MODE_KEY_, mode)
    },

    setProjectConfig(config: DeepPartial<ProjectConfig>) {
      this.projectConfig = deepMerge(this.projectConfig || {}, config)
      // todo ProjectConfig.setLocal() 设置本地语言
    },
  },
})
