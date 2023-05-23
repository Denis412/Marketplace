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
import stompApi from "src/sdk/stomp";
import { Cookies } from "quasar";

const store = useUserStore();

const storeFile = useFileStore();

stompApi.queueCreate();

onMounted(async () => {
  storeFile.SET_FILES();
  userApi.isAuth() ? await store.FETCH_CURRENT_USER() : null;

  stompApi.connectQueue(Cookies.get("queue"));
});
</script>
