<template>
  <ElDialog :model-value="modelValue" title="用户" destroy-on-close @close="closeDialog" width="30rem">
    <ElForm ref="formRef" :model="ruleForm" :rules="rules" label-width="6rem">
      <ElFormItem label="仓库名称：" prop="roomId">
        <ElSelect v-model="ruleForm.roomId" placeholder="Select">
          <ElOption v-for="item in roomOptionsWithoutAll" :key="item.value" :label="item.label" :value="item.value" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="物资名称：" prop="goodsId">
        <ElSelect v-model="ruleForm.goodsId" placeholder="Select">
          <ElOption v-for="item in goodsOptionsWithoutAll" :key="item.value" :label="item.label" :value="item.value" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="数量：" prop="counts">
        <ElInput v-model.number="ruleForm.counts" class="counts-input" />
      </ElFormItem>
    </ElForm>
    <div class="button">
      <ElButton @click="closeDialog">取消</ElButton>
      <ElButton type="primary" @click="addItem(formRef)">确定</ElButton>
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

const { roomOptions, goodsOptions } = storeToRefs(store);

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'edit'): void;
  (e: 'close'): void;
}>();

const roomOptionsWithoutAll: Ref<Array<Options>> = ref([]);
const goodsOptionsWithoutAll: Ref<Array<Options>> = ref([]);

const formRef = ref<FormInstance>();

const ruleForm = reactive<CountsParams>({
  roomId: '',
  goodsId: '',
  counts: 0,
});

const rules = reactive<FormRules>({
  roomId: [{ required: true, message: '必填' }],
  goodsId: [{ required: true, message: '必填' }],
  counts: [
    { required: true, message: '必填' },
    { type: 'number', message: '必须填入数字' },
  ],
});

const addItem = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      await store.addCounts(ruleForm);
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
      roomOptionsWithoutAll.value = roomOptions.value.slice(1);
      goodsOptionsWithoutAll.value = goodsOptions.value.slice(1);
      ruleForm.roomId = '';
      ruleForm.goodsId = '';
      ruleForm.counts = 0;
    }
  }
);
</script>

<style lang="scss" scoped>
.counts-input {
  width: 15rem;
}
</style>
