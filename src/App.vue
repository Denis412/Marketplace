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

const store = useUserStore();

onMounted(() => {
  const userData = localStorage.getItem("user-data");

  if (!store.GET_CURRENT_USER && userData)
    store.SET_CURRENT_USER(JSON.parse(userData));
});
</script>
