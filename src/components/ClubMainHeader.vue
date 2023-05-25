<template>
  <q-header class="header-main flex flex-center bg-dark-purple c-px-32">
    <q-toolbar>
      <q-img class="logo" src="/assets/images/logo-white.svg" alt="logo" />
      <q-toolbar-title class="flex items-center">
        <span class="text-h3">Клуб</span>

        <c-header-navigation class="navigation text-caption1" />
      </q-toolbar-title>

      <div class="relative-position">
        <q-avatar
          class="cursor-pointer relative-position header-avatar"
          @click="toggleShowIconMenu"
        >
          <q-img :src="currentUser?.avatar || '/assets/images/preloaders/default-avatar.svg'" />
        </q-avatar>

        <transition name="slide">
          <c-right-person-menu v-if="showIconMenu" :current-user="currentUser" />
        </transition>
      </div>
      <c-notification />
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { ref, inject } from "vue";
import CNotification from "src/components/ClubNotification.vue";

import CRightPersonMenu from "./ClubRightPersonMenu.vue";
import CHeaderNavigation from "./ClubHeaderNavigation.vue";

const currentUser = inject("currentUser");

const showIconMenu = ref(false);

const toggleShowIconMenu = () => {
  showIconMenu.value = !showIconMenu.value;

  showIconMenu.value
    ? document.body.addEventListener("click", (event) => {
        const clicked = event.target;

        if (!clicked.closest(".header-avatar") && !clicked.closest(".dropdown"))
          showIconMenu.value = false;
      })
    : document.body.removeEventListener("click");
};
</script>

<style scoped lang="scss">
.logo {
  max-width: 40px;
}

.header-avatar {
  width: 64px;
  height: 64px;
}

.navigation {
  margin-left: 132px;
}

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
