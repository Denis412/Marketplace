<template>
  <div class="row no-wrap q-pl-lg drawer-item">
    <div class="item_doc" @contextmenu.prevent="showMenu = true">
      <span v-if="stat.children.length" @click="stat.open = !stat.open">
        {{ stat.open ? "-" : "+" }}
      </span>

      <img :src="`/icons/file-grey.svg`" alt="" class="q-pr-md" />

      <router-link
        class="name_doc link"
        :to="{ name: 'Document', params: { id: `${props.node.index}` } }"
      >
        {{ node.title_page.replace(".html", "") }}
      </router-link>

      <div class="menu-wrapper" clickable>
        <q-btn-dropdown
          no-icon-animation
          dropdown-icon="more_vert"
          size="sm"
          no-caps
          unelevated
          no-wrap
          label=""
          class="btn-dropdown-doc"
          v-model="showMenu"
        >
          <c-menu-document :prop_doc="doc" />
          <!-- <c-menu-document :prop_clicked_index_doc="index" :prop_doc="doc" /> -->
        </q-btn-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import CMenuDocument from "./ClubMenuDocument.vue";
import { ref } from "vue";
import { filesApi } from "src/sdk/files/file";

const showMenu = ref(false);
const doc = ref();

// console.log("node", props.node.object_id);

const props = defineProps({
  node: Object,
  // index: Number,
  stat: Object,
});

const getFile = async () => {
  console.log("id", props.node.object_id);
  doc.value = (
    await filesApi.refetchQueryFileById({
      id: props.node.object_id,
      space_id: 13,
    })
  ).get_file;
  console.log(2343, doc.value);
};

getFile();
</script>

<style scoped lang="scss">
.menu-wrapper {
  width: 40px;
}
.name_doc {
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
.item_doc {
  width: 190px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.link {
  text-decoration: none;
}

.link:visited {
  color: inherit;
}

.btn-dropdown-doc {
  visibility: hidden;
}

.item_doc:hover .btn-dropdown-doc {
  opacity: 0;
  animation: ani 0.3s forwards;
  visibility: visible;
}

@keyframes ani {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
