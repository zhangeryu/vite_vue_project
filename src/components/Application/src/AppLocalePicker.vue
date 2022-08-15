<template>
  <DropdownVue
    placement="bottom"
    :trigger="['click']"
    :drop-menu-list="localeList"
    :selected-keys="selectedKeys"
    overlay-class-name="app-locale-picker-overlay"
    @menu-event="handleMenuEvent"
  >
    <span class="cursor-pointer flex items-center">
      <Icon icon="ion:language" />
      <span v-if="showText" class="ml-1">{{ getLocaleText }}</span>
    </span>
  </DropdownVue>
</template>
<script setup lang="ts">
import { computed, ref, unref } from 'vue'
import type { PropType } from 'vue'
import DropdownVue from '@/components/Dropdown/src/Dropdown.vue'
import Icon from '@/components/Icon/src/Icon.vue'
import { localeList } from '@/settings/localeSetting'
import { DropMenu } from '@/components/Dropdown/src/typing'
import { useLocale } from '@/locales/useLocale'
import type { LocaleType } from '#/config'

const { getLocale, changeLocale } = useLocale()

const props = defineProps({
  showText: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  reload: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
})
const selectedKeys = ref<string[]>([])

const getLocaleText = computed(() => {
  const key = selectedKeys.value[0]
  if (!key) {
    return ''
  }
  return localeList.find((item) => item.event === key)?.text
})
async function toggleLocale(lang: LocaleType | string) {
  await changeLocale(lang as LocaleType)
  selectedKeys.value = [lang as string]
  props.reload && location.reload()
}

// 切换语言
const handleMenuEvent = (menu: DropMenu) => {
  if (unref(getLocale) === menu.event) {
    return
  }
  toggleLocale(menu.event as string)
}
</script>

<style lang="less">
.app-locale-picker-overlay {
  .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
