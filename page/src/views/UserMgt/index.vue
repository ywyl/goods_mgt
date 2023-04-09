<template>
  <ElCard>
    <div class="header">
      <div class="operation">
        <ElButton type="primary" @click="openDialog"> 添加 </ElButton>
      </div>
      <div class="search">
        <ElInput v-model="queryParams.userName" @keyup.enter="changeSearchValue">
          <template #append>
            <ElButton :icon="ElSearch" @click="changeSearchValue" />
          </template>
        </ElInput>
      </div>
    </div>

    <ElTable :data="userList" border stripe>
      <ElTableColumn prop="account" label="用户帐号" min-width="15" />
      <ElTableColumn prop="userName" label="用户名" min-width="15" />
      <ElTableColumn prop="isAdmin" label="管理员" min-width="25">
        <template #default="{ row }">
          {{ row.isAdmin ? '是' : '否' }}
        </template>
      </ElTableColumn>
      <ElTableColumn label="操作" min-width="15">
        <template #default="{ row }">
          <ElButton type="warning" link @click="openDialog(row)"> 编辑 </ElButton>
          <ElButton type="primary" link @click="deleteUser(row.account)">删除</ElButton>
        </template>
      </ElTableColumn>
    </ElTable>

    <div class="footer">
      <ElPagination
        v-model:current-page="queryParams.start"
        v-model:page-size="queryParams.limit"
        :page-sizes="[5, 10, 20, 50, 100]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </div>
  </ElCard>

  <EditUser :model-value="dialogVisible" :current-info="currentInfo" @edit="editUser" @close="closeDialog"> </EditUser>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import type { Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { Search as ElSearch } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';

import EditUser from './EditUser.vue';
import type { QueryUserParmas, UserParams } from './store';
import useStore from './store';

const store = useStore();

const { userList, total } = storeToRefs(store);

const queryParams: QueryUserParmas = reactive({
  start: 1,
  limit: 10,
  userName: '',
});

watch([() => queryParams.start, () => queryParams.limit], () => {
  store.getUserList(queryParams);
});

const currentInfo = reactive<UserParams>({
  account: '',
  userName: '',
  password: '',
  isAdmin: 0,
});

const dialogVisible: Ref<boolean> = ref(false);
const openDialog = (params?: UserParams) => {
  dialogVisible.value = true;
  currentInfo.account = params?.account || '';
  currentInfo.userName = params?.userName || '';
  currentInfo.isAdmin = params?.isAdmin || 0;
};
const closeDialog = () => {
  dialogVisible.value = false;
};

const deleteUser = async (account: string) => {
  try {
    await ElMessageBox.confirm('确定删除用户吗？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
    await store.deleteUser(account);
    store.getUserList({
      ...queryParams,
      start: 1,
    });
  } catch {
    () => {
      console.log(111);
    };
  }
};
const changeSearchValue = () => {
  store.getUserList(queryParams);
};

const editUser = () => {
  closeDialog();
  store.getUserList(queryParams);
};

onMounted(() => store.getUserList(queryParams));
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
}

.footer {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}
</style>
