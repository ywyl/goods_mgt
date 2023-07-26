<template>
  <ElDialog :model-value="modelValue" title="记录查看" destroy-on-close @close="closeDialog" width="50rem">
    <ElTable :data="records">
      <ElTableColumn label="操作类型" width="150">
        <template #default="{ row }">
          {{ row.operation ? '减少' : '增加' }}
        </template>
      </ElTableColumn>
      <ElTableColumn prop="amount" label="数量" width="200" />
      <ElTableColumn prop="target" label="目标（来源于/消耗于）" width="200" />
      <ElTableColumn prop="recordTime" label="时间" />
    </ElTable> 
  </ElDialog>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { storeToRefs } from 'pinia';

import type { CountsParams } from './store';
import useStore from './store';

const store = useStore();

const { records } = storeToRefs(store);

const props = defineProps<{
  modelValue: boolean;
  currentInfo: CountsParams;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const closeDialog = () => {
  emit('close');
};

watch(
  () => props.modelValue,
  async (newValue: boolean) => {
    if (newValue) {
      await store.queryRecords(props.currentInfo);
      console.log(records.value);
    }
  }
);
</script>

<style lang="scss"></style>
