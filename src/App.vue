<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "./stores/user";
import { useDocumentStore } from "./stores/document";

import userApi from "src/sdk/user";

const store = useUserStore();
const storeDocument = useDocumentStore();

storeDocument.SET_DOCUMENTS();

onMounted(() => {
  userApi.isAuth() ? store.SET_CURRENT_USER() : null;
});
</script>
