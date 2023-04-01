<template>
  <ElCard>
    <div class="header">
      <div class="operation">
        <ElButton type="primary" @click="openDialog"> 添加 </ElButton>
      </div>
      <div class="search">
        <ElInput v-model="queryParams.roomName">
          <template #append>
            <ElButton :icon="ElSearch" @click="changeSearchValue" />
          </template>
        </ElInput>
      </div>
    </div>

    <ElTable :data="roomList" border stripe>
      <ElTableColumn prop="room_name" label="仓库名称" min-width="15" />
      <ElTableColumn prop="address" label="仓库地址" min-width="25" />
      <ElTableColumn label="操作" min-width="15">
        <template #default="{ row }">
          <ElButton type="warning" link @click="editRoom(row.id)"> 编辑 </ElButton>
          <ElButton type="primary" link @click="deleteRoom(row.id)">删除</ElButton>
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
        :total="roomList.length"
      />
    </div>
  </ElCard>

  <ElDialog v-model="dialogVisible" title="用户" destroy-on-close @close="closeDialog" width="30rem">
    <ElForm :model="ruleForm" label-width="6rem">
      <ElFormItem label="仓库名称：">
        <ElInput v-model="ruleForm.roomName" />
      </ElFormItem>
      <ElFormItem label="仓库地址：">
        <ElInput v-model="ruleForm.address" />
      </ElFormItem>
    </ElForm>
    <div class="button">
      <ElButton @click="closeDialog">取消</ElButton>
      <ElButton type="primary" @click="addRoom">确定</ElButton>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import type { Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { Search as ElSearch } from '@element-plus/icons-vue';

import type { ListParams, RoomParams } from './store';
import useStore from './store';

const store = useStore();

const { roomList } = storeToRefs(store);

const queryParams: ListParams = reactive({
  start: 0,
  limit: 10,
  roomName: '',
});

// watch(queryParams, async (newValue) => {
//   const { results, total } = await store.getRoomList();
// });

const dialogVisible: Ref<boolean> = ref(false);
const openDialog = () => {
  dialogVisible.value = true;
};
const closeDialog = () => {
  dialogVisible.value = false;
};

const ruleForm: RoomParams = reactive({
  roomName: '',
  address: '',
})

const editRoom = (id: string) => {};
const deleteRoom = (id: string) => {};
const changeSearchValue = () => {};

const addRoom = async () => {
  await store.addRoom(ruleForm);
  closeDialog();
  store.getRoomList()
}

onMounted(() => store.getRoomList());
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
