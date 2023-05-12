<template>记录查看</template>

<script setup lang="ts">
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import useStore from './store';

const store = useStore();

const { records } = storeToRefs(store);

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

watch(
  () => props.modelValue,
  (newValue: boolean) => {
    if (newValue) {
      console.log(newValue);
    }
  }
);

onMounted(() => {
  console.log(records);
});
</script>

<style lang="scss"></style>
