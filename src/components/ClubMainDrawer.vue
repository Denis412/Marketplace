<template>
  <q-drawer
    show-if-above
    bordered
    :side="side"
    :mini="miniState"
    v-model="drawer"
    :width="256"
    :mini-width="64"
  >
    <c-tree-my-team v-if="team" :class="{ 'c-tree-mini': miniState }" />
    <c-tree-projects v-else-if="projects" :class="{ 'c-tree-mini': miniState }" />
    <c-tree-my-orders v-else-if="orders" :class="{ 'c-tree-mini': miniState }" />
    <c-tree-teams v-else-if="!team" :class="{ 'c-tree-mini': miniState }" />

    <button ref="btn" class="bg-violet-6 drawer-btn absolute" @click="toggleDrawer()">
      <img src="/assets/icons/arrow/drawer-arrow.svg" />
    </button>
  </q-drawer>
</template>

<script setup>
import { ref, inject } from "vue";
import { useRoute } from "vue-router";
import CQtabsDocument from "src/components/ClubQtabsDocument.vue";
import CTreeTeams from "src/components/ClubTreeTeams.vue";
import CTreeMyTeam from "src/components/ClubTreeMyTeam.vue";
import CTreeProjects from "src/components/ClubTreeProjects.vue";
import CTreeOrders from "src/components/ClubTreeOrders.vue";

import { filesApi } from "src/sdk/files/file";
import CTreeMyOrders from "components/ClubTreeMyOrders.vue";

const { side, team, projects, orders } = defineProps({
  side: String,
  team: Boolean,
  projects: Boolean,
  orders: Boolean,
});

const route = useRoute();
const currentUser = inject("currentUser");

const drawer = ref(false);
const miniState = ref(false);

const btn = ref();

const isMyteam = () => {
  return currentUser.value?.teams.some((team) => team.space === route.query.space);
};

// const mainTreeItems = ref([
//   {
//     title: "Главная",
//     img: "HomeIconDemo.svg",
//     path: "club",
//   },
//   {
//     title: "Магазин",
//     img: "HomeIconDemo.svg",
//     path: "market",
//   },
//   {
//     title: "Команды",
//     img: "HomeIconDemo.svg",
//     path: "my-teams",
//   },
//   {
//     title: "Документы",
//     img: "HomeIconDemo.svg",
//     path: "addDocument",
//     content: "+",
//   },
//   {
//     title: "Лендинг",
//     img: "HomeIconDemo.svg",
//     path: "addDocument",
//   },
// ]);

const toggleDrawer = () => {
  miniState.value = !miniState.value;
  btn.value.classList.toggle("rotate");
};

const addDocument = () => {
  filesApi.createHtmlFile();
};

const isActive = (path) => {
  return route.path.includes(path) && route.name.includes(path);
};
</script>

<style scoped lang="scss">
.drawer-btn {
  width: 24px;
  height: 24px;
  box-shadow: 0px 1px 11px rgba(132, 132, 132, 0.25);
  border-radius: 5px;
  border: none;
  top: 8px;
  right: -12px;
  transition: ease 0.5s all;
  cursor: pointer;
}

.q-drawer-container:not(.q-drawer--mini-animate) .q-drawer--mini .q-item {
  justify-content: start;
}

.drawer-item {
  align-items: center;
  text-decoration: none;
  width: 100%;
  height: 100%;
  padding-top: 8px;
  padding-bottom: 8px;

  .drawer-text {
    height: 20px;
    width: fit-content;
    overflow: hidden;
    color: grey;
  }
}

.drawer-wrapper {
  border-radius: 0px 6px 6px 0px;
  margin-top: 4px;
  display: block;

  &:hover {
    background: #eaeaea;
  }

  cursor: pointer;
}

.q-item {
  padding: 0;
}

.active {
  background: #eaeaea;
}

.rotate {
  transform: rotate(-180deg);
}
.addDoc {
  padding-left: 4rem;
}
</style>
