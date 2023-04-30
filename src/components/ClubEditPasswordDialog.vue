<template>
  <c-closing-dialog title="Изменение пароля" title-position="left">
    <template #main-content>
      <q-form @submit="changePassword">
        <main class="c-mt-32 dialog-input">
          <c-input
            v-if="recovery"
            id="old-password"
            v-model="form.oldPassword"
            type="password"
            placeholder="Ваш старый пароль"
            visibility
            :rules="[required, minLength(8), passwordValid]"
          />

          <c-input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Введите новый пароль"
            visibility
            :rules="[
              required,
              minLength(8),
              passwordValid,
              notEqual(form.oldPassword),
            ]"
          />

          <c-input
            id="confirm"
            v-model="form.confirmPassword"
            type="password"
            placeholder="Подтвердите новый пароль"
            visibility
            :rules="[required, minLength(8), equal(form.password)]"
          />
        </main>

        <footer class="flex flex-center c-mt-32">
          <c-button background label="Далее" type="submit" class="text-body2" />
        </footer>
      </q-form>

      <c-confirmation-code-dialog
        v-model="sendCode"
        :timer="timer"
        :auth-info="newAuthInfo"
        reset
      />
    </template>
  </c-closing-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useValidators } from "src/use/validators";
import { useTimer } from "src/use/timer";

import CInput from "./ClubInput.vue";
import CButton from "./ClubButton.vue";
import CConfirmationCodeDialog from "./ClubConfirmationCodeDialog.vue";
import CClosingDialog from "./ClubClosingDialog.vue";

import userApi from "src/sdk/user";
import { useQuasar } from "quasar";

const $q = useQuasar();
const { required, minLength, passwordValid, equal, notEqual } = useValidators();
const timer = useTimer(90);

const emit = defineEmits(["resetPassword"]);
const { authInfo, recovery } = defineProps({
  authInfo: Object,
  recovery: Boolean,
});

const form = ref({
  oldPassword: "",
  password: "",
  confirmPassword: "",
});
const sendCode = ref(false);
const newAuthInfo = ref({});

const changePassword = async () => {
  console.log("auth", authInfo);

  try {
    let userId;

    if (recovery) {
      await userApi.login(
        {
          login: authInfo.email,
          password: form.value.oldPassword,
        },
        true
      );
    }

    if (timer.timer.value === 90)
      userId = await userApi.userPasswordSendCode({
        email: authInfo.email,
      });
    else {
      $q.notify({
        type: "warning",
        position: "top",
        message: "Код подтверждения уже был отправлен на почту!",
      });

      sendCode.value = true;

      return;
    }

    newAuthInfo.value.email = authInfo.email;
    newAuthInfo.value.user_id = userId?.record.user_id;
    newAuthInfo.value.password = form.value.password;

    timer.start();

    sendCode.value = true;

    $q.notify({
      type: "positive",
      position: "top",
      message: "Код подтверждения отрпавлен на почту!",
    });
  } catch (error) {
    console.log(error);

    if (recovery) {
      $q.notify({
        type: "negative",
        position: "top",
        message: "Указан неверный старый пароль!",
      });
    }
  }
};
</script>

<style scoped lang="scss">
.dialog {
  padding: 64px 50px;

  &-input {
    width: 400px;
  }
}
</style>
