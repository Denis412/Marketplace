<template>
<p class="text-h4 c-mb-32">Входящие заявки</p>
  <q-list class="row c-mb-32 q-col-gutter-lg">
    <section class="col-6" v-for="application in applications" :key="application.id">
      <c-applications-card-inbox :application="application" :currentUser="currentUser"/>
    </section>
  </q-list>

<p class="text-h4 c-mb-32">Исходящие заявки</p>
  <q-list class="row c-mb-32 q-col-gutter-lg">
    <section class="col-6" v-for="application in applications" :key="application.id">
      <c-applications-card-outbox :application="application" :currentUser="currentUser"/>
    </section>
  </q-list>
</template>

<script setup>
import CApplicationsCardInbox from "./ClubApplicationsCardInbox.vue";
import CApplicationsCardOutbox from "./ClubApplicationsCardOutbox.vue";
import { ref } from "vue"

const { applications, currentUser } = defineProps({
  applications: Array,
  currentUser: Object
});

console.log("3)all app-list: ", applications)

</script>

<style lang="sass" scoped></style>
