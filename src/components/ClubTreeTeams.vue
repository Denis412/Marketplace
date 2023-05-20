<template>
  <div class="q-pa-md q-gutter-sm" v-if="pages">
    <q-tree
      :nodes="pages"
      node-key="id"
      no-connectors
      v-model:selected="selected"
      @update:selected="redirect"
      no-selection-unset
      class="c-tree"
    />
  </div>
</template>

<script setup>
import { ref, computed, inject } from "vue";
import { useRouter } from "vue-router";

import pageApi from "src/sdk/page";

const router = useRouter();
const selected = ref(process.env.MY_TEAMS_PAGE_ID);
const currentUser = inject("currentUser");

const { result: pagesTeams } = pageApi.paginatePages({
  page: 1,
  perPage: 10,
  where: {
    column: "parent_id",
    operator: "EQ",
    value: process.env.TEAMS_PAGE_ID,
  },
});

const pages = computed(() =>
  pagesTeams.value?.pages.data?.map((page) => {
    let treeElem = {
      id: page.id,
      label: page.title,
      icon: "img:/assets/icons/tree/default-tree-icon.svg",
      children: [],
    };

    if (page.id === process.env.MY_TEAMS_PAGE_ID)
      treeElem.children = currentUser.value?.teams.map((team) => {
        return {
          id: team.id,
          label: team.name,
          space: team.space,
        };
      });

    return treeElem;
  })
);

const redirect = (page_id) => {
  if (
    page_id === process.env.MY_TEAMS_PAGE_ID ||
    page_id === process.env.ALL_TEAMS_PAGE_ID
  ) {
    router.push({
      name: page_id === process.env.MY_TEAMS_PAGE_ID ? "my-teams" : "teams",
    });

    return;
  }

  const page = currentUser.value.teams.find((team) => team.id === page_id);

  router.push({
    name: "team",
    params: { id: page.id },
    query: { name: page.name, space: page.space },
  });
};
</script>

<style lang="scss" scoped></style>
