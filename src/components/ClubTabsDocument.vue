<template>
  <div>
    <div>
      <Draggable
        v-model="data_tree"
        ref="tree"
        virtualization
        style="height: 500px"
        @after-drop="contex()"
      >
        <template #default="{ node, stat }">
          <c-tabs-item :stat="stat" :node="node" />
          <!-- <c-tabs-item :stat="stat" :node="node" :doc="FILES[node.index]" /> -->
        </template>
      </Draggable>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from "vue";
import CTabsItem from "./ClubTabsItemComponent.vue";
import { Draggable } from "@he-tree/vue";
import { dragContext } from "@he-tree/vue";
import "@he-tree/vue/style/default.css";
import { filesApi } from "src/sdk/files/file";
import pageApi from "src/sdk/page";
import { dragContext } from "@he-tree/vue";
import "@he-tree/vue/style/default.css";

const rootPage = ref();
const data_tree = ref([]);

//Получение корневой страницы документов
const getData = async () => {
  data_tree.value = await filesApi.getRootPage("4440891212883535597", 13);
};

const contex = () => {
  let parent_id =
    dragContext.targetInfo.dragNode.parent?.data.page_id ||
    "4440891212883535597";

  pageApi.update({
    input: {
      parent_id: parent_id,
    },

    id: dragContext.startInfo.dragNode.data.page_id,
    space_id: 13,
  });
};

getData();
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
