<template>
  <q-tab>
    <div class="item_doc" @contextmenu.prevent="showMenu = true">
      <img
        :src="`/src/assets/icons/file/file-grey.svg`"
        alt=""
        class="q-pr-md"
      />
      <router-link
        class="item_doc link"
        :to="{ name: 'Document', params: { id: `${index}` } }"
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
          v-model="showMenu"
        >
          <c-qmenu-document :prop_clicked_index_doc="index" :prop_doc="doc" />
        </q-btn-dropdown>
      </div>
    </div>
  </q-tab>
</template>

<script setup>
import CQmenuDocument from "./ClubQmenuDocument.vue";
import { ref } from "vue";

const showMenu = ref(false);

defineProps({
  doc: Object,
  index: Number,
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
