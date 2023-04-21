<template>
  <q-form class="form rounded-borders-12 flex justify-center">
    <header class="header-text-32 club-mb-32">Напишите нам</header>

    <main>
      <club-input
        type="text"
        placeholder="Ваше имя"
        v-model="form.first_name"
      />

      <club-input
        type="text"
        placeholder="Ваше имя"
        v-model="form.first_name"
      />

      <club-input
        type="text"
        placeholder="Ваше имя"
        v-model="form.first_name"
      />

      <club-input
        type="text"
        placeholder="Ваше имя"
        v-model="form.first_name"
      />
    </main>
  </q-form>
</template>

<script setup>
import ClubInput from "src/components/ClubInput.vue";

const form = ref({
  first_name: "",
  phone_number: "",
  email: "",
  message: "",
});
</script>

<style scoped lang="scss">
.form {
  max-width: 448px;
  width: 448px;

  min-height: 628px;

  background: rgba(135, 32, 148, 0.4);
  padding: 2rem 4rem;
}
</style>
