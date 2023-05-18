<template>
  <q-icon @click="addDocument" name="add" />
</template>

<script setup>
import { ref } from "vue";
import { filesApi } from "src/sdk/files/file";
import { onResult } from "src/sdk/files/fileQuery";

const props = defineProps({
  node: Object,
});

const addDocument = () => {
  filesApi.createHtmlFile({ space_id: 13, parent_id: props.node.page_id });
  console.log(props.node);
};
</script>

<style scoped lang="scss"></style>
