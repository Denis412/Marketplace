<template>
  <section>
    <header>
      <h3 class="text-h3">Моя учетная запись</h3>
    </header>

    <main>
      <section
        class="flex justify-between no-wrap c-mt-64 c-pb-64 border-section-bottom"
      >
        <div class="w-100p">
          <div class="row">
            <div class="flex items-center col">
              <q-avatar class="avatar">
                <q-img src="/src/assets/images/Ellipse55.svg" />
              </q-avatar>

              <div class="flex column flex-center c-ml-32">
                <c-button
                  background
                  label="Загрузить фото"
                  @click="uploadPhoto"
                />

                <c-button
                  outline
                  label="Удалить фото"
                  class="c-mt-32"
                  @click="deletePhoto"
                />
              </div>

              <p class="q-mt-md text-caption2">
                Рекомендуем Вам использовать фотографию размером 256*256 px
              </p>
            </div>

            <div class="w-100p col c-ml-72">
              <q-img src="/src/assets/images/account-settings/level-up.svg" />
            </div>
          </div>

          <c-account-settings-form @submit-form="null" />
        </div>
      </section>

      <section class="row c-mt-72">
        <div class="col">
          <h3 class="text-h3">Изменение пароля</h3>

          <p class="text-body2 password-subtitle c-mt-32">
            Если Вы не уверены в безопасности пароля или заметили подозрительную
            активность, можете изменить его
          </p>

          <c-button
            background
            label="Изменить пароль"
            class="c-mt-32"
            @click="changePassword"
          />
        </div>

        <q-img
          src="/src/assets/images/account-settings/reset-password.svg"
          class="col password-image"
        />
      </section>
    </main>

    <footer></footer>

    <c-edit-password-dialog v-model="isChanging" :auth-info="authInfo" />
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "src/stores/user";

import CButton from "src/components/ClubButton.vue";
import CAccountSettingsForm from "./ClubAccountSettingsForm.vue";
import CEditPasswordDialog from "./ClubEditPasswordDialog.vue";

const userStore = useUserStore();

const currentUser = computed(() => userStore.GET_CURRENT_USER);

const isChanging = ref(false);
const authInfo = ref({});

const uploadPhoto = () => {};
const deletePhoto = () => {};

const changePassword = () => {
  authInfo.value.email = currentUser.value.email;

  isChanging.value = true;
};
</script>

<style scoped lang="scss">
.avatar {
  width: 160px;
  height: 160px;
}

.password-subtitle {
  max-width: 448px;
  color: #6d6d6d;
}

.password-image {
  max-width: 421px;
}

.image-wrapper {
  max-width: 505px;
}
</style>
