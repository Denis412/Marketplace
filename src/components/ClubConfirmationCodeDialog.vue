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

        <section class="flex no-wrap q-gutter-x-sm c-mt-32">
          <c-input
            type="text"
            countInput="1"
            v-model.numberCode="codeNumber"
            class="dialog-size-input c-input-number"
            maxlength="1"
            @update:modelValue="inputCode"
          />

          <c-input
            type="text"
            countInput="2"
            v-model.numberCode="codeNumber"
            class="dialog-size-input c-input-number"
            maxlength="1"
            @update:modelValue="inputCode"
          />

          <c-input
            type="text"
            countInput="3"
            v-model.numberCode="codeNumber"
            class="dialog-size-input c-input-number"
            maxlength="1"
            @update:modelValue="inputCode"
          />

          <c-input
            type="text"
            countInput="4"
            v-model.numberCode="codeNumber"
            class="dialog-size-input c-input-number"
            maxlength="1"
            @update:modelValue="inputCode"
          />

          <c-input
            type="text"
            countInput="5"
            v-model.numberCode="codeNumber"
            class="dialog-size-input c-input-number"
            maxlength="1"
            @update:modelValue="inputCode"
          />

          <c-input
            type="text"
            countInput="6"
            v-model.numberCode="codeNumber"
            class="dialog-size-input c-input-number"
            maxlength="1"
            @update:modelValue="inputCode"
          />
        </section>
      </q-card-section>

      <q-card-section class="text-caption1" v-if="timer.timer.value">
        Отправить код повторно ({{ timer.timer }} секунд)
      </q-card-section>

      <q-card-section
        v-else
        class="text-violet-6 text-caption1 cursor-pointer"
        style="text-decoration: underline"
        @click="sendCode"
      >
        Отправить код повторно
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

import CInput from "./ClubInput.vue";
import userApi from "src/sdk/user";
import replaceAt from "src/utils/replaceAt";

const $q = useQuasar();
const router = useRouter();

const { timer, authInfo, reset } = defineProps({
  timer: Object,
  authInfo: Object,
  reset: Boolean,
});

const codeNumber = ref("");
const fullCode = ref(" ".repeat(6));

const inputCode = async (value, inputNumber) => {
  fullCode.value = replaceAt(fullCode.value, inputNumber - 1, value);
  console.log(authInfo);

  if (fullCode.value.indexOf(" ") === -1) {
    console.log(authInfo);

    try {
      if (!reset)
        await userApi.setPassword({
          user_id: authInfo.user_id,
          password: authInfo.password,
          code: fullCode.value,
        });
      else
        await userApi.userPasswordConfirmCode({
          user_id: authInfo.user_id,
          password: authInfo.password,
          code: parseInt(fullCode.value),
        });

      console.log("hello");

      router.push({
        name: "auth",
      });
    } catch (error) {
      console.log(error);

      $q.notify({
        type: "negative",
        message: "Вы неверно ввели код!",
      });
    }
  }
};

const sendCode = async () => {
  try {
    await userApi.userPasswordSendCode({
      email: authInfo.email,
    });

    timer.clear();
    timer.start();

    $q.notify({
      type: "positive",
      position: "top",
      message: "Код выслан повторно!",
    });
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
