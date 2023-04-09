<template>
  <ElDialog :model-value="modelValue" title="用户" destroy-on-close @close="closeDialog" width="30rem">
    <ElForm ref="formRef" :model="ruleForm" :rules="rules" label-width="6rem">
      <ElFormItem label="用户帐号：" prop="account">
        <ElInput v-model="ruleForm.account" />
      </ElFormItem>
      <ElFormItem label="用户名：" prop="userName">
        <ElInput v-model="ruleForm.userName" />
      </ElFormItem>
      <ElFormItem label="密码：" prop="password">
        <ElInput v-model="ruleForm.password" />
      </ElFormItem>
      <ElFormItem label="管理员：" prop="isAdmin">
        <ElRadioGroup v-model="ruleForm.isAdmin">
          <ElRadio :label="1">是</ElRadio>
          <ElRadio :label="0">否</ElRadio>
        </ElRadioGroup>
      </ElFormItem>
    </ElForm>
    <div class="button">
      <ElButton @click="closeDialog">取消</ElButton>
      <ElButton type="primary" @click="addUser(formRef)">确定</ElButton>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

import type { UserParams } from './store';
import useStore from './store';

const store = useStore();

const props = defineProps<{
  modelValue: boolean;
  currentInfo: UserParams;
}>();

const emit = defineEmits<{
  (e: 'edit'): void;
  (e: 'close'): void;
}>();

const formRef = ref<FormInstance>();

const ruleForm: UserParams = reactive({
  account: '',
  userName: '',
  password: '',
  isAdmin: 0,
});

const rules = reactive<FormRules>({
  UserName: [{ required: true, message: '必填' }],
});

const addUser = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      if (props.currentInfo.account) {
        await store.updateUser(ruleForm);
      } else {
        await store.addUser(ruleForm);
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
      ruleForm.account = props.currentInfo.account;
      ruleForm.userName = props.currentInfo.userName;
      ruleForm.isAdmin = props.currentInfo.isAdmin;
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
