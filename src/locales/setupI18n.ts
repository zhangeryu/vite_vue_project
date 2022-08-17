import { useLocaleStoreWithOut } from '@/store/module/locale'
import type { I18n, I18nOptions } from 'vue-i18n'
import { createI18n } from 'vue-i18n'

export let i18n: ReturnType<typeof createI18n>

async function createI18nOptions(): Promise<I18nOptions> {
  const localeStore = useLocaleStoreWithOut()
  const locale = localeStore.getLocale
  // 获取本地默认语言
  const defaultLocale = await import(`./lang/${locale}.ts`)
  return {}
}
