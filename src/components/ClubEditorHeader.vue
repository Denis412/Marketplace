<template>
  <div class="row q-my-lg">
    <input readonly class="q-py-sm q-pt-sm col-6" :placeholder="path" />

    <input
      readonly
      class="q-py-sm col-6"
      style="direction: rtl"
      :placeholder="'Дата создания: ' + date"
    />

    <input
      autocomplete="off"
      class="text-h3 q-mb-sm col-12"
      id="id"
      placeholder="Придумайте название документа"
      v-model="title"
    />
  </div>
</template>

<script setup>
import { data } from "src/utils/documentData";
import { ref, watch, computed } from "vue";
import { useFileStore } from "src/stores/file";
const storeFile = useFileStore();

//****************************************************************************** */
// Хлебные крошки надо будут отдельным компонентом, это не просто плейсхолдер

const path = "Главная/Сайт с каталогом/Без названия"; //Placeholder

//****************************************************************************** */

const date = ref("");
const titleDocument = computed(() => storeFile.currentTitleDoc);
const dateDocument = computed(() => storeFile.currentDateDoc);
const title = ref();

watch(titleDocument, () => {
  title.value = titleDocument.value;
});

watch(dateDocument, () => {
  date.value = dateDocument.value;
  date.value = date.value.slice(0, 10);
});

watch(title, () => {
  //****************************************************************************** */
  // В рамках стора устанавливайте значения через методы actions

  storeFile.currentTitleDoc = title.value;

  //****************************************************************************** */
});
</script>

<style lang="scss" scoped>
input {
  color: grey;
  outline: none;
  border: none;
}
</style>
