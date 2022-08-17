// 国际化设置

import { LocaleType } from '#/config'
import { useLocaleStoreWithOut } from '@/store/module/locale'
import { computed, unref } from 'vue'
import { loadLocalePool, setHtmlPageLang } from './helper'
import { i18n } from './setupI18n'

interface LangModule {
  message: Recordable
  dateLocale: Recordable
  dateLocaleName: string
}

// 设置国际化语言
function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStoreWithOut()

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    ;(i18n.global.locale as any).value = locale
  }
  localeStore.setLocaleInfo({ locale })
  setHtmlPageLang(locale)
}

export function useLocale() {
  const localStore = useLocaleStoreWithOut()
  const getLocale = computed(() => localStore.getLocale)

  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global
    const currentLocale = unref(globalI18n.locale)
    if (currentLocale === locale) {
      return locale
    }

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale)
      return locale
    }

    const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule
    if (!langModule) {
      return
    }

    const { message } = langModule

    globalI18n.setLocaleMessage(locale, message)
    loadLocalePool.push(locale)

    setI18nLanguage(locale)
    return locale
  }

  return { getLocale, changeLocale }
}
