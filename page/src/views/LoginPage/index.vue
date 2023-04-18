<template>
  <ElCard class="login-card">
    <div class="header">欢迎登录物资管理系统</div>
    <ElForm>
      <ElFormItem label="帐号：">
        <ElInput></ElInput>
      </ElFormItem>
      <ElFormItem label="密码：">
        <ElInput></ElInput>
      </ElFormItem>
    </ElForm>
    <div class="footer">
      <ElButton  type="primary" class="login-button" @click="login">登录</ElButton>
    </div>
  </ElCard>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const login = () => {
  router.push('/dataMgt/UserMgt');
};
</script>

<style lang="scss" scoped>
.login-card {
  width: 20rem;
  margin: 0 auto;

  .header {
    margin-bottom: 2rem;
    text-align: center;
  }
  .footer {
    text-align: center;

    .login-button {
      width: 17.5rem;
    }
  }
}
</style>
