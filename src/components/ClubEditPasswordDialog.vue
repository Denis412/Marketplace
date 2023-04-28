<template>
  <q-dialog>
    <q-card class="dialog-size">
      <q-card-section>
        <section class="flex justify-end">
          <q-btn icon="close" flat round dense v-close-popup />
        </section>
      </q-card-section>

      <q-card-section class="flex justify-center">
        <q-form @submit="changePassword">
          <h3 class="text-h3">Изменение пароля</h3>

          <main class="c-mt-32 dialog-size-input">
            <label for="password">
              <p class="text-left text-body2 q-mb-sm">Введите новый пароль</p>

              <c-input
                id="password"
                v-model="form.password"
                type="password"
                visibility
                :rules="[required, passwordValid]"
              />
            </label>

            <label for="confirm">
              <p class="text-left text-body2 q-mt-lg q-mb-sm">
                Подтвердите новый пароль
              </p>

              <c-input
                id="confirm"
                v-model="form.confirmPassword"
                type="password"
                visibility
                :rules="[required, equal(form.password)]"
              />
            </label>
          </main>

          <!-- <pre>{{ isReactive(authInfo) }}</pre> -->

          <footer class="flex flex-center c-mt-32">
            <c-button
              background
              label="Изменить пароль"
              type="submit"
              class="text-body2"
            />
          </footer>
        </q-form>
      </q-card-section>

      <c-confirmation-code-dialog
        v-model="sendCode"
        :timer="timer"
        :auth-info="newAuthInfo"
      />
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useValidators } from "src/use/validators";
import { useTimer } from "src/use/timer";

import CInput from "./ClubInput.vue";
import CButton from "./ClubButton.vue";
import CConfirmationCodeDialog from "./ClubConfirmationCodeDialog.vue";

import userApi from "src/sdk/user";
import { useQuasar } from "quasar";

const $q = useQuasar();
const { required, passwordValid, equal } = useValidators();
const timer = useTimer(90);

const emit = defineEmits(["resetPassword"]);
const { authInfo } = defineProps({
  authInfo: Object,
});

const form = ref({
  password: "",
  confirmPassword: "",
});
const sendCode = ref(false);
const newAuthInfo = ref({});

const changePassword = async () => {
  console.log("auth", authInfo);

  try {
    let userId;

    if (timer.timer.value === 90)
      userId = await userApi.userPasswordSendCode({
        email: authInfo.email,
      });

    newAuthInfo.value.email = authInfo.email;
    newAuthInfo.value.user_id = userId?.record.user_id;
    newAuthInfo.value.password = form.value.password;

    timer.clear();
    timer.start();

    sendCode.value = true;

    $q.notify({
      type: "positiove",
      position: "top",
      message: "Код подтверждения отрпавлен на почту!",
    });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped lang="scss">
.dialog-size {
  width: 500px;
  height: 540px;

  &-input {
    width: 340px;
  }
}
</style>
