<template>
  <div class="flex">
    <c-button
      background
      label="Сохранить"
      type="submit"
      class="c-mr-32 text-body1"
      @click="$emit('updateTeamData')"
    />

    <c-button
      outline
      label="Отменить"
      @click="router.go(-1)"
      class="page-background text-body1"
    />
  </div>
</template>

<script setup>
import CButton from "src/components/ClubButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const emit = defineEmits(["updateTeamData"]);
</script>
