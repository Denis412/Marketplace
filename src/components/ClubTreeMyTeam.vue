<template>
  <div class="c-mt-24" v-if="pages">
    <q-tree
      :nodes="pages"
      node-key="label"
      no-connectors
      v-model:selected="selected"
      @update:selected="redirect"
      no-selection-unset
      default-expand-all
      class="c-tree"
    ></q-tree>
  </div>
</template>

<script setup>
import { computed, ref, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import pageApi from "src/sdk/page";

const route = useRoute();
const router = useRouter();
const currentUser = inject("currentUser");

const selected = ref(route.path.includes("space") ? "Командное пространство" : "Профиль команды");

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

const pages = computed(() => {
  if (!pagesTree.value?.rootPages.data?.length) {
    return [
      {
        id: route.params.id,
        label: route.query.name,
        icon: "img:/assets/icons/tree/default-tree-icon.svg",
        children: [
          {
            id: route.params.id,
            label: "Профиль команды",
            icon: "img:/assets/icons/tree/default-tree-icon.svg",
          },
        ],
      },
    ];
  }

  return pagesTree.value?.rootPages.data.map((page) => ({
    label: page.title,
    icon: "img:/assets/icons/tree/default-tree-icon.svg",
    children: page.children.data.map((children) => ({
      id: children.id,
      label: children.title,
      icon: "img:/assets/icons/tree/default-tree-icon.svg",
    })),
  }));
});

console.log(router.currentRoute.value.path.includes("team"));

const redirect = () => {
  console.log("redirect");
  router.push({
    name: selected.value === "Командное пространство" ? "teamSpace" : "team",
    params: { id: route.params.id },
    query: { name: route.query.name, space: route.query.space },
  });
};
</script>

<style lang="scss" scoped></style>
