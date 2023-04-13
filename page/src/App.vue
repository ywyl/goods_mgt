<template>
  <ElConfigProvider :locale="zhcn">
    <ElContainer>
      <ElAside class="nav">
        <ElMenu router class="menu">
          <ElMenu-item index="/UserMgt">
            <span>人员信息管理</span>
          </ElMenu-item>
          <ElMenu-item index="/RoomMgt">
            <span>仓库信息管理</span>
          </ElMenu-item>
          <ElMenu-item index="/GoodsMgt">
            <span>物资信息管理</span>
          </ElMenu-item>
        </ElMenu>
      </ElAside>
      <ElMain class="content">
        <RouterView />
      </ElMain>
    </ElContainer>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import zhcn from 'element-plus/lib/locale/lang/zh-cn';
</script>

<style lang="scss" scoped>
.nav {
  width: 200px;
  .menu {
    height: 100vh;
  }
}

.content {
  background-color: #fafafa;
}
</style>
