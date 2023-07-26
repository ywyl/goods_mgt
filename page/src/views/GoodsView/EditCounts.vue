<template>
  <ElDialog :model-value="modelValue" title="用户" destroy-on-close @close="closeDialog" width="30rem">
    <ElForm ref="formRef" :model="ruleForm" :rules="rules" label-width="6rem">
      <ElFormItem label="操作：" prop="operation">
        <ElSelect v-model="ruleForm.operation" placeholder="Select">
          <ElOption v-for="item in OPERATION_OPTIONS" :key="item.value" :label="item.label" :value="item.value" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="对象：" prop="target">
        <ElSelect v-model="ruleForm.target" placeholder="Select">
          <ElOption v-for="item in TARGET_OPTIONS" :key="item.value" :label="item.label" :value="item.value" />
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
import { storeToRefs } from 'pinia';
import type { Ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

import type { Options } from '../interface';

import type { CountsParams } from './store';
import useStore from './store';

const store = useStore();

const { roomOptions } = storeToRefs(store);

const props = defineProps<{
  modelValue: boolean;
  currentInfo: CountsParams;
}>();

const emit = defineEmits<{
  (e: 'edit'): void;
  (e: 'close'): void;
}>();

interface EditCounts {
  operation: number;
  target: string;
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

const TARGET_OPTIONS: Ref<Array<Options>> = ref([]);

const ruleForm = reactive<EditCounts>({
  operation: 0,
  target: '',
  amount: 0,
});

const rules = reactive<FormRules>({
  operation: [{ required: true, message: '必填' }],
  target: [{ required: true, message: '必填' }],
  amount: [
    { required: true, message: '必填' },
    { type: 'number', message: '必须填入数字' },
  ],
});

const editCounts = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      const propCounts = props.currentInfo.counts || 0;
      const params: CountsParams = {
        ...ruleForm,
        roomId: props.currentInfo.roomId,
        goodsId: props.currentInfo.goodsId,
        counts: ruleForm.operation ? propCounts - ruleForm.amount : propCounts + ruleForm.amount,
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
      TARGET_OPTIONS.value = roomOptions.value.slice(1);
      ruleForm.operation = 0;
      ruleForm.target = props.currentInfo.roomId || '';
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
