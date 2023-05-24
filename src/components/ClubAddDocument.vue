<template>
  <q-icon @click="addDocument" name="add" />
</template>

<script setup>
import { defineProps } from "vue";
import { filesFunc } from "src/use/fileFunctions";

const props = defineProps({
  node: Object,
});

const addDocument = () => {
  filesFunc.createHtmlFile({ space_id: 13, parent_id: props.node.page_id });
};
</script>

<style scoped lang="scss"></style>
