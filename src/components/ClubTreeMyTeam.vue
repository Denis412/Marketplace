<template>
  <div class="c-mt-24" v-if="pages">
    <q-tree
      :nodes="pages"
      node-key="id"
      no-connectors
      v-model:selected="selected"
      no-selection-unset
      class="c-tree"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import pageApi from "src/sdk/page";

const route = useRoute();
const selected = ref();

const { result: pagesTree } = pageApi.paginateRootPages({
  page: 1,
  perPage: 10,
  where: {
    column: "title",
    operator: "EQ",
    value: route.query.name,
  },
  space_id: route.query.space,
});

const pages = computed(() =>
  pagesTree.value?.rootPages.data.map((page) => {
    return {
      label: page.title,
      children: page.children.data.map((children) => ({
        id: children.id,
        label: children.title,
      })),
    };
  })
);
</script>

<style lang="scss" scoped></style>
