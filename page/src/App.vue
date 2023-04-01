<template>
  <ElConfigProvider :locale="zhcn">
    <div class="main">
      <ul class="nav">
        <li class="nav-item" @click="showDetails('/UserMgt')">人员信息管理</li>
        <li class="nav-item" @click="showDetails('/RoomMgt')">仓库信息管理</li>
        <li class="nav-item" @click="showDetails('/GoodsMgt')">物资信息管理</li>
      </ul>
      <div class="content">
        <RouterView />
      </div>
    </div>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import zhcn from 'element-plus/lib/locale/lang/zh-cn';
import { useRouter } from 'vue-router';

const router = useRouter();

const showDetails = (path: string) => {
  router.push(path);
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;

  .nav {
    width: 200px;
    height: 100vh;
    color: #303133;
    border-right: 1px solid gray;

    .nav-item {
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: gray;

      &:hover {
        cursor: pointer;
        color: #409eff;
        background-color: #e6e8eb;
      }
    }
  }

  .content {
    flex: 1;
    background-color: #fafafa;
  }
}
</style>
