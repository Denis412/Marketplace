<template>
  <section class="leaders flex no-wrap justify-between c-mt-72 c-ml-32">
    <div class="leaders-info">
      <h4 class="text-h4">Лидер проекта</h4>

      <c-specialist-item
        v-for="specialist in grouped['Команда']"
        :key="specialist.id"
        class="q-mt-lg bg-violet1"
        :specialist="specialist"
      />

      <h4 class="text-h4 c-mt-40">Заказчик</h4>

      <c-specialist-item
        v-for="specialist in grouped['Заказчик']"
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
        <q-tab name="members" class="c-tab-text" label="Участники" />

        <q-tab
          name="applications"
          class="c-tab-text"
          label="Исходящие заявки"
        />
      </q-tabs>
    </q-toolbar>

    <c-team-members-list class="c-mt-40" :members="currentProject.members" />
  </section>
</template>

<script setup>
import { computed, inject, ref } from "vue";

import CSpecialistItem from "src/components/ClubSpecialistItem.vue";
import CTeamMembersList from "src/components/ClubTeamMembersList.vue";

const currentProject = inject("currentProject");

const grouped = computed(() =>
  currentProject.value?.members.reduce((groups, subject) => {
    subject.group.forEach((group) => {
      if (!groups[group.name]) groups[group.name] = [];
      groups[group.name].push(subject);
    });

    return groups;
  }, {})
);

const selectedList = ref("members");
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
