<template>
  <ElCard>
    <div class="header">
      <div class="operation">
        <ElButton type="primary" @click="openDialog"> 添加 </ElButton>
      </div>
      <div class="search">
        <ElInput v-model="queryParams.roomName" @keyup.enter="changeSearchValue">
          <template #append>
            <ElButton :icon="ElSearch" @click="changeSearchValue" />
          </template>
        </ElInput>
      </div>
    </div>

    <ElTable :data="roomList" border stripe>
      <ElTableColumn prop="roomName" label="仓库名称" min-width="15" />
      <ElTableColumn prop="address" label="仓库地址" min-width="25" />
      <ElTableColumn label="操作" min-width="15">
        <template #default="{ row }">
          <ElButton type="warning" link @click="openDialog(row)"> 编辑 </ElButton>
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
        :total="total"
      />
    </div>
  </ElCard>

  <EditRoom :model-value="dialogVisible" :current-info="currentInfo" @edit="editRoom" @close="closeDialog"> </EditRoom>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import type { Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { Search as ElSearch } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';

import EditRoom from './EditRoom.vue';
import type { ListParams, RoomParams } from './store';
import useStore from './store';

const store = useStore();

const { roomList, total } = storeToRefs(store);

const queryParams: ListParams = reactive({
  start: 1,
  limit: 10,
  roomName: '',
});

watch([() => queryParams.start, () => queryParams.limit], () => {
  store.getRoomList(queryParams);
});

const currentInfo = reactive<RoomParams>({
  roomName: '',
  address: '',
});

const dialogVisible: Ref<boolean> = ref(false);
const openDialog = (params?: RoomParams) => {
  dialogVisible.value = true;
  currentInfo.id = params?.id || '';
  currentInfo.roomName = params?.roomName || '';
  currentInfo.address = params?.address || '';
};
const closeDialog = () => {
  dialogVisible.value = false;
};

const deleteRoom = async (id: string) => {
  try {
    await ElMessageBox.confirm(
    '确定删除仓库吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    await store.deleteRoom(id);
    store.getRoomList({
      ...queryParams,
      start: 1,
    });
  
  } catch {
    () => {};
  }
};
const changeSearchValue = () => {
  store.getRoomList(queryParams);
};

const editRoom = () => {
  closeDialog();
  store.getRoomList(queryParams);
};

onMounted(() => store.getRoomList(queryParams));
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
