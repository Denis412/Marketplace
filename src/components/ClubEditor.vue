<template>
  <div class="q-pa-md q-gutter-sm">
    <c-editor-header :titleDocument="titleDocument" />
    <c-editor-body @update:titleDocument="updateTitle" />
  </div>
</template>

<script setup>
import CEditorHeader from "./ClubEditorHeader.vue";
import CEditorBody from "./ClubEditorBody.vue";
import { ref } from "vue";

const titleDocument = ref("");

const updateTitle = (title) => {
  titleDocument.value = title;
};
</script>

<style lang="scss" scoped></style>
