<template>
  <section>
    <header>
      <h3 class="text-h3">Моя учетная запись</h3>
    </header>

    <main class="c-mt-64">
      <section
        class="flex justify-between no-wrap c-pb-64 border-section-bottom"
      >
        <div class="w-100p">
          <div class="row">
            <div class="flex items-center col">
              <q-avatar class="avatar">
                <q-img
                  :src="
                    currentUser?.avatar ||
                    '/assets/images/preloaders/default-avatar.svg'
                  "
                />
              </q-avatar>

              <div class="flex column flex-center c-ml-32">
                <c-button
                  background
                  label="Загрузить фото"
                  @click="uploadAvatar"
                />

                <q-file
                  v-show="false"
                  id="filePick"
                  standout="bg-teal text-white"
                  v-model="selectAvatar"
                  label="Custom standout"
                />

                <c-button
                  outline
                  label="Удалить фото"
                  class="c-mt-32"
                  @click="toggleIsDeletePhoto"
                />
              </div>

              <p class="q-mt-md text-caption2">
                Рекомендуем Вам использовать фотографию размером 256*256 px
              </p>
            </div>

            <div class="w-100p col c-ml-72">
              <q-img src="/assets/images/account-settings-page/level-up.svg" />
            </div>
          </div>

          <c-account-settings-form @submit-form="null" />
        </div>
      </section>

      <section class="row c-mt-72">
        <div class="col-6">
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
          src="/assets/images/account-settings-page/reset-password.svg"
          class="col password-image"
        />
      </section>

      <c-confirm-dialog
        v-model="isDeletePhoto"
        title="Вы действительно хотите удалить фото?"
        cancel-label="Отмена"
        confirm-label="Да"
        @confirm="deletePhoto"
        @cancel="toggleIsDeletePhoto"
      />
    </main>

    <footer></footer>

    <c-edit-password-dialog
      v-model="isChanging"
      :auth-info="authInfo"
      recovery
    />
  </section>
</template>

<script setup>
import { ref, watch, inject } from "vue";

import CButton from "src/components/ClubButton.vue";
import CAccountSettingsForm from "./ClubAccountSettingsForm.vue";
import CEditPasswordDialog from "./ClubEditPasswordDialog.vue";
import CConfirmDialog from "./ClubConfirmDialog.vue";

import userApi from "src/sdk/user";
import filesApi from "src/sdk/file";

const currentUser = inject("currentUser");

const isDeletePhoto = ref(false);
const isChanging = ref(false);
const authInfo = ref({});
const selectAvatar = ref(null);

const uploadAvatar = async () => {
  document.querySelector("input[type='file']").click();
};
const toggleIsDeletePhoto = () => {
  isDeletePhoto.value = !isDeletePhoto.value;
};
const deletePhoto = () => {};

const changePassword = () => {
  authInfo.value.email = currentUser.value?.email;

  isChanging.value = true;
};

watch(selectAvatar, async (value) => {
  if (!value) return;

  const avatarId = await userApi.uploadAvatar(value);

  const files = await filesApi.get(
    avatarId
      .toString()
      .slice(0, avatarId.toString().length - 3)
      .toString()
  );

  console.log(
    avatarId,
    files,
    `${process.env.FILE_STORAGE_URI}/${files[0].path}/${avatarId}/${files[0].extension}?n=${files[0].name}`
  );

  userStore.SET_AVATAR(
    `${process.env.FILE_STORAGE_URI}/${files[0].path}/${avatarId}/${files[0].extension}?n=${files[0].name}`
  );
});
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
