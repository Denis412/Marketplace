<template>
  <router-view v-slot="{ Component }">
    <keep-alive exclude="Document">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "./stores/user";
import { useFileStore } from "src/stores/file";
import userApi from "src/sdk/user";

const store = useUserStore();
const storeFile = useFileStore();

onMounted(() => {
  storeFile.SET_FILES();
  userApi.isAuth() ? store.SET_CURRENT_USER() : null;
});
</script>
