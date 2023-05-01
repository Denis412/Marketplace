<template>
  <c-closing-dialog title="Восстановление пароля" title-position="center">
    <template #main-content>
      <section class="flex justify-center">
        <q-img
          src="/src/assets/images/password-recovery/password-recovery.svg"
          class="dialog-image q-mt-md"
        />

        <p class="text-body2 text-center c-mt-32">
          Введите e-mail, привязанный к вашему аккаунту
        </p>
      </section>

      <q-form class="flex no-wrap items-center c-mt-32">
        <c-input
          v-model="authInfo.email"
          placeholder="mail@example.ru"
          class="dialog-input"
        />

        <q-icon
          name="img:/src/assets/icons/arrow/arrow-right-circle-purple.svg"
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

const authInfo = ref({
  email: "",
});
const sended = ref(false);

const sendEmail = () => (sended.value = true);
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
