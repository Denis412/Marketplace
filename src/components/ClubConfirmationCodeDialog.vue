<template>
  <q-dialog>
    <q-card class="dialog-size text-center">
      <q-card-section>
        <section class="flex justify-end">
          <q-btn icon="close" flat round dense v-close-popup />
        </section>
      </q-card-section>

      <q-card-section class="flex flex-center">
        <h3 class="text-h3">Код подтверждения</h3>

        <section class="dialog-size-content">
          <q-img src="/src/assets/images/mails.svg" class="q-mt-lg" />

          <div class="text-body2 club-mt-32">
            Введите код подтверждения, отправленный на ваш email.
          </div>
        </section>

        <section class="flex no-wrap q-gutter-x-sm club-mt-32">
          <c-input type="text" class="dialog-size-input q-pa-none" />
          <c-input type="text" class="dialog-size-input q-pa-none" />
          <c-input type="text" class="dialog-size-input q-pa-none" />
          <c-input type="text" class="dialog-size-input q-pa-none" />
          <c-input type="text" class="dialog-size-input q-pa-none" />
          <c-input type="text" class="dialog-size-input q-pa-none" />
        </section>
      </q-card-section>

      <div class="text-caption1 q-mt-md" v-if="timer">
        Отправить код повторно ({{ timer }} секунд)
      </div>

      <div v-else class="text-violet-6 text-caption1 cursor-pointer">
        Отправить код повторно
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import CInput from "./ClubInput.vue";

const { timer } = defineProps({
  timer: Number,
});
</script>

<style scoped lang="scss">
.dialog-size {
  width: 500px;
  height: 500px;

  &-input {
    max-width: 40px;
  }

  &-content {
    max-width: 300px;
  }
}
</style>
