<template>
  <div>
    <div>
      <Draggable
        v-model="data_tree"
        ref="tree"
        virtualization
        :max-level="4"
        @after-drop="contex()"
      >
        <template #default="{ node, stat }">
          <c-tabs-item :stat="stat" :node="node" :tree="tree" />
          <!-- <c-tabs-item :stat="stat" :node="node" :doc="FILES[node.index]" /> -->
        </template>
      </Draggable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CTabsItem from "./ClubTabsItemComponent.vue";
import { Draggable, dragContext } from "@he-tree/vue";
import pageApi from "src/sdk/page";
import "@he-tree/vue/style/default.css";
import EventBus from "../sdk/files/eventBus";

const rootPage = ref();
const data_tree = ref([]);
const tree = ref(null);

//Получение корневой страницы документов
const getData = async () => {
  console.log("getting data");
  data_tree.value = await pageApi.getRootPage("4440891212883535597", 13);
};

const contex = () => {
  const { dragNode } = dragContext;
  let parent_id = dragNode.parent?.data.page_id || "4440891212883535597";
  pageApi.update({
    input: {
      parent_id: parent_id,
    },
    id: dragNode.data.page_id,
    space_id: 13,
  });
  // // Определите, куда переместить перетаскиваемую страницу
  // const move = dragContext.insertBefore ? "BEFORE" : "AFTER";
  // // Определите идентификатор страницы, относительно которой будет осуществляться перемещение
  // const pageId = dragContext.insertBefore
  //   ? dragContext.insertBefore.data.page_id
  //   : dragContext.insertAfter.data.page_id;
  // // Вызовите метод movePages с необходимыми аргументами
  // pageApi.movePages(move, pageId, [dragNode.data.page_id]);
};

onMounted(() => {
  getData();
  EventBus.on("document-added", getData);
  EventBus.on("document-update", getData);
  EventBus.on("document-deleted", getData);
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
