<template>
  <section class="flex no-wrap container">
    <div class="col">
      <h1 class="text-h1">1Т Клуб</h1>

      <p class="text-subtitle2 q-mt-md">
        1Т Клуб - сообщество единомышленников, которых объединяет страсть к
        работе и саморазвитию.
      </p>

      <c-button background size="xl" class="q-mt-xl" label="Вступить в клуб" />
    </div>

    <q-img
      class="col"
      style="max-width: 480px"
      src="src/assets/images/amico.svg"
    />
  </section>
</template>

<script setup>
import CButton from "../ClubButton.vue";
</script>

<style lang="scss" scoped>
section {
  margin-top: 71px;
}
</style>
