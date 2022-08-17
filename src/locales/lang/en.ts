import antdLocale from 'ant-design-vue/es/locale/en_US'

import { genMessage } from '../helper'

const modules = import.meta.globEager('./en/**/*.ts') as any

export default {
  message: {
    ...genMessage(modules, 'en'),
    antdLocale,
  },
  dateLocale: null,
  dateLocaleName: 'en',
}