<template>
  <section class="leaders flex no-wrap justify-between c-mt-72 c-ml-32">
    <div class="leaders-info">
      <h4 class="text-h4">Лидер проекта</h4>

      <c-specialist-item
        v-for="specialist in membersGroup('Команда')"
        :key="specialist.id"
        class="q-mt-lg bg-violet1"
        :specialist="specialist"
      />

      <h4 class="text-h4 c-mt-40">Заказчик</h4>

      <c-specialist-item
        v-for="specialist in membersGroup('Заказчики')"
        :key="specialist.id"
        class="q-mt-lg bg-violet1"
        :specialist="specialist"
      />
    </div>

    <q-img
      src="/assets/images/about-project-page/leader-customer.svg"
      class="leaders-image"
    />
  </section>

  <section class="c-mt-72">
    <h4 class="text-h4">Проектная команда</h4>

    <q-toolbar class="q-pa-none q-mt-lg">
      <q-tabs
        v-model="selectedList"
        indicator-color="black"
        class="bg-transparent"
      >
        <q-tab name="members" class="text-body1" label="Участники" />

        <q-tab
          name="applications"
          class="text-body1"
          label="Исходящие заявки"
        />
      </q-tabs>
    </q-toolbar>

    <c-team-members-list class="c-mt-40" :members="filteredSubjects" />
  </section>
</template>

<script setup>
import { inject, computed, ref } from "vue";

import CSpecialistItem from "src/components/ClubSpecialistItem.vue";
import CTeamMembersList from "src/components/ClubTeamMembersList.vue";

const currentSubjects = inject("currentSubjects");

const filteredSubjects = computed(() =>
  currentSubjects.value.reduce((filtered, group) => {
    filtered.push(...group.subject);
    return filtered;
  }, [])
);

const selectedList = ref("members");

const membersGroup = (group_name) =>
  currentSubjects.value.reduce((filtered, group) => {
    if (group.name === group_name) filtered.push(...group.subject);
    return filtered;
  }, []);
</script>

<style scoped lang="scss">
.leaders {
  max-width: 1024px;

  &-info {
    width: 512px;
    margin-right: 32px;
  }

  &-image {
    width: 352px;
  }
}
</style>
