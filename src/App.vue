<script lang="ts" setup>
import { ConfigProvider } from 'ant-design-vue'
import AppProvider from '@/components/Application/src/AppProvider.vue'
</script>

<template>
  <ConfigProvider>
    <AppProvider>
      <router-view></router-view>
    </AppProvider>
  </ConfigProvider>
</template>

<style scoped></style>
