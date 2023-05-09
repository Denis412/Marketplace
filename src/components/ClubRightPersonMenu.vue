<template>
  <q-card class="dropdown">
    <q-card-section class="dropdown-top-section flex column items-center">
      <q-avatar class="dropdown-avatar">
        <q-img src="/src/assets/images/default-avatar.svg" />
      </q-avatar>

      <div class="text-body2 text-violet-6 q-mt-md">
        {{ currentUser.first_name }} {{ currentUser.last_name }}
      </div>

      <div class="text-caption1 text-violet-6 q-mt-sm c-mb-20">
        {{ currentUser.email }}
      </div>
    </q-card-section>

    <q-card-section class="c-mt-20">
      <q-card flat class="text-body2 cursor-pointer" @click="toAccountSettings">
        <q-icon name="img:/src/assets/icons/pen/pen-grey.svg" class="q-mr-sm" />
        Учетная запись
      </q-card>

      <q-card flat class="text-body2 cursor-pointer q-mt-md">
        <q-icon
          name="img:/src/assets/icons/person/person-grey.svg"
          class="q-mr-sm"
        />
        Профиль
      </q-card>

      <q-card
        flat
        class="text-body2 cursor-pointer q-mt-md"
        @click="toggleIsExit"
      >
        <q-icon
          name="img:/src/assets/icons/exit/exit-grey.svg"
          class="q-mr-sm"
        />
        Выход
      </q-card>

      <q-img
        class="dropdown-image"
        src="/src/assets/images/account-settings/settings.svg"
      />
    </q-card-section>

    <c-confirm-dialog
      v-model="isExit"
      title="Вы действительно хотите выйти из системы?"
      cancel-label="Отмена"
      confirm-label="Да"
      @confirm="logout"
      @cancel="toggleIsExit"
    />
  </q-card>
</template>

<script setup>
import { inject, ref } from "vue";
import { useUserStore } from "src/stores/user";
import { useRouter } from "vue-router";

import CConfirmDialog from "./ClubConfirmDialog.vue";

import userApi from "src/sdk/user";
import stompApi from "src/sdk/stomp";

const router = useRouter();
const userStore = useUserStore();

const currentUser = inject("currentUser");

const isExit = ref(false);

const toAccountSettings = () => {
  router.push({
    name: "account",
  });
};

const logout = () => {
  isExit.value = false;

  userApi.logout();
  stompApi.disconnect();
  userStore.LOGOUT_CURRENT_USER();

  router.push({
    name: "landing-main",
  });
};

const toggleIsExit = () => {
  isExit.value = !isExit.value;
};
</script>

<style scoped lang="scss">
.dropdown {
  position: absolute;
  padding: 32px 20px;
  border: 3px solid $violet-6;
  border-radius: 32px;
  width: max-content;
  top: calc(100% + 8px);
  right: 0;

  background: white;

  &-image {
    position: absolute;
    right: 0;
    bottom: 0;
    max-width: 46px;
    max-height: 65px;
  }

  & .q-card__section {
    padding: 0 !important;

    .q-card {
      display: flex;
      min-height: auto;
      align-items: center;
      border-radius: 10px;
      color: $grey-6;
      padding: 0 !important;

      &:hover {
        color: $violet-6;
      }
    }
  }

  &-top-section {
    border-bottom: 1px solid #581c8733;
  }

  &-avatar {
    width: 64px;
    height: 64px;
  }
}
</style>
