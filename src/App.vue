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
import { useUserStore } from "src/stores/user";
import userApi from "src/sdk/user";
import { Cookies } from "quasar";
import stompApi from "src/sdk/stomp";

const store = userApi.isAuth() ? useUserStore() : null;

const isQueue = computed(() => Cookies.get("queue"));

onMounted(async () => {
  userApi.isAuth() ? await store.FETCH_CURRENT_USER() : null;

  if (userApi.isAuth()) await stompApi.queueCreate();
});

onUnmounted(() => {
  Cookies.remove("queue");
});
</script>
