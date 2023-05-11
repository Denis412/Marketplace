<template>
  <div class="row q-my-lg">
    <input readonly class="q-py-sm q-pt-sm col-6" :placeholder="path" />
    <input
      readonly
      class="q-py-sm col-6"
      style="direction: rtl"
      :placeholder="'Дата создания: ' + day + ' ' + month + ' ' + year"
    />
    <input
      autocomplete="off"
      class="text-h3 q-mb-sm col-12"
      id="id"
      placeholder="Придумайте название документа"
      v-model="vModelTitleDocument"
    />
  </div>
</template>

<script setup>
import { data } from "src/utils/documentData";
import { ref, watch, computed } from "vue";
import { useFileStore } from "src/stores/file";
const storeFile = useFileStore();

const path = "Главная/Сайт с каталогом/Без названия"; //Placeholder
const date = new Date();
const day = date.getDate();
const month = data.monthNames[date.getMonth()];
const year = date.getFullYear();
const titleDocument = computed(() => storeFile.currentTitleDoc);
const vModelTitleDocument = ref();

watch(titleDocument, () => {
  vModelTitleDocument.value = titleDocument.value;
});

watch(vModelTitleDocument, () => {
  storeFile.currentTitleDoc = vModelTitleDocument.value;
});
</script>

<style lang="scss" scoped>
input {
  color: grey;
  outline: none;
  border: none;
}
</style>
