<template>
  <ElDialog :model-value="modelValue" title="物资" destroy-on-close @close="closeDialog" width="30rem">
    <ElForm ref="formRef" :model="ruleForm" :rules="rules" label-width="6rem">
      <ElFormItem label="物资名称：" prop="goodsName">
        <ElInput v-model="ruleForm.goodsName" />
      </ElFormItem>
      <ElFormItem label="类型：" prop="type">
        <ElRadioGroup v-model="ruleForm.type">
          <ElRadio :label="0">公共物资</ElRadio>
          <ElRadio :label="1">消耗物资</ElRadio>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="描述：" prop="description">
        <ElInput v-model="ruleForm.description" />
      </ElFormItem>
    </ElForm>
    <div class="button">
      <ElButton @click="closeDialog">取消</ElButton>
      <ElButton type="primary" @click="addGoods(formRef)">确定</ElButton>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

import type { GoodsParams } from './store';
import useStore from './store';

const store = useStore();

const props = defineProps<{
  modelValue: boolean;
  currentInfo: GoodsParams;
}>();

const emit = defineEmits<{
  (e: 'edit'): void;
  (e: 'close'): void;
}>();

const formRef = ref<FormInstance>();

const ruleForm: GoodsParams = reactive({
  goodsName: '',
  description: '',
  type: -1,
});

const rules = reactive<FormRules>({
  goodsName: [{ required: true, message: '必填' }],
  type: [{ required: true, message: '必填' }],
});

const addGoods = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      if (props.currentInfo.id) {
        await store.updateGoods(ruleForm);
      } else {
        await store.addGoods(ruleForm);
      }
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
      ruleForm.id = props.currentInfo.id;
      ruleForm.goodsName = props.currentInfo.goodsName;
      ruleForm.description = props.currentInfo.description;
      ruleForm.type = props.currentInfo.type;
    }
  }
);
</script>

<style lang="scss">
.button {
  display: flex;
  justify-content: flex-end;
}
</style>
