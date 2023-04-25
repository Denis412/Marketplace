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
      <!--
      <pre>y {{ userIdRefetch }}</pre>
      <pre>{{ authInfo }}</pre>
      <pre>{{ fullCode }}</pre> -->

      <q-card-section class="text-caption1" v-if="timer.timer.value">
        Отправить код повторно ({{ timer.timer }} секунд)
      </q-card-section>

      <q-card-section
        v-else
        class="text-violet-6 text-caption1 cursor-pointer"
        @click="sendCode"
      >
        Отправить код повторно
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { isRef, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

import CInput from "./ClubInput.vue";
import userApi from "src/sdk/user";
import replaceAt from "src/utils/replaceAt";

const $q = useQuasar();
const router = useRouter();

const { timer, authInfo, password } = defineProps({
  timer: Object,
  authInfo: Object,
  password: String,
});

const codeNumber = ref("");
const fullCode = ref(" ".repeat(6));
const userIdRefetch = ref("");

const inputCode = async (value, inputNumber) => {
  fullCode.value = replaceAt(fullCode.value, inputNumber - 1, value);

  if (fullCode.value.indexOf(" ") === -1) {
    try {
      if (!userIdRefetch.value)
        await userApi.setPassword({
          user_id: authInfo.user_id,
          password: authInfo.password,
          code: fullCode.value,
        });
      else
        await userApi.userPasswordConfirmCode({
          user_id: userIdRefetch.value,
          password: authInfo.password,
          code: parseInt(fullCode.value),
        });

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
  console.log("info", authInfo);

  try {
    const userId = await userApi.userPasswordSendCode({
      email: authInfo.email,
    });

    userIdRefetch.value = userId.record.user_id;

    timer.clear();
    timer.start();

    $q.notify({
      type: "positive",
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
