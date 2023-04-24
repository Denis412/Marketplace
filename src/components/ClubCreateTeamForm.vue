<template>
  <q-form class="create-form c-pa-32 bg-white rounded-borders-15">
    <header>
      <h3 class="text-h3 text-center">Создание команды</h3>
    </header>

    <main class="flex column flex-center club-mt-32">
      <section class="relative-position">
        <q-avatar class="large-avatar">
          <q-img src="/src/assets/previews/preview-create-team.png" />
        </q-avatar>

        <q-img
          src="/src/assets/previews/craete-photo.png"
          class="absolute create-form-avatar-create cursor-pointer"
        />
      </section>

      <section class="w-100p q-mt-md q-gutter-y-md">
        <c-input placeholder="Название" class="text-body2" />

        <c-input
          placeholder="Описание"
          class="club-textarea-mh-150 text-body2"
          autogrow
          style="max-height: 100px"
        />
      </section>
    </main>

    <footer class="flex justify-center q-mt-xl">
      <c-button background size="lg" label="Создать" />
      <c-button outline class="club-ml-32" size="lg" label="Отмена" />
    </footer>
  </q-form>
</template>

<script setup>
import CInput from "./ClubInput.vue";
import CButton from "./ClubButton.vue";
</script>

<style scoped lang="scss">
.create-form {
  max-width: 544px;
  width: 544px;
  min-height: 544px;

  &-avatar {
    &-create {
      bottom: 15px;
      right: -13px;
      width: 30px;
      height: 30px;
    }
  }
}
</style>
