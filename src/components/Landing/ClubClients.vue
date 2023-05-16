<template>
  <section class="flex column section-margin text-center container">
    <div class="text-h3">Кому подходит 1Т Клуб</div>

    <div class="relative-position">
      <img class="q-mt-md" src="/assets/images/landing/branches1.svg" />
      <img
        src="/assets/images/landing-background/main-page/bg-13.svg"
        class="absolute-center"
      />
    </div>

    <c-categories-group />
  </section>
</template>

<script setup>
import CCategoriesGroup from "components/Landing/ClubCategoriesGroup.vue";
</script>

<style lang="scss" scoped></style>
