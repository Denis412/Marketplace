<template>
  <q-drawer show-if-above bordered :side="side" :mini="miniState" v-model="drawer" :width="256" :mini-width="64">
    <q-list class="c-pr-8 c-pt-12 no-scroll">
      <q-item v-for="item in mainTreeItems" :key="item.title" :class="{ active: isActive(item.path) }"
        class="drawer-wrapper">
        <router-link :to="{ name: item.path }" class="row no-wrap c-pl-16 drawer-item">

          <template v-if="item.title == 'Документы'">
            <q-expansion-item label="Документы" class="documents">
              <template v-slot:header>
                <img src="/assets/icons/home/home-white.svg" class="home-icon bg-primary">
                <q-item-section>
                  Документы
                </q-item-section>
              </template>

              <q-item class="addDoc">
                Добавить документ
                <q-icon @click="addDocument" name="add" class="q-pl-md" />
              </q-item>
              <c-tabs-document />

            </q-expansion-item>
          </template>

          <template v-else>
            <div class="flex flex-center bg-primary " style="border-radius: 6px; padding: 4px">
              <img src="/assets/icons/home/home-white.svg" alt="" />
            </div>
            <div class="text-caption1 drawer-text c-ml-12">
              {{ item.title }}
            </div>
          </template>
        </router-link>
      </q-item>
    </q-list>

    <button ref="btn" class="bg-violet-6 drawer-btn absolute" @click="toggleDrawer()">
      <img src="/assets/icons/arrow/drawer-arrow.svg" />
    </button>
  </q-drawer>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import CTabsDocument from "src/components/ClubTabsDocument.vue";
import { filesApi } from "src/sdk/files/file";

const { side } = defineProps({
  side: String,
});

const route = useRoute();

const drawer = ref(false);
const miniState = ref(false);

const btn = ref();

const mainTreeItems = ref([
  {
    title: "Главная",
    img: "HomeIconDemo.svg",
    path: "club",
  },
  {
    title: "Магазин",
    img: "HomeIconDemo.svg",
    path: "market",
  },
  {
    title: "Команды",
    img: "HomeIconDemo.svg",
    path: "teams",
  },
  {
    title: "Мои команды",
    img: "HomeIconDemo.svg",
    path: "my-teams",
  },
  {
    title: "Мои проекты",
    img: "HomeIconDemo.svg",
    path: "my-projects",
  },
  {
    title: "Мое пространство",
    img: "HomeIconDemo.svg",
    path: "space",
  },
  {
    title: "Задачи",
    img: "HomeIconDemo.svg",
    path: "taskPage",
  },
  {
    title: "Документы",
    img: "HomeIconDemo.svg",
    path: "addDocument",
    content: "+",
  },
]);

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

.documents {
  overflow: hidden;
  color: grey;
  align-items: center;
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
  align-items: center;
  padding-left: 30px;
}

.home-icon {
  display: flex;
  border-radius: 6px;
  padding: 4px
}
</style>
