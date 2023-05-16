<template>
  <div class="q-pa-md q-gutter-sm">
    <q-tree
      :nodes="pages"
      node-key="id"
      no-connectors
      v-model:selected="selected"
      @update:selected="log"
      no-selection-unset
    />

    <!-- <pre>{{ pages }}</pre> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import pageApi from "src/sdk/page";
import userApi from "src/sdk/user";

const pagesTree = ref([]);
const selected = ref("");

const log = () => {
  //функция для навигации
  console.log(selected.value);
};

const { result: pagesTeams } = pageApi.paginatePages({
  page: 1,
  perPage: 10,
  where: {
    column: "parent_id",
    operator: "EQ",
    value: process.env.TEAMS_PAGE_ID,
  },
});

const { result: myTeams } = userApi.paginateSubjects({
  page: 1,
  perPage: 1,
  where: {
    column: "user_id",
    operator: "EQ",
    value: JSON.parse(localStorage.getItem("user-data")).user_id,
  },
  is_my_teams: true,
});

const pages = computed(() => {
  if (!pagesTeams.value?.pages.data || !myTeams.value?.paginate_subject.data)
    return [];

  return pagesTeams.value?.pages.data?.map((page) => {
    let treeElem = {
      id: page.id,
      label: page.title,
      children: [],
    };

    if (page.id === process.env.MY_TEAMS_PAGE_ID)
      treeElem.children = myTeams.value?.paginate_subject.data[0].teams?.map(
        (team) => {
          return {
            id: team.id,
            label: team.name,
          };
        }
      );

    return treeElem;
  });
});
</script>

<style lang="scss" scoped></style>