<template>
  <q-header class="header-main flex flex-center bg-dark-purple">
    <q-toolbar>
      <q-toolbar-title> 1Т Клуб </q-toolbar-title>

      <div class="relative-position">
        <q-avatar
          class="cursor-pointer relative-position avatar"
          @click="toggleShowIconMenu"
        >
          <q-img src="/src/assets/images/Ellipse55.svg" />
        </q-avatar>

        <transition name="slide">
          <c-right-person-menu
            v-if="showIconMenu"
            :current-user="currentUser"
          />
        </transition>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "src/stores/user";

import CRightPersonMenu from "./ClubRightPersonMenu.vue";

const userStore = useUserStore();
const currentUser = computed(() => userStore.GET_CURRENT_USER);

const showIconMenu = ref(false);

const toggleShowIconMenu = () => {
  showIconMenu.value = !showIconMenu.value;

  showIconMenu.value
    ? document.body.addEventListener("click", (event) => {
        const clicked = event.target;

        if (!clicked.closest(".avatar") && !clicked.closest(".dropdown"))
          showIconMenu.value = false;
      })
    : document.body.removeEventListener("click");
};
</script>

<style scoped lang="scss">
.slide-enter-from,
.slide-leave-to {
  transform: translateX(300px);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}

.slide-enter-active,
.slide-leave-active {
  transition: 0.4s all;
}
</style>
