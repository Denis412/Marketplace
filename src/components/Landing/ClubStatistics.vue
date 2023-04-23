<template>
  <section class="text-center section-margin container">
    <div class="flex justify-between">
      <div class="text-h1">
        200+
        <div class="text-h2">заказов</div>
      </div>

      <div class="text-h1">
        1500+
        <div class="text-h2">участников</div>
      </div>

      <div class="text-h1">
        50+
        <div class="text-h2">Городов</div>
      </div>
    </div>

    <div class="partitians">
      <h3 class="text-subtitle1">Почетные участники 1Т Клуба</h3>
      <div class="partitians-faces relative-position">
        <partitian :index="index" v-for="index in 33" :key="index" />
      </div>
    </div>
  </section>
</template>

<script setup>
import Partitian from "./ClubPartitian.vue";
</script>

<style lang="scss" scoped>
.partitians {
  margin-top: 80px;

  &-faces {
    margin-top: 58px;
    height: 338px;
  }
}
</style>
