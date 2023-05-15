<template>
  <q-tabs
    class="row no-wrap q-pl-lg drawer-item"
    indicator-color="transparent"
    v-for="(doc, index) in FILES"
    :key="doc.id"
    align="left"
  >
    <tabs-item :doc="doc" :index="index" />
  </q-tabs>
</template>

<script setup>
import { computed } from "vue";
import { useFileStore } from "src/stores/file";

import TabsItem from "./ClubTabsItemComponent.vue";

const storeFile = useFileStore();
const FILES = computed(() => storeFile.GET_FILES);
</script>

<style scoped lang="scss">
.menu-wrapper {
  width: 40px;
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
