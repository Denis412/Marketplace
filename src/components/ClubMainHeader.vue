<template>
  <q-header
    class="header-main flex flex-center bg-dark-purple c-px-32"
    :class="{ 'bg-blue6': isModerator }"
  >
    <q-toolbar>
      <q-img
        class="logo cursor-pointer"
        src="/assets/images/logo-white.svg"
        @click="toRoot"
        alt="logo"
      />

      <q-toolbar-title class="flex no-wrap items-center cursor-pointer">
        <span class="text-h3" @click="toRoot">Клуб</span>

        <div class="flex">
          <c-header-navigation
            v-if="!route.name?.includes('landing-')"
            class="navigation text-caption1"
          />

          <q-tabs v-else class="navigation main-tabs">
            <q-route-tab
              no-caps
              name="business"
              label="Для Бизнеса"
              class="rounded-borders"
              to="business"
            />

            <q-route-tab no-caps name="work" label="Для Работы" class="rounded-borders" to="work" />

            <q-route-tab
              no-caps
              name="development"
              label="Для Развития"
              class="rounded-borders"
              to="selfdevelopment"
            />
          </q-tabs>
        </div>
      </q-toolbar-title>

      <div v-if="!currentUser">
        <q-btn
          flat
          no-caps
          to="/auth/reg"
          class="club-button-background text-body2 q-px-lg"
          background-square
          label="Вступить в 1T клуб"
        />

        <q-btn
          flat
          no-caps
          to="/auth"
          label="Войти"
          class="club-button-outline-text-colored text-body2 bg-dark-purple q-ml-md q-px-lg"
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

const isModerator = inject("isModerator");
const currentUser = inject("currentUser");

const route = useRoute();
const router = useRouter();
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

const toRoot = () => {
  router.push({
    path: "/",
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
