<template>
  <SvgIcon
    v-if="isSvgIcon"
    :size="size"
    :name="getSvgIcon"
    :class="[$attrs.class, 'anticon']"
    :spin="spin"
  />
  <span
    v-else
    ref="elRef"
    :class="[$attrs.class, 'app-iconify anticon', spin && 'app-iconify-spin']"
    :style="getWrapStyle"
  ></span>
</template>
<script setup lang="ts">
import Iconify from '@purge-icons/generated'
import { isString } from '@/utils/is'
import { computed, CSSProperties, onMounted, unref, nextTick, ref, watch } from 'vue'
import type { PropType } from 'vue'
import SvgIcon from './SvgIcon.vue'

const props = defineProps({
  size: {
    type: [String, Number] as PropType<string | number>,
    default: 16,
  },
  spin: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  icon: {
    type: String as PropType<string>,
    default: '',
  },
  color: {
    type: String as PropType<string>,
    default: '',
  },
  prefix: {
    type: String as PropType<string>,
    default: '',
  },
})
const SVG_END_WITH_FLAG = '|svg'

const getSvgIcon = computed(() => {
  return props.icon.replace(SVG_END_WITH_FLAG, '')
})

const isSvgIcon = computed(() => {
  return props.icon?.endsWith(SVG_END_WITH_FLAG)
})

const getWrapStyle = computed((): CSSProperties => {
  const { size, color } = props
  let fs = size
  if (isString(size)) {
    fs = parseInt(size, 10)
  }

  return {
    fontSize: `${fs}px`,
    color: color,
    display: 'inline-flex',
  }
})

const getIconRef = computed(() => `${props.prefix ? props.prefix + ':' : ''}${props.icon}`)

// eslint-disable-next-line no-undef
const elRef = ref<ElRef>(null)
const update = async () => {
  if (unref(isSvgIcon)) {
    return
  }

  const el = unref(elRef)
  if (!el) {
    return
  }

  await nextTick()
  const icon = unref(getIconRef)
  if (!icon) {
    return
  }

  const svg = Iconify.renderSVG(icon, {})
  if (svg) {
    el.textContent = ''
    el.appendChild(svg)
  } else {
    const span = document.createElement('span')
    span.className = 'iconify'
    span.dataset.icon = icon
    el.textContent = ''
    el.appendChild(span)
  }
}
watch(() => props.icon, update, { flush: 'post' })
onMounted(update)
</script>

<style lang="less" scoped></style>
