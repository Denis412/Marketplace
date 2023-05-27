<template>
  <div class="row no-wrap q-pl-lg drawer-item">
    <div class="item_doc" @contextmenu.prevent="showMenu = true">
      <span v-if="stat.children.length" @click="stat.open = !stat.open">
        <q-item-section v-if="stat.open">
          <q-icon name="keyboard_arrow_right" />
        </q-item-section>
        <q-item-section v-else>
          <q-icon name="keyboard_arrow_up" />
        </q-item-section>
      </span>

      <span v-else>
        <img :src="`/icons/dote.svg`" alt="" class="dote" />
      </span>

      <img :src="`/icons/file-grey.svg`" alt="" class="q-pr-md" />

      <router-link
        class="name_doc link"
        @click="set_breadcumps"
        :to="{ name: 'Document', params: { id: `${props.node.object_id}` } }"
      >
        {{ node.title_page.replace(".html", "") }}
      </router-link>

      <div class="items-wrapper">
        <c-add-document :node="props.node" class="addDoc" />

        <q-btn-dropdown
          no-icon-animation
          dropdown-icon="more_vert"
          size="sm"
          no-caps
          unelevated
          no-wrap
          padding="none"
          class="btn-dropdown-doc"
          v-model="showMenu"
        >
          <c-menu-document
            :prop_doc="doc"
            :prop_data="props.node"
            :tree="props.tree"
            :prop_stat="props.stat"
          />
          <!-- <c-menu-document :prop_clicked_index_doc="index" :prop_doc="doc" /> -->
        </q-btn-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import CMenuDocument from "src/components/ClubMenuDocument.vue";
import { ref } from "vue";
import { filesApi } from "src/sdk/files/file";
import CAddDocument from "src/components/ClubAddDocument.vue";
import { useFileStore } from "src/stores/file";

const storeFile = useFileStore();

const showMenu = ref(false);
const doc = ref();

// console.log("node", props.node.object_id);

const props = defineProps({
  tree: Object,
  node: Object,
  // index: Number,
  stat: Object,
});

const getFile = async () => {
  doc.value = (
    await filesApi.refetchQueryFileById({
      id: props.node.object_id,
      space_id: 13,
    })
  ).get_file;
};

const set_breadcumps = () => {
  let path = "Главная/";
  if (props.stat.parent) {
    console.log(props.stat.parent);
    console.log(1);
    if (props.stat.parent.parent?.parent) {
      path += props.stat.parent.parent.parent.data.title_page + "/";
    }
    if (props.stat.parent.parent) {
      path += props.stat.parent.parent.data.title_page + "/";
    }
    path += props.stat.parent.data.title_page + "/";
    path += props.stat.data.title_page;
  } else {
    path += props.stat.data.title_page;
  }
  storeFile.SET_BREADCRUMPS_FOR_DOC(path);
};
getFile();
</script>

<style scoped lang="scss">
.menu-wrapper {
  width: 30px;
}

.name_doc {
  white-space: nowrap;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item_doc {
  width: 210px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.link {
  text-decoration: none;
}

.dote {
  padding-left: 5px;
}

.addDoc {
  visibility: hidden;
}

.addDoc:hover {
  background: #eaeaea;
}

.item_doc:hover .addDoc {
  opacity: 0;
  animation: ani 0.3s forwards;
  visibility: visible;
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

.items-wrapper {
  align-items: center;
  display: flex;
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
