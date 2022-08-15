import { store } from '..'

import { defineStore } from 'pinia'
import { LOCALE_KEY } from '@/enums/cacheEnum'

import type { LocaleSetting, LocaleType } from '#/config'
import { createLocalStorage } from '@/utils/cache'
import { localeSetting } from '@/settings/localeSetting'

interface LocaleState {
  localInfo: LocaleSetting
}
const LS = createLocalStorage()
const lsLocaleSetting = (LS.get(LOCALE_KEY) || localeSetting) as LocaleSetting

export const useLocaleStore = defineStore({
  id: 'app-locale',

  state: (): LocaleState => ({
    localInfo: lsLocaleSetting,
  }),

  getters: {
    getLocale(): LocaleType {
      return this.localInfo?.locale ?? 'zh_CN'
    },
  },

  actions: {
    setLocaleInfo(info: Partial<LocaleSetting>) {
      // 需要对store数据进行克隆,同时存入本地
      this.localInfo = { ...this.localInfo, ...info }
      LS.set(LOCALE_KEY, this.localInfo)
    },
  },
})

export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
