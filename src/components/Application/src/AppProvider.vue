<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
import { prefixCls } from '@/settings/designSetting'
import { createAppProviderContext } from './useAppContext'

const props = {
  prefixCls: { type: String, default: prefixCls },
}
export default defineComponent({
  name: 'AppProvider',
  inheritAttrs: false, // https://www.javascriptc.com/vue3js/api/options-misc.html#inheritattrs
  props,
  setup(props, { slots }) {
    const { prefixCls } = toRefs(props)
    const isMobile = ref(false)

    createAppProviderContext({ prefixCls, isMobile })

    return () => slots.default?.()
  },
})
</script>
