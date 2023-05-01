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

import stompApi from "./sdk/stomp";

import userApi from "src/sdk/user";
import { Cookies } from "quasar";

const store = useUserStore();

// const queue = stompApi.queueCreate();

onMounted(() => {
  userApi.isAuth() ? store.SET_CURRENT_USER() : null;

  // stompApi.connectQueue(Cookies.get("queue"));
});
</script>
