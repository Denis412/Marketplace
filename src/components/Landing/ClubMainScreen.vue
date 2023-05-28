<template>
  <section class="flex no-wrap container items-center">
    <div class="col">
      <h1 class="text-h1">{{ title }}</h1>

      <p class="text-subtitle4 q-mt-md">
        {{ subtitle }}
      </p>

      <c-button to="/registration" background size="xl" class="q-mt-xl" label="Вступить в клуб" />
    </div>

    <q-img class="col" style="max-width: 480px" :src="img" />
  </section>
</template>

<script setup>
import CButton from "../ClubButton.vue";

const { title, subtitle, img } = defineProps({
  title: String,
  subtitle: String,
  img: String,
});
</script>

<style lang="scss" scoped>
section {
  margin-top: 56px;
}
</style>
