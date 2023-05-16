<template>
  <div>
    <div>
      <Draggable v-model="data" ref="tree" virtualization style="height: 500px">
        <template #default="{ node }">
          <c-tabs-item :node="node" :doc="FILES[node.index]" />
        </template>
      </Draggable>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from "vue";
import { useFileStore } from "src/stores/file";

import CTabsItem from "./ClubTabsItemComponent.vue";

import { Draggable } from "@he-tree/vue";
import "@he-tree/vue/style/default.css";

const data = ref([]);

const storeFile = useFileStore();
const FILES = computed(() => storeFile.GET_FILES);

let index = 0;

watch(FILES, () => {
  index = 0;

  data.value = FILES.value.map((file) => {
    return { text: file.name.replace(".html", ""), index: index++ };
  });

  console.log(FILES.value);
  console.log(data.value);
});

data.value = FILES.value.map((file) => {
  return { text: file.name.replace(".html", ""), index: index++ };
});
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
