<template>
  <ElConfigProvider :locale="zhcn">
    <RouterView />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import zhcn from 'element-plus/lib/locale/lang/zh-cn';
</script>

<style lang="scss" scoped></style>
