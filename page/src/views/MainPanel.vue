<template>
  <ElContainer>
    <ElAside class="nav">
      <ElMenu default-active="/Main/DataMgt/UserMgt" router class="menu">
        <ElSubMenu>
          <template #title>
            <span>信息管理</span>
          </template>
          <ElMenuItemGroup>
            <ElMenuItem index="/Main/DataMgt/UserMgt">
              <span>人员信息管理</span>
            </ElMenuItem>
            <ElMenuItem index="/Main/DataMgt/RoomMgt">
              <span>仓库信息管理</span>
            </ElMenuItem>
            <ElMenuItem index="/Main/DataMgt/GoodsMgt">
              <span>物资信息管理</span>
            </ElMenuItem>
          </ElMenuItemGroup>
        </ElSubMenu>
        <ElSubMenu>
          <template #title>
            <span>物资管理</span>
          </template>
          <ElMenuItemGroup>
            <ElMenuItem index="/Main/CountsMgt/GoodsView">
              <span>仓库物资管理</span>
            </ElMenuItem>
            <ElMenuItem index="3">
              <span>公共物资管理</span>
            </ElMenuItem>
          </ElMenuItemGroup>
        </ElSubMenu>
      </ElMenu>
    </ElAside>
    <ElMain class="content">
      <RouterView />
    </ElMain>
  </ElContainer>
</template>

<script setup lang="ts">
import { ElMenuItemGroup } from 'element-plus';
</script>

<style lang="scss">
.el-menu-item-group__title {
  display:none;
}

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
