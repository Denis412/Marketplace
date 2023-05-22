<template>
  <div class="row q-my-lg">
    <c-breadcrumbs class="col-6 my-input" />

    <input
      readonly
      class="q-py-sm col-6 my-input"
      style="direction: rtl"
      :placeholder="'Дата создания: ' + date"
    />

    <input
      autocomplete="off"
      class="text-h3 q-mb-sm col-12 my-input"
      id="id"
      placeholder="Придумайте название документа"
      v-model="title"
    />
  </div>
</template>

<script setup>
import CBreadcrumbs from "./ClubВreadcrumbs.vue";
import { ref, watch, computed } from "vue";
import { useFileStore } from "src/stores/file";
const storeFile = useFileStore();
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
.my-input {
  color: grey;
  outline: none;
  border: none;
}
</style>
