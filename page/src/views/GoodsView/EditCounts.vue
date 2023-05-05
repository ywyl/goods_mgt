<template>
  <ElDialog :model-value="modelValue" title="用户" destroy-on-close @close="closeDialog" width="30rem">
    <ElForm ref="formRef" :model="ruleForm" :rules="rules" label-width="6rem">
      <ElFormItem label="操作：" prop="operation">
        <ElSelect v-model="ruleForm.operation" placeholder="Select">
          <ElOption v-for="item in OPERATION_OPTIONS" :key="item.value" :label="item.label" :value="item.value" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="数量：" prop="amount">
        <ElInput v-model.number="ruleForm.amount" class="amount-input" />
      </ElFormItem>
    </ElForm>
    <div class="button">
      <ElButton @click="closeDialog">取消</ElButton>
      <ElButton type="primary" @click="editCounts(formRef)">确定</ElButton>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

import type { Options } from '../interface';

import type { EditCountsParams } from './store';
import useStore from './store';

const store = useStore();

const props = defineProps<{
  modelValue: boolean;
  currentInfo: EditCountsParams;
}>();

const emit = defineEmits<{
  (e: 'edit'): void;
  (e: 'close'): void;
}>();

interface CountsParams {
  operation: number;
  amount: number;
}

const formRef = ref<FormInstance>();

const OPERATION_OPTIONS: Array<Options> = [
  {
    label: '增加',
    value: 0,
  },
  {
    label: '减少',
    value: 1,
  },
];

const ruleForm = reactive<CountsParams>({
  operation: 0,
  amount: 0,
});

const rules = reactive<FormRules>({
  operation: [{ required: true, message: '必填' }],
  amount: [
    { required: true, message: '必填' },
    { type: 'number', message: '必须填入数字' },
  ],
});

const editCounts = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      const params: EditCountsParams = {
        roomId: props.currentInfo.roomId,
        goodsId: props.currentInfo.goodsId,
        counts: ruleForm.operation
          ? props.currentInfo.counts - ruleForm.amount
          : props.currentInfo.counts + ruleForm.amount,
      };
      await store.editCounts(params);
      emit('edit');
    }
  });
};

const closeDialog = () => {
  emit('close');
};

watch(
  () => props.modelValue,
  (newValue: boolean) => {
    if (newValue) {
      ruleForm.operation = 0;
      ruleForm.amount = 0;
    }
  }
);
</script>

<style lang="scss" scoped>
.amount-input {
  width: 15rem;
}
</style>
