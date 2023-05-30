<template>
  <q-form class="form rounded-borders-12 flex column q-mt-xl">
    <header class="text-h4 club-mb-32 text-center">Напишите нам</header>

    <main style="width: 100%">
      <div class="form-control">
        <c-input
          id="firstName"
          class="text-caption1"
          type="text"
          placeholder="Ваше имя"
          :my_class="'c-input-outline-white'"
          v-model="form.first_name"
        />
      </div>

      <div class="form-control">
        <c-input
          id="phoneNumber"
          class="text-caption1"
          type="text"
          placeholder="Номер телефона"
          v-model="form.phone_number"
          :my_class="'c-input-outline-white'"
        />
      </div>

      <div class="form-control">
        <c-input
          type="textarea"
          class="text-caption1"
          placeholder="Сообщение"
          v-model="form.message"
          :my_class="'c-input-outline-white'"
        />
      </div>
    </main>

    <footer class="flex justify-between q-mt-md" style="width: 100%">
      <q-checkbox
        keep-color
        dark
        class="text-caption2 q-mb-lg"
        style="max-width: 300px; color: rgba(164, 152, 183, 1)"
        v-model="form.checked"
        label="Даю согласие на обработку данных"
      />

      <c-button class="text-body1 my-btn q-px-lg q-py-md" background-square label="Отправить" />
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

  background: linear-gradient(
      101.5deg,
      rgba(16, 5, 34, 0.05) 37.03%,
      rgba(187, 173, 209, 0.04) 80.19%,
      rgba(16, 5, 34, 0.14) 100%
    ),
    rgba(18, 7, 36, 0.95);
  padding: 2rem 2rem;
  margin-left: 10rem;

  &-control {
    margin-top: 1rem;
  }
}

.my-btn {
  width: 100%;
}
</style>
