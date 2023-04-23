<template>
  <q-form class="form rounded-borders-12 flex column items-center">
    <header class="text-h4 club-mb-32">Напишите нам</header>

    <main style="width: 100%">
      <div class="form-control">
        <label for="firstName" class="text-body2">Имя</label>

        <c-input
          id="firstName"
          class="text-caption1"
          type="text"
          placeholder="Ваше имя"
          v-model="form.first_name"
        />
      </div>

      <div class="form-control">
        <label for="phoneNumber" class="text-body2">Номер телефона</label>

        <c-input
          id="phoneNumber"
          class="text-caption1"
          type="text"
          placeholder="+7 (000) 000-00-00"
          v-model="form.phone_number"
        />
      </div>

      <div class="form-control">
        <label for="email" class="text-body2">Почта</label>

        <c-input
          id="email"
          class="text-caption1"
          type="text"
          placeholder="main23@mail.ru"
          v-model="form.email"
        />
      </div>

      <div class="form-control">
        <c-input
          type="textarea"
          class="text-caption1"
          placeholder="Сообщение"
          v-model="form.message"
        />
      </div>
    </main>

    <footer class="flex justify-between q-mt-md" style="width: 100%">
      <q-checkbox
        keep-color
        dark
        class="text-caption2"
        style="max-width: 190px"
        v-model="form.checked"
        label="Я принимаю условия обработки персональных данных"
      />

      <q-btn no-caps label="Отправить" class="gradient-box-2" />
    </footer>
  </q-form>
</template>

<script setup>
import { ref } from "vue";
import CInput from "components/ClubInput.vue";
import CButton from "../ClubButton.vue";

const form = ref({
  first_name: "",
  phone_number: "",
  email: "",
  message: "",
  checked: false,
});
</script>

<style scoped lang="scss">
.form {
  max-width: 448px;
  width: 448px;

  min-height: 628px;

  background: rgba(135, 32, 148, 0.4);
  padding: 2rem 4rem;

  &-control {
    margin-top: 1rem;

    &:last-child {
      margin-top: 2rem;
    }
  }
}
</style>
