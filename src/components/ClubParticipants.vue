<template>
  <section class="container partitians">
    <h3 class="text-center font-size-32">Почетные участники 1Т Клуба</h3>
    <div class="partitians-faces relative-position">
      <partitian :index="index" v-for="index in 33" />
    </div>
  </section>
</template>

<script setup>
import Partitian from "./ClubPartitian.vue";
</script>

<style lang="scss" scoped>
.partitians {
  margin-top: 52px;

  &-faces {
    margin-top: 58px;
    height: 338px;
  }
}
</style>
