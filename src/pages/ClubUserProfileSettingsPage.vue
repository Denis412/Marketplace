<template>
  <q-page class="c-pl-124 c-pt-64">
    <h4 class="text-h3">Профиль пользвоателя</h4>

    <section class="c-mt-64">
      <h4 class="text-h4">Основная информация</h4>

      <q-form> </q-form>
    </section>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  nickname: "",
  status: "",
  telegram: "",
  speciality: "",
  competencies: "",
  about: "",
  resume: "",
  artefacts: "",
});
</script>

<style scoped lang="scss"></style>
