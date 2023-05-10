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
          <c-input
            type="text"
            countInput="1"
            v-model.numberCode="codeNumber"
            class="dialog-input c-input-number"
            maxlength="1"
            @update:modelValue="inputCode"
          />

          <c-input
            type="text"
            countInput="2"
            v-model.numberCode="codeNumber"
            class="dialog-input c-input-number"
            maxlength="1"
            @update:modelValue="inputCode"
          />

          <c-input
            type="text"
            countInput="3"
            v-model.numberCode="codeNumber"
            class="dialog-input c-input-number"
            maxlength="1"
            @update:modelValue="inputCode"
          />

          <c-input
            type="text"
            countInput="4"
            v-model.numberCode="codeNumber"
            class="dialog-input c-input-number"
            maxlength="1"
            @update:modelValue="inputCode"
          />

          <c-input
            type="text"
            countInput="5"
            v-model.numberCode="codeNumber"
            class="dialog-input c-input-number"
            maxlength="1"
            @update:modelValue="inputCode"
          />

          <c-input
            type="text"
            countInput="6"
            v-model.numberCode="codeNumber"
            class="dialog-input c-input-number"
            maxlength="1"
            @update:modelValue="inputCode"
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
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

import CInput from "./ClubInput.vue";
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
