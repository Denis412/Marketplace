<template>
  <q-page class="c-pa-32 page-background">
    <header>
      <h3 class="text-h3">Пригласить участника</h3>
    </header>

    <main class="q-mt-md">
      <section class="flex items-center">
        <c-input
          class="search-input"
          type="text"
          placeholder="Поиск участника"
        />

        <q-btn-dropdown label="Выбрать специальность" class="c-ml-32">
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Разработчик</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Дизайнер</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Маркетолог</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </section>

      <section class="subjects-wrapper c-mt-24 q-gutter-y-md">
        <q-item
          clickable
          class="rounded-borders-10 flex justify-between"
          v-for="specialist in allSubjects"
          :key="specialist.id"
        >
          <c-specialist-item :specialist="specialist" />

          <q-checkbox v-model="selectedSubjects" :val="specialist" />
        </q-item>
      </section>

      <section></section>
    </main>
  </q-page>
</template>

<script setup>
import CInput from "src/components/ClubInput.vue";
import CSpecialistsList from "src/components/ClubSpecialistsList.vue";
import CSpecialistItem from "src/components/ClubSpecialistItem.vue";
import { ref } from "vue";

const { team } = defineProps({
  team: Object,
});

const selectedSubjects = ref([]);

const allSubjects = ref([
  {
    id: 1,
    first_name: "Денис",
    last_name: "Малышев",
    speciality: "Разработчик",
  },
  {
    id: 2,
    first_name: "Денис",
    last_name: "Малышев",
    speciality: "Разработчик",
  },
  {
    id: 3,
    first_name: "Денис",
    last_name: "Малышев",
    speciality: "Разработчик",
  },
  {
    id: 4,
    first_name: "Денис",
    last_name: "Малышев",
    speciality: "Разработчик",
  },
  {
    id: 5,
    first_name: "Денис",
    last_name: "Малышев",
    speciality: "Разработчик",
  },
  {
    id: 6,
    first_name: "Денис",
    last_name: "Малышев",
    speciality: "Разработчик",
  },
  {
    id: 7,
    first_name: "Денис",
    last_name: "Малышев",
    speciality: "Разработчик",
  },
  {
    id: 8,
    first_name: "Денис",
    last_name: "Малышев",
    speciality: "Разработчик",
  },
]);
</script>

<style scoped lang="scss">
.search-input {
  width: 450px;
}

.subjects-wrapper {
  max-width: 545px;
  width: 545px;
  max-height: 532px;
  overflow-y: auto;

  padding: 24px;
  background: white;
  border-radius: 10px;
}
</style>
