<template>
  <div class="flex">
    <c-button background size="lg" label="Найти команду" @click="to" class="c-mr-32" />

    <c-button
      outline
      size="lg"
      label="Создать команду"
      class="page-background"
      to="/club/team-create"
    />
  </div>
</template>

<script setup>
import CButton from "src/components/ClubButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const to = () => {
  router.push({
    name: "teams",
  });
};
</script>
