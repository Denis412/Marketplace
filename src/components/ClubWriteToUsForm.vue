<template>
  <q-form class="form rounded-borders-12 flex column items-center">
    <header class="header-text-32 club-mb-32">Напишите нам</header>

    <main style="width: 100%">
      <div class="form-control">
        <label for="firstName" class="text-16">Имя</label>

        <club-input
          id="firstName"
          type="text"
          placeholder="Ваше имя"
          v-model="form.first_name"
        />
      </div>

      <div class="form-control">
        <label for="phoneNumber" class="text-16">Номер телефона</label>

        <club-input
          id="phoneNumber"
          type="text"
          placeholder="+7 (000) 000-00-00"
          v-model="form.phone_number"
        />
      </div>

      <div class="form-control">
        <label for="email" class="text-16">Почта</label>

        <club-input
          id="email"
          type="text"
          placeholder="main23@mail.ru"
          v-model="form.email"
        />
      </div>

      <div class="form-control">
        <club-input
          type="textarea"
          placeholder="Сообщение"
          v-model="form.message"
        />
      </div>
    </main>

    <footer
      class="flex justify-between items-center q-mt-md"
      style="width: 100%"
    >
      <q-checkbox
        keep-color
        dark
        class="text-10"
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
import ClubInput from "src/components/ClubInput.vue";

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
