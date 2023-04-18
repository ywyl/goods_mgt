<template>
  <ElContainer>
    <ElAside class="nav">
      <ElMenu default-active="/DataMgt/UserMgt" router class="menu">
        <ElMenu-item index="/DataMgt/UserMgt">
          <span>人员信息管理</span>
        </ElMenu-item>
        <ElMenu-item index="/DataMgt/RoomMgt">
          <span>仓库信息管理</span>
        </ElMenu-item>
        <ElMenu-item index="/DataMgt/GoodsMgt">
          <span>物资信息管理</span>
        </ElMenu-item>
      </ElMenu>
    </ElAside>
    <ElMain class="content">
      <RouterView />
    </ElMain>
  </ElContainer>
</template>

<script setup lang="ts"></script>

<style lang="scss">
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
