<template>
  <ElCard shadow="never">
    <div class="header">
      <div class="operation">
        <ElButton type="primary" @click="openAllDialog"> 添加 </ElButton>
      </div>
      <div class="search">
        <div class="search-item">
          <span>仓库名称：</span>
          <ElSelect v-model="queryParams.roomName" placeholder="Select">
            <ElOption v-for="item in roomOptions" :key="item.value" :label="item.label" :value="item.value" />
          </ElSelect>
        </div>
        <div class="search-item">
          <span>物资名称：</span>
          <ElSelect v-model="queryParams.goodsName" placeholder="Select">
            <ElOption v-for="item in goodsOptions" :key="item.value" :label="item.label" :value="item.value" />
          </ElSelect>
        </div>
      </div>
    </div>

    <ElTable :data="goodsCounsList" border stripe>
      <ElTableColumn prop="mgt_room.roomName" label="仓库名称" min-width="15" />
      <ElTableColumn prop="mgt_good.goodsName" label="物资名称" min-width="15"> </ElTableColumn>
      <ElTableColumn prop="counts" label="数量" min-width="15" />
      <ElTableColumn label="操作" min-width="15">
        <template #default="{ row }">
          <ElButton type="warning" link @click="openEditDialog(row)"> 编辑 </ElButton>
          <ElButton type="primary" link @click="deleteCounts(row)"> 删除 </ElButton>
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

  <AddItem :model-value="addDialogVisible" @edit="editCounts" @close="closeDialog"></AddItem>

  <EditCounts :model-value="editDialogVisible" :current-info="currentInfo" @edit="editCounts" @close="closeDialog">
  </EditCounts>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import type { Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { ElMessageBox } from 'element-plus';

import AddItem from './AddItem.vue';
import EditCounts from './EditCounts.vue';
import type { QueryCountsParmas, CountsParams } from './store';
import useStore from './store';

const store = useStore();

const { goodsCounsList, total, roomOptions, goodsOptions } = storeToRefs(store);

const queryParams: QueryCountsParmas = reactive({
  start: 1,
  limit: 10,
  roomName: '',
  goodsName: '',
});

const currentInfo = reactive<CountsParams>({
  roomId: '',
  goodsId: '',
  counts: 0,
});

const addDialogVisible: Ref<boolean> = ref(false);
const openAllDialog = () => {
  addDialogVisible.value = true;
};

const editDialogVisible: Ref<boolean> = ref(false);
const openEditDialog = (params: CountsParams) => {
  editDialogVisible.value = true;
  currentInfo.roomId = params.roomId;
  currentInfo.goodsId = params.goodsId;
  currentInfo.counts = params.counts;
};
const closeDialog = () => {
  addDialogVisible.value = false;
  editDialogVisible.value = false;
};

const editCounts = () => {
  closeDialog();
  store.getGoodsCountsList(queryParams);
};

const deleteCounts = async (row: CountsParams) => {
  try {
    await ElMessageBox.confirm('确定删除记录吗？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
    await store.deleteCounts(row);
    store.getGoodsCountsList({
      ...queryParams,
      start: 1,
    });
  } catch {
    () => {
      console.log(111);
    };
  }
};

onMounted(async () => {
  await Promise.all([store.getAllRooms(), store.getAllGoods(), store.getGoodsCountsList(queryParams)]);
});
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;

  .search {
    display: flex;

    .search-item:not(:last-child) {
      margin-right: 10px;
    }
  }
}

.footer {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}
</style>
