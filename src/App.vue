<script setup lang="ts">
import { ref } from 'vue'
const { value: port } = ref(import.meta.env.VITE_PORT)
console.log(port, 'port')
</script>

<template>
  <h1>Hello Vite</h1>
</template>

<style scoped></style>
