import { LocaleType } from '#/config'

export const loadLocalePool: LocaleType[] = []

export function setHtmlPageLang(locale: LocaleType) {
  document.querySelector('html')?.setAttribute('lang', locale)
}
