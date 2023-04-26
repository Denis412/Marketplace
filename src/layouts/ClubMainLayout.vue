<template>
  <q-layout view="hHh LpR lff" v-if="currentUser">
    <c-main-header />
    <c-main-drawer side="left" />

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>

    <!-- <c-main-footer /> -->
  </q-layout>
</template>

<script setup>
import CMainHeader from "src/components/ClubMainHeader.vue";
import CMainDrawer from "src/components/ClubMainDrawer.vue";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/user";
import { useQuasar } from "quasar";

const router = useRouter();
const store = useUserStore();
const $q = useQuasar();

const currentUser = computed(() => store.GET_CURRENT_USER);

if (!localStorage.getItem("refreshToken") || !currentUser.value) {
  router.push({
    name: "auth",
  });

  $q.notify({
    type: "negative",
    position: "top",
    message: "Необходимо войти в аккаунт!",
  });
}
</script>

<style lang="scss"></style>
