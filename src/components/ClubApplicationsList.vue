<template>
  <q-list class="row">
    <section
      v-for="application in applications"
      :key="application.id"
      class="col-6 q-pa-sm"
    >
      <c-application-team-card
        :application="application"
        :incoming="incoming"
      />
    </section>
  </q-list>
</template>

<script setup>
import CApplicationTeamCard from "src/components/ClubApplicationTeamCard.vue";

const { applications, incoming } = defineProps({
  applications: Array,
  incoming: Boolean,
});
</script>

<style lang="sass" scoped></style>
