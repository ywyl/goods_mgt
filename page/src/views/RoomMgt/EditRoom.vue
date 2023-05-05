<template>
  <ElDialog :model-value="modelValue" title="用户" destroy-on-close @close="closeDialog" width="30rem">
    <ElForm ref="formRef" :model="ruleForm" :rules="rules" label-width="6rem">
      <ElFormItem label="仓库名称：" prop="roomName">
        <ElInput v-model="ruleForm.roomName" />
      </ElFormItem>
      <ElFormItem label="仓库地址：" prop="address">
        <ElInput v-model="ruleForm.address" />
      </ElFormItem>
    </ElForm>
    <div class="button">
      <ElButton @click="closeDialog">取消</ElButton>
      <ElButton type="primary" @click="addRoom(formRef)">确定</ElButton>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

import type { RoomParams } from './store';
import useStore from './store';

const store = useStore();

const props = defineProps<{
  modelValue: boolean;
  currentInfo: RoomParams;
}>();

const emit = defineEmits<{
  (e: 'edit'): void;
  (e: 'close'): void;
}>();

const formRef = ref<FormInstance>();

const ruleForm: RoomParams = reactive({
  id: '',
  roomName: '',
  address: '',
});

const rules = reactive<FormRules>({
  roomName: [{ required: true, message: '必填' }],
});

const addRoom = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      if (props.currentInfo.id) {
        await store.updateRoom(ruleForm);
      } else {
        await store.addRoom(ruleForm);
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
      ruleForm.roomName = props.currentInfo.roomName;
      ruleForm.address = props.currentInfo.address;
    }
  }
);
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  justify-content: flex-end;
}
</style>
