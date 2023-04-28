<template>
  <q-dialog>
    <q-card class="dialog-size">
      <q-card-section>
        <section class="flex justify-end">
          <q-btn icon="close" flat round dense v-close-popup />
        </section>
      </q-card-section>

      <q-card-section class="flex justify-center">
        <q-form @submit="$emit('resetPassword', form.password)">
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
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import CInput from "./ClubInput.vue";
import CButton from "./ClubButton.vue";
import { useValidators } from "src/use/validators";

const { required, passwordValid, equal } = useValidators();

const emit = defineEmits(["resetPassword"]);

const form = ref({
  password: "",
  confirmPassword: "",
});
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
