<template>
  <div class="flex">
    <c-button
      background
      size="lg"
      label="Сохранить"
      class="c-mr-32"
      @click="emit('updateTeamData')"
    />

    <c-button
      outline
      size="lg"
      label="Отменить"
      @click="router.go(-1)"
      class="page-background"
    />
  </div>
</template>

<script setup>
import CButton from "src/components/ClubButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const emit = defineEmits(["updateTeamData"]);
</script>
