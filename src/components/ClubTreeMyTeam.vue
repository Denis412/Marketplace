<template>
  <div class="c-mt-24">
    <q-tree
      :nodes="pagesTre"
      node-key="label"
      no-connectors
      v-model:selected="selected"
      @update:selected="go"
      no-selection-unset
      class="c-tree"
    />

    <pre>{{ pagesTree }}</pre>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, inject } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "src/stores/user";
import pageApi from "src/sdk/page";
import userApi from "src/sdk/user";

const route = useRoute();
const pagesTre = ref([
  {
    label: "bla",
  },
]);
const selected = ref();
const userStore = useUserStore();
const currentUser = inject("currentUser");
const team = ref();

const go = () => {};

team.value = currentUser.value?.teams.find((elem) => {
  if (elem.name === route.params.name) {
    return elem;
  }
});

const { result: pagesTree } = pageApi.paginateRootPages({
  page: 1,
  perPage: 10,
  where: {
    column: "title",
    operator: "EQ",
    value: team.value.name,
  },
  space_id: team.value.space,
});

const pages = computed(() => {
  if (!pagesTree.value?.rootPages.data) console.log("{HZHZHZ");
  else console.log("RESULT", pagesTree.value?.rootPages.data);
});
</script>

<style lang="scss" scoped>
</style>