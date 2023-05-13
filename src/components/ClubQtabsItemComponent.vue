<template>
  <div class="row no-wrap q-pl-lg drawer-item">
    <div class="item_doc" @contextmenu.prevent="showMenu = true">
      <img
        :src="`/src/assets/icons/file/file-grey.svg`"
        alt=""
        class="q-pr-md"
      />

      <router-link
        class="name_doc link"
        :to="{ name: 'Document', params: { id: `${props.node.index}` } }"
      >
        {{ node.text.replace(".html", "") }}
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
          <c-qmenu-document
            :prop_clicked_index_doc="props.node.index"
            :prop_doc="doc"
          ></c-qmenu-document>
        </q-btn-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import CQmenuDocument from "./ClubQmenuDocument.vue";
import { ref } from "vue";

const showMenu = ref(false);

const props = defineProps({
  doc: Object,
  node: Object,
  index: Number,
});
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
