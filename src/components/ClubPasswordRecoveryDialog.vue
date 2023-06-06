<template>
  <c-closing-dialog title="Восстановление пароля" title-position="center">
    <template #main-content>
      <section class="flex justify-center">
        <q-img
          src="/assets/images/account-settings-page/password-recovery.svg"
          class="dialog-image q-mt-md"
        />

        <p class="text-body2 text-center c-mt-32">Введите e-mail, привязанный к вашему аккаунту</p>
      </section>

      <q-form ref="form" class="flex no-wrap items-center c-mt-32" @submit="submitForm">
        <q-input
          flat
          outlined
          class="c-input-outline dialog-input"
          v-model="authInfo.email"
          type="email"
          maxlength="256"
          placeholder="mail@example.ru"
          :rules="[required, email, maxLength(256)]"
          lazy-rules
        />

        <q-icon
          name="img:/assets/icons/arrow/arrow-right-circle-purple.svg"
          class="dialog-icon q-ml-md cursor-pointer"
          @click="sendEmail"
        />
      </q-form>

      <c-edit-password-dialog v-model="sended" :auth-info="authInfo" />
    </template>
  </c-closing-dialog>
</template>

<script setup>
import { ref } from "vue";

import CInput from "./ClubInput.vue";
import CClosingDialog from "./ClubClosingDialog.vue";
import CEditPasswordDialog from "./ClubEditPasswordDialog.vue";
import { useValidators } from "src/use/validators";

const { required, email, maxLength } = useValidators();

const authInfo = ref({
  email: "",
});
const sended = ref(false);
const form = ref(null);

const submitForm = () => (sended.value = true);
const sendEmail = () => form.value.submit();
</script>

<style scoped lang="scss">
.dialog {
  &-image {
    max-width: 184px;
  }

  &-icon {
    width: 32px;
    height: 32px;
  }

  &-input {
    width: 400px;
  }
}
</style>
