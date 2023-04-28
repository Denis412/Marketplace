<template>
  <section>
    <header>
      <h3 class="text-h3">Моя учетная запись</h3>
    </header>

    <main>
      <section
        class="flex justify-between no-wrap section-margin c-pb-64 border-section-bottom"
      >
        <div class="col">
          <div class="flex justify-center">
            <q-avatar class="avatar">
              <q-img src="/src/assets/images/Ellipse55.svg" />
            </q-avatar>

            <div class="flex column justify-center c-ml-32">
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
          </div>

          <p class="q-mt-md text-caption2">
            Рекомендуем Вам использовать фотографию размером 256*256 px
          </p>

          <c-account-settings-form @submit-form="null" />
        </div>

        <div class="w-100p col c-ml-72">
          <q-img src="/src/assets/images/account-settings/level-up.svg" />
        </div>
      </section>

      <section>
        <h3 class="text-h3 c-mt-72">Пароль и аутентификация</h3>
        <c-button background label="Изменить пароль" class="q-mt-xl" />
      </section>
    </main>

    <footer></footer>
  </section>
</template>

<script setup>
import CButton from "src/components/ClubButton.vue";
import CAccountSettingsForm from "./ClubAccountSettingsForm.vue";

const uploadPhoto = () => {};
const deletePhoto = () => {};
</script>

<style scoped lang="scss">
.avatar {
  width: 160px;
  height: 160px;
}

.image-wrapper {
  max-width: 505px;
}
</style>
