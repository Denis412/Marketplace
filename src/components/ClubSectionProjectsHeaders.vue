<template>
  <section class="leaders row c-mt-72 c-ml-32">
    <div class="col-5 flex items-center">
      <q-img src="/assets/images/about-project-page/leader-customer.svg" class="leaders-image" />
    </div>

    <div class="leaders-info c-ml-64 c-mr-124 col">
      <h4 class="text-subtitle4">Лидер проекта</h4>

      <c-specialist-item class="q-mt-lg bg-violet1" :specialist="currentLeader" />

      <h4 class="text-subtitle4 c-mt-40">Заказчик</h4>

      <q-btn
        flat
        v-if="isOwner"
        no-caps
        class="club-button-background text-body1 q-mt-lg"
        label="Пригласить"
        @click="redirectInvite"
      />

      <c-specialist-item
        v-for="specialist in currentCustomers"
        :key="specialist.id"
        class="q-mt-lg bg-violet1"
        :specialist="specialist"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import CSpecialistItem from "./ClubSpecialistItem.vue";

const route = useRoute();
const router = useRouter();

const isOwner = inject("isOwner");
const currentCustomers = inject("currentCustomers");
const currentLeader = inject("currentLeader");

const redirectInvite = () => {
  router.push({
    name: "projectInvite",
    params: { ...route.params },
    query: { ...route.query, customer: true, project: true },
  });
};
</script>

<style scoped lang="scss">
.leaders {
  // max-width: 1024px;

  &-info {
    width: 512px;
  }

  &-image {
    max-width: 352px;
    // height: 100%;
  }
}
</style>
