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

import userApi from "src/sdk/user";

const store = useUserStore();

onMounted(async () => {
  userApi.isAuth() ? await store.FETCH_CURRENT_USER() : null;
});
</script>
