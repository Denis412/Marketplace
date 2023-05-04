<template>
  <q-tabs
    class="row no-wrap q-pl-lg drawer-item"
    indicator-color="transparent"
    v-for="(doc, index) in FILES"
    :key="doc.id"
    align="left"
  >
    <q-route-tab>
      <div class="item_doc">
        <img
          :src="`/src/assets/icons/file/file-grey.svg`"
          alt=""
          class="q-pr-md"
        />
        <router-link
          class="item_doc link"
          :to="{
            name: 'Document',
            params: { id: `${index}` },
          }"
        >
          {{
            doc.name.replace(".html", "").length > 10
              ? doc.name.replace(".html", "").slice(0, 10) + "..."
              : doc.name.replace(".html", "")
          }}
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
          >
            <c-qmenu-document :prop_clicked_index_doc="index" :prop_doc="doc" />
          </q-btn-dropdown>
        </div>
      </div>
    </q-route-tab>
  </q-tabs>
</template>

<script setup>
import { computed, watch, ref } from "vue";
import { useFileStore } from "src/stores/file";
import CQmenuDocument from "./ClubQmenuDocument.vue";

const storeFile = useFileStore();
const FILES = computed(() => storeFile.GET_FILES);

let showDialog = ref(false);

watch(FILES, () => {
  console.log(FILES.value);
});
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
