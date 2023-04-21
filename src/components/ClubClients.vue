<template>
  <section class="clients container">
        <div class="header-text-32 text-center">Кому подходит 1Т Клуб</div>
        <img class="q-mt-md lines block" src="src/assets/images/Vector11.svg" />

        <categories-group />
  </section>
</template>

<script setup>
import CategoriesGroup from "src/components/ClubCategoriesGroup.vue";

</script>

<style lang="scss" scoped>
.clients {
  margin-top: 182px;
}

.lines {
  width: 74.38%;
  margin: 16px auto auto;
}
</style>
