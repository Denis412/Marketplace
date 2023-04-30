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
          <q-list v-if="showIconMenu" class="dropdown">
            <q-item
              clickable
              class="flex flex-center no-wrap rounded-borders-10 itemDropdown"
              v-for="menuItem in menuIcon"
              :class="menuItem.textColor"
              :key="menuItem.title"
              @click="menuItem.callback"
            >
              {{ menuItem.title }}
            </q-item>
          </q-list>
        </transition>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { ref } from "vue";
import userApi from "src/sdk/user";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/user";
import stompApi from "src/sdk/stomp";

const router = useRouter();
const userStore = useUserStore();

const showIconMenu = ref(false);

const menuIcon = ref([
  { title: "Учетная запись", textColor: "text-black" },
  { title: "Профиль", textColor: "text-black" },
  {
    title: "Выход",
    textColor: "text-negative",
    callback: () => {
      userApi.logout();
      stompApi.disconnect();
      userStore.LOGOUT_CURRENT_USER();

      router.push({
        name: "auth",
      });
    },
  },
]);

const toggleShowIconMenu = () => {
  showIconMenu.value = !showIconMenu.value;

  showIconMenu.value
    ? document.body.addEventListener("click", (event) => {
        const clicked = event.target;

        if (!clicked.closest(".itemDropdown") && !clicked.closest(".avatar"))
          showIconMenu.value = false;
      })
    : document.body.removeEventListener("click");
};
</script>

<style scoped lang="scss">
.dropdown {
  position: absolute;
  width: max-content;
  top: calc(100% + 8px);
  right: 0;

  background: lightgray;
  border-radius: 12px;
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
