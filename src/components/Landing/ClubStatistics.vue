<template>
  <section class="text-center section-margin container">
    <div class="flex justify-between">
      <div class="text-h1">
        200+
        <div class="text-h2 text-violet-3">заказов</div>
      </div>

      <div class="text-h1">
        1500+
        <div class="text-h2 text-violet-3">участников</div>
      </div>

      <div class="text-h1">
        50+
        <div class="text-h2 text-violet-3">Городов</div>
      </div>
    </div>

    <div class="partitians">
      <h3 class="text-subtitle1 q-mt-xl q-pt-xl">Участники 1Т Клуба</h3>
      <div v-if="!flag" class="partitians-faces relative-position">
        <c-partitian :index="index" v-for="index in 33" :key="index" />
      </div>
      <div v-if="flag" class="partitians-faces relative-position">
        <c-partitian :index="index+33" v-for="index in 33" :key="index" />
      </div>
      <div class="q-mt-lg">
      <q-btn @click="flag = !flag" unelevated dense size="xl" :disable="!flag" class="q-mr-md" :icon="'chevron_left'"/>
      <q-btn @click="flag = !flag" unelevated dense size="xl" :disable="flag" class="q-mr-md" :icon="'chevron_right'"/>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import CPartitian from "./ClubPartitian.vue";

const flag = ref(false)
const chet = ref(33)
</script>

<style lang="scss" scoped>
.partitians {
  margin-top: 80px;

  &-faces {
    margin-top: 58px;
    height: 338px;
  }
}

.text-violet-3{
  color: rgba(144, 67, 180, 1);
}

</style>
