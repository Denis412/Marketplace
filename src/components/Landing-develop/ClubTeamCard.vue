<template>
  <section class="section-mb q-pa-md row items-start q-gutter-md">
    <q-card class="team-card">
      <img :src="team.img" />

      <q-card-section class="c-pa-32">
        <p class="text-subtitle3 c-mb-8">{{ team.name }}</p>
        <p class="text-body2 c-mb-24">{{ team.description }}</p>

        <section class="c-mb-24">
          <q-chip
            v-for="(chip, index) in team.chips"
            :key="chip[index]"
            class="text-caption2 team-chip"
            >{{ chip }}</q-chip
          >
        </section>
        <section class="text-body1 q-pt-none">Подробнее ></section>
      </q-card-section>
    </q-card>
  </section>
</template>   

<script setup>
const { team } = defineProps({
  team: Object,
});
</script>


<style lang="scss" scoped>
.team {
  &-card {
    background: linear-gradient(97.7deg, #432076 0%, #3a1d47 100%);
    border-radius: 20px;
    max-width: 352px;
    height: 520px;
  }
  &-chip {
    padding: 6px 16px;
  }
}

.base {
  margin: 0;
  padding: 0;
}
</style>