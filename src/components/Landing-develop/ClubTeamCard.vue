<template>
  <section class="q-pa-md row items-start q-gutter-md c-mb-28">
    <q-card class="team-card">
      <img :src="team.img" />

      <q-card-section class="flex column justify-between c-pa-32 team-content">
        <section>
          <p class="text-subtitle3 c-mb-8">{{ team.name }}</p>
          <p class="text-body2 c-mb-24">{{ team.description }}</p>
        </section>

        <section>
          <q-chip
            v-for="(chip, index) in team.chips"
            :key="chip[index]"
            class="text-caption2 team-chip c-mb-24"
            >{{ chip }}</q-chip
          >

          <!-- <section class="text-body1 q-pt-none">Подробнее ></section> -->
        </section>
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
  &-content {
    max-height: 324px;
    height: 100%;
  }
}
.c-mb-28 {
  margin-bottom: 28px;
}

.base {
  margin: 0;
  padding: 0;
}
</style>
