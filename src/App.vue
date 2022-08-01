<script lang="ts">
import SvgIcon from '../src/components/Icon/src/SvgIcon.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import { ref, defineComponent } from 'vue'
const { value: port } = ref(import.meta.env.VITE_PORT)
console.log(port, 'port')
export default defineComponent({
  components: {
    SvgIcon,
    HelloWorld,
  },
})
</script>

<template>
  <h1>Hello Vite</h1>
  <SvgIcon name="vue" />
  <HelloWorld msg="hello"></HelloWorld>
</template>

<style scoped></style>
