<template>
  <q-list v-if="applications" class="row c-mb-32 q-col-gutter-lg">
    <section class="col-6" v-for="application in applications" :key="application.id">
      <c-applications-card-inbox v-if="type===false" :application="application" :team="team" :currentUser="currentUser"/>
      <c-applications-card-outbox v-if="type===true" :application="application" :team="team" />
    </section>
  </q-list>
</template>

<script setup>
import CApplicationsCardInbox from "./ClubApplicationsCardInbox.vue";
import CApplicationsCardOutbox from "./ClubApplicationsCardOutbox.vue";
import { ref } from "vue"

const { team, applications, type, currentUser } = defineProps({
  team: Object,
  applications: Array,
  type: Boolean,
  currentUser: Object
});

</script>

<style lang="sass" scoped></style>
