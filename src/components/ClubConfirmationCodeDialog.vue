<template>
  <c-closing-dialog title="Код подтверждения" title-position="center">
    <template #main-content>
      <main class="flex column items-center">
        <section class="dialog-content">
          <q-img src="/assets/images/mails.svg" class="q-mt-lg" />

          <p class="text-body2 c-mt-32 text-center">
            Введите код подтверждения, отправленный на ваш email.
          </p>
        </section>

        <section class="flex flex-center no-wrap q-gutter-x-sm c-mt-32">
          <q-input
            type="text"
            flat
            outlined
            ref="firstInput"
            @keydown.enter.prevent="$refs.secondInput.focus()"
            v-model="form.firstNumber"
            class="dialog-input c-input-outline c-input-number"
            maxlength="1"
            @update:modelValue="inputCode($event, 1)"
          />

          <q-input
            type="text"
            flat
            outlined
            ref="secondInput"
            @keydown.enter.prevent="$refs.thirdInput.focus()"
            v-model="form.secondNumber"
            class="dialog-input c-input-outline c-input-number"
            maxlength="1"
            @update:modelValue="inputCode($event, 2)"
          />

          <q-input
            type="text"
            flat
            outlined
            ref="thirdInput"
            @keydown.enter.prevent="$refs.fourthInput.focus()"
            v-model="form.thirdNumber"
            class="dialog-input c-input-outline c-input-number"
            maxlength="1"
            @update:modelValue="inputCode($event, 3)"
          />

          <q-input
            type="text"
            flat
            outlined
            ref="fourthInput"
            @keydown.enter.prevent="$refs.fifthInput.focus()"
            v-model="form.fourthNumber"
            class="dialog-input c-input-outline c-input-number"
            maxlength="1"
            @update:modelValue="inputCode($event, 4)"
          />

          <q-input
            type="text"
            flat
            outlined
            ref="fifthInput"
            @keydown.enter.prevent="$refs.sixthInput.focus()"
            v-model="form.fifthNumber"
            class="dialog-input c-input-outline c-input-number"
            maxlength="1"
            @update:modelValue="inputCode($event, 5)"
          />

          <q-input
            type="text"
            flat
            outlined
            ref="sixthInput"
            @keydown.enter.prevent="$refs.firstInput.focus()"
            v-model="form.sixthNumber"
            class="dialog-input c-input-outline c-input-number"
            maxlength="1"
            @update:modelValue="inputCode($event, 6)"
          />
        </section>

        <section
          v-if="timer.timer.value"
          class="text-caption1 q-mt-md text-center"
        >
          Отправить код повторно ({{ timer.timer }} секунд)
        </section>

        <section
          v-else
          class="text-violet-6 text-caption1 cursor-pointer q-mt-md text-center"
          style="text-decoration: underline"
          @click="sendCode"
        >
          Отправить код повторно
        </section>
      </main>
    </template>
  </c-closing-dialog>
</template>

<script setup>
import { ref, toRefs } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

import CClosingDialog from "./ClubClosingDialog.vue";
import userApi from "src/sdk/user";
import replaceAt from "src/utils/replaceAt";

const $q = useQuasar();
const router = useRouter();

const { timer, authInfo, reset } = defineProps({
  timer: Object,
  authInfo: Object,
  reset: Boolean,
});

const fullCode = ref(" ".repeat(6));
const resetCode = ref(reset);

const form = ref({
  firstNumber: "",
  secondNumber: "",
  thirdNumber: "",
  fourthNumber: "",
  fifthNumber: "",
  sixthNumber: "",
});

const firstInput = ref(null);
const secondInput = ref(null);
const thirdInput = ref(null);
const fourthInput = ref(null);
const fifthInput = ref(null);
const sixthInput = ref(null);

const inputCode = async (value, inputNumber) => {
  fullCode.value = replaceAt(fullCode.value, inputNumber - 1, value);
  console.log(authInfo);

  if (inputNumber === 1) secondInput.value.focus();
  else if (inputNumber === 2) thirdInput.value.focus();
  else if (inputNumber === 3) fourthInput.value.focus();
  else if (inputNumber === 4) fifthInput.value.focus();
  else if (inputNumber === 5) sixthInput.value.focus();
  else if (inputNumber === 6) firstInput.value.focus();

  // console.log("full", fullCode.value);

  if (fullCode.value.indexOf(" ") === -1) {
    console.log(authInfo);

    try {
      if (!reset && !resetCode.value)
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

      router.push({
        name: "auth",
      });

      $q.notify({
        type: "positive",
        position: "top",
        message: "Все отлично! Осталось войти в аккаунт!",
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

    resetCode.value = true;

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
.dialog {
  padding: 64px 56px;

  &-input {
    max-width: 40px;
  }

  &-content {
    max-width: 300px;
  }
}

.close-section {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
