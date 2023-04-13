<template>
  <ElCard shadow="never">
    <div class="header">
      <div class="operation">
        <ElButton type="primary" @click="openDialog"> 添加 </ElButton>
      </div>
      <div class="search">
        <ElInput v-model="queryParams.goodsName" @keyup.enter="changeSearchValue">
          <template #append>
            <ElButton :icon="ElSearch" @click="changeSearchValue" />
          </template>
        </ElInput>
      </div>
    </div>

    <ElTable :data="goodsList" border stripe>
      <ElTableColumn prop="goodsName" label="物资名称" min-width="15" />
      <ElTableColumn prop="type" label="类型" min-width="15">
        <template #default="{ row }">
          {{ row.type ? '消耗物资' : '公共物资' }}
        </template>
      </ElTableColumn>
      <ElTableColumn prop="description" label="描述" min-width="15" />
      <ElTableColumn label="操作" min-width="15">
        <template #default="{ row }">
          <ElButton type="warning" link @click="openDialog(row)"> 编辑 </ElButton>
          <ElButton type="primary" link @click="deleteGoods(row.id)"> 删除 </ElButton>
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

  <EditGoods :model-value="dialogVisible" :current-info="currentInfo" @edit="editGoods" @close="closeDialog">
  </EditGoods>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import type { Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { Search as ElSearch } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';

import EditGoods from './EditGoods.vue';
import type { QueryGoodsParmas, GoodsParams } from './store';
import useStore from './store';

const store = useStore();

const { goodsList, total } = storeToRefs(store);

const queryParams: QueryGoodsParmas = reactive({
  start: 1,
  limit: 10,
  goodsName: '',
});

watch([() => queryParams.start, () => queryParams.limit], () => {
  store.getGoodsList(queryParams);
});

const currentInfo = reactive<GoodsParams>({
  goodsName: '',
  description: '',
  type: 0,
});

const dialogVisible: Ref<boolean> = ref(false);
const openDialog = (params?: GoodsParams) => {
  dialogVisible.value = true;
  currentInfo.id = params?.id || '';
  currentInfo.goodsName = params?.goodsName || '';
  currentInfo.description = params?.description || '';
  currentInfo.type = params?.type || 0;
};
const closeDialog = () => {
  dialogVisible.value = false;
};

const deleteGoods = async (id: string) => {
  try {
    await ElMessageBox.confirm('确定删除仓库吗？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
    await store.deleteGoods(id);
    store.getGoodsList({
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
  store.getGoodsList(queryParams);
};

const editGoods = () => {
  closeDialog();
  store.getGoodsList(queryParams);
};

onMounted(() => store.getGoodsList(queryParams));
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
