<!-- Дерево "Команды" -->
<template>
  <div class="q-pa-md q-gutter-sm" v-if="pagesTree.length">
    <q-tree
      :nodes="pagesTree"
      node-key="id"
      no-connectors
      v-model:expanded="expanded"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import pageApi from "src/sdk/page";

const pagesTree = ref([]);

const { result: pagesTeams, onResult: createTree } = pageApi.paginatePages({
  page: 1,
  perPage: 10,
  where: {
    column: "parent_id",
    operator: "EQ",
    value: process.env.TEAMS_PAGES_ID,
  },
});

createTree(() => {
  pagesTeams.value.pages.data.forEach((page) => {
    let treeElem = {
      label: page.title,
      id: page.id,
    };

    pagesTree.value.push(treeElem);
  });
});
</script>

<style lang="scss" scoped>
</style>