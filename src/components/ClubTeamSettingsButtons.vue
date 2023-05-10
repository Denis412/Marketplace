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
      class="page-background"
      @click="to"
    />
  </div>
</template>

<script setup>
import CButton from "src/components/ClubButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const emit = defineEmits(["updateTeamData"])

const to = () => {
  router.push({
    name: "teams",
  });
};
</script>
