<template>
  <template v-if="isQueue">
    <router-view v-slot="{ Component }">
      <keep-alive exclude="Document">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </template>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import { useUserStore } from "./stores/user";
import { useFileStore } from "src/stores/file";
import userApi from "src/sdk/user";
import { Cookies } from "quasar";
import stompApi from "src/sdk/stomp";

const store = useUserStore();

const storeFile = useFileStore();

const isQueue = computed(() => Cookies.get("queue"));

onMounted(async () => {
  storeFile.SET_FILES();
  userApi.isAuth() ? await store.FETCH_CURRENT_USER() : null;

  await stompApi.queueCreate();
});

onUnmounted(() => {
  Cookies.remove("queue");
});
</script>
