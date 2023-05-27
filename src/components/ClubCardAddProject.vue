<template>
  <q-card>
    <q-card-section class="flex justify-center">
      <p class="text-body2 text-center text-violet-6">
        Чтобы ваш проект был доступен всем, добавьте его в это поле
      </p>

      <c-button
        background
        label="Создать проект"
        class="text-body2"
        @click="showForm = !showForm"
      />
    </q-card-section>

    <c-project-create-form v-model="showForm" />
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import CButton from "./ClubButton.vue";
import CProjectCreateForm from "./ClubProjectCreateForm.vue";

const showForm = ref(false);
</script>

<style scoped lang="scss"></style>
