<template>
  <!-- <pre>{{ pagesTeams }}</pre> -->
  <div class="c-mt-24" v-if="pages">
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
import { ref, watch, computed, inject } from "vue";
import { useRouter, useRoute } from "vue-router";

import pageApi from "src/sdk/page";

const router = useRouter();
const route = useRoute();
const selected = ref(
  route.path.includes("my_projects")
    ? process.env.MY_PROJECTS_PAGE_ID
    : process.env.PROJECTS_PAGE_ID
);
const currentUser = inject("currentUser");

const { result: pagesTeams } = pageApi.paginatePages({
  page: 1,
  perPage: 1,
  where: {
    column: "title",
    operator: "EQ",
    value: "Проекты",
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

    if (page.id === process.env.PROJECTS_PAGE_ID) {
      treeElem.children = currentUser.value?.projects.map((project) => ({
        id: project.id,
        label: project.name,
      }));
    }

    return treeElem;
  })
);

const redirect = (page_id) => {
  if (page_id === process.env.MY_PROJECTS_PAGE_ID || page_id === process.env.PROJECTS_PAGE_ID) {
    router.push({
      name: page_id === process.env.MY_PROJECTS_PAGE_ID ? "my-projects" : "my-projects",
    });

    return;
  }

  const page = currentUser.value.projects.find((project) => project.id === page_id);

  router.push({
    name: "project",
    params: { id: page.id },
    query: { name: page.name, space: page.space },
  });
};
</script>

<style lang="scss" scoped></style>
