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
          <c-input
            type="text"
            countInput="1"
            v-model.numberCode="codeNumber"
            class="dialog-size-input q-pa-none"
            maxlength="1"
            @update:modelValue="inputCode"
          />

          <c-input
            type="text"
            countInput="2"
            v-model.numberCode="codeNumber"
            class="dialog-size-input q-pa-none"
            maxlength="1"
            @update:modelValue="inputCode"
          />

          <c-input
            type="text"
            countInput="3"
            v-model.numberCode="codeNumber"
            class="dialog-size-input q-pa-none"
            maxlength="1"
            @update:modelValue="inputCode"
          />

          <c-input
            type="text"
            countInput="4"
            v-model.numberCode="codeNumber"
            class="dialog-size-input q-pa-none"
            maxlength="1"
            @update:modelValue="inputCode"
          />

          <c-input
            type="text"
            countInput="5"
            v-model.numberCode="codeNumber"
            class="dialog-size-input q-pa-none"
            maxlength="1"
            @update:modelValue="inputCode"
          />

          <c-input
            type="text"
            countInput="6"
            v-model.numberCode="codeNumber"
            class="dialog-size-input q-pa-none"
            maxlength="1"
            @update:modelValue="inputCode"
          />
        </section>
      </q-card-section>

      <q-card-section class="text-caption1" v-if="timer">
        Отправить код повторно ({{ timer.timer }} секунд)
      </q-card-section>

      <q-card-section
        v-else
        class="text-violet-6 text-caption1 cursor-pointer"
        @clik="sendCode"
      >
        Отправить код повторно
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";

import CInput from "./ClubInput.vue";
import userApi from "src/sdk/user";
import replaceAt from "src/utils/replaceAt";
import { useRouter } from "vue-router";

const $q = useQuasar();
const router = useRouter();

const { timer, authInfo } = defineProps({
  timer: Object,
  authInfo: Object,
});

const codeNumber = ref("");
const fullCode = ref(" ".repeat(6));

const inputCode = async (value, inputNumber) => {
  fullCode.value = replaceAt(fullCode.value, inputNumber - 1, value);

  if (fullCode.value.indexOf(" ") === -1) {
    try {
      await userApi.setPassword({ ...authInfo, code: fullCode.value });

      router.push({
        name: "auth",
      });
    } catch (error) {
      $q.notify({
        type: "negative",
        message: "Вы неверно ввели код!",
      });
    }
  }
};

const sendCode = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};
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
