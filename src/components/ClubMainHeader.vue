<template>
  <q-header class="header-main flex flex-center bg-dark-purple c-px-32">
    <q-toolbar>
      <q-img class="logo" src="/assets/images/logo-white.svg" alt="logo" />

      <q-toolbar-title class="flex no-wrap items-center cursor-pointer" @click="toRoot">
        <span class="text-h3">Клуб</span>

        <div class="flex">
          <c-header-navigation
            v-if="!route.name.includes('landing-')"
            class="navigation text-caption1"
          />

          <q-tabs
            v-else
            v-model="selectedTab"
            @update:model-value="redirect"
            class="navigation main-tabs"
          >
            <q-tab no-caps name="landing-business" label="Для Бизнеса" class="rounded-borders" />

            <q-tab no-caps name="landing-work" label="Для Работы" class="rounded-borders" />

            <q-tab
              no-caps
              name="landing-selfdevelopment"
              label="Для Развития"
              class="rounded-borders"
            />
          </q-tabs>
        </div>
      </q-toolbar-title>

      <div v-if="!currentUser">
        <c-button
          to="/registration"
          class="text-button1 q-px-lg"
          background-square
          label="Вступить в 1T клуб"
        />
        <c-button
          to="/authentication"
          outline-no-text-square
          label="Войти"
          class="text-button1 bg-dark-purple q-ml-md q-px-lg"
        />
      </div>

      <div v-else class="flex flex-center">
        <c-notification class="q-mr-lg" />

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
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { ref, inject } from "vue";
import CNotification from "src/components/ClubNotification.vue";

import CButton from "./ClubButton.vue";
import CRightPersonMenu from "./ClubRightPersonMenu.vue";
import CHeaderNavigation from "./ClubHeaderNavigation.vue";
import { useRoute, useRouter } from "vue-router";

const currentUser = inject("currentUser");

const route = useRoute();
const router = useRouter();

const showIconMenu = ref(false);
const selectedTab = ref("");

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

const toRoot = () => {
  router.push({
    path: "/",
  });
};

const redirect = (name) => {
  router.push({
    name,
  });
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
