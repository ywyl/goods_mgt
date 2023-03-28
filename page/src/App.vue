<template>
  <ElRow>
    <ElCol :span="4">
      <ElMenu @open="handleOpen" @close="handleClose">
        <ElMenuItem>
          <span>人员信息管理</span>
        </ElMenuItem>
        <ElMenuItem>
          <span>仓库信息管理</span>
        </ElMenuItem>
        <ElMenuItem>
          <span>物资条目管理</span>
        </ElMenuItem>
      </ElMenu>
    </ElCol>
    <ElCol :span="20">
      <RouterView>
        <Main />
      </RouterView>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
import Main from './views/index.vue';
const handleOpen = () => {};
const handleClose = () => {};
</script>

<style lacg="scss" scoped></style>
