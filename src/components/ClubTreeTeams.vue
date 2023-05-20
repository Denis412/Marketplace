<template>
  <div class="c-mt-24">
    <q-tree
      :nodes="pages"
      node-key="id"
      no-connectors
      v-model:selected="selected"
      @update:selected="go"
      no-selection-unset
      class="c-tree"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, inject } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/user";
import pageApi from "src/sdk/page";
import userApi from "src/sdk/user";

const router = useRouter();
const pagesTree = ref([]);
const selected = ref(process.env.MY_TEAMS_PAGE_ID);
const userStore = useUserStore();
const currentUser = inject("currentUser");

const go = () => {
  if (selected.value === process.env.MY_TEAMS_PAGE_ID) {
    router.push({
      name: "my-teams",
    });
  } else if (selected.value === process.env.ALL_TEAMS_PAGE_ID) {
    router.push({
      name: "teams",
    });
  } else {
    let team = currentUser.value.teams.find((elem) => {
      if (elem.id === selected.value) {
        return elem;
      }
    });
    router.push({
      name: "team",
      params: { name: team.name },
    });
  }
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
      icon: "img: /assets/icons/tree/default-tree-icon.svg",
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

<style lang="scss" scoped>
</style>