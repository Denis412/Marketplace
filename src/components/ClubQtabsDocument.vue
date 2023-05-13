<template>
  <div>
    <!-- <q-tabs
      class="row no-wrap q-pl-lg drawer-item"
      indicator-color="transparent"
      v-for="(doc, index) in FILES"
      :key="doc.id"
      align="left"
    >
      <q-tabs-item :doc="doc" :index="index" />
    </q-tabs> -->

    <div>
      <Draggable v-model="data" ref="tree" virtualization style="height: 500px">
        <template #default="{ node, stat }">
          <q-tabs-item :node="node" :doc="FILES[node.index]" />
        </template>
      </Draggable>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from "vue";
import { useFileStore } from "src/stores/file";

import QTabsItem from "./ClubQtabsItemComponent.vue";

////
import { Draggable } from "@he-tree/vue";
import "@he-tree/vue/style/default.css";

const data = ref([
  // {
  //   text: "Документы",
  //   children: [],
  // },
]);
////

const storeFile = useFileStore();
const FILES = computed(() => storeFile.GET_FILES);

watch(FILES, () => {
  console.log("watch FIELS");

  let index = 0;

  data.value = FILES.value.map((file) => {
    return { text: file.name.replace(".html", ""), index: index++ };
  });

  console.log(data.value);
});

let index = 0;

data.value = FILES.value.map((file) => {
  return { text: file.name.replace(".html", ""), index: index++ };
});

console.log(data.value);
</script>

<style scoped lang="scss">
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
</style>
