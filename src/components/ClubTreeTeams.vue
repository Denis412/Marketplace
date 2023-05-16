<!-- Дерево "Команды" -->
<template>
  <div class="q-pa-md q-gutter-sm" v-if="pagesTree.length">
    <q-tree
      :nodes="pagesTree"
      node-key="id"
      no-connectors
      v-model:selected="selected"
      @update:selected="log"
      no-selection-unset
    />

    <pre>{{ pagesTeams }}</pre>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import pageApi from "src/sdk/page";
import userApi from "src/sdk/user";

const pagesTree = ref([]);
const selected = ref("");

console.log("FUCK!!!!!!!");

const log = () => {
  //функция для навигации
  console.log(selected.value);
};

const { result: pagesTeams, onResult: createTree } = pageApi.paginatePages({
  page: 1,
  perPage: 10,
  where: {
    column: "parent_id",
    operator: "EQ",
    value: process.env.TEAMS_PAGE_ID,
  },
});

const { result: myTeams, onResult: createSubTree } = userApi.paginateSubjects({
  page: 1,
  perPage: 1,
  where: {
    column: "user_id",
    operator: "EQ",
    value: JSON.parse(localStorage.getItem("user-data")).user_id,
  },
  is_my_teams: true,
});

createTree(() => {
  pagesTeams.value.pages.data.forEach((page) => {
    let treeElem = {
      id: page.id,
      label: page.title,
      children: [],
    };

    pagesTree.value.push(treeElem);
  });
});

createSubTree(() => {
  let index = pagesTree.value.findIndex(
    (elem) => elem.id === process.env.MY_TEAMS_PAGE_ID
  );

  myTeams.value.paginate_subject?.data[0].teams.forEach((team) => {
    let treeSubElem = {
      id: team.id,
      label: team.name,
      children: [],
    };

    pagesTree.value[index].children.push(treeSubElem);
  });
});
</script>

<style lang="scss" scoped>
</style>