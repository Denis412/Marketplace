<template>
  <section>
    <q-toolbar class="flex items-center">
      <q-toolbar-title style="max-width: min-content">
        <h4 class="text-h4">Проекты</h4>
      </q-toolbar-title>

      <q-btn-toggle
        v-model="selectProjectsList"
        flat
        stretch
        class="text-body1"
        toggle-color="purple-7"
        :options="typesProjectsList"
      />
    </q-toolbar>

    <main>
      <section
        v-if="!projects || !projects.length"
        class="row ptojects-wrapper q-gutter-x-md"
      >
        <q-card
          v-if="isOwner"
          flat
          class="flex flex-center project-card project-card-add col-4"
        >
          <q-card-section class="flex justify-center">
            <p class="text-body2 text-center text-violet-6">
              Чтобы ваш проект был доступен всем, добавьте его в это поле
            </p>

            <c-button background label="Создать проект" class="text-body2" />
          </q-card-section>
        </q-card>

        <q-card flat class="flex flex-center project-card col">
          <q-img
            class="no-projects-img"
            src="/src/assets/images/team-projects/no-projects.svg"
          />

          <div class="text-body2 c-ml-64">
            У вашей команды пока нет проектов...
          </div>
        </q-card>
      </section>

      <section v-else>
        <q-list class="row q-gutter-md" style="overflow-x: auto">
          <q-card
            v-if="isOwner"
            flat
            class="flex flex-center project-card project-card-add"
          >
            <q-card-section class="flex justify-center">
              <p class="text-body2 text-center text-violet-6">
                Чтобы ваш проект был доступен всем, добавьте его в это поле
              </p>

              <c-button background label="Создать проект" class="text-body2" />
            </q-card-section>
          </q-card>

          <q-card
            flat
            v-for="project in projects"
            :key="project.id"
            class="flex flex-center project-card col-4"
          >
            <q-card-section>
              <h4 class="text-h4 text-violet-6">{{ project.name }}</h4>
            </q-card-section>
          </q-card>
        </q-list>
      </section>

      <div></div>
    </main>
  </section>
</template>

<script setup>
import { inject, ref } from "vue";
import CButton from "src/components/ClubButton.vue";

const { projects, currentUser } = defineProps({
  projects: Array,
  currentUser: Object,
});

const typesProjectsList = ref([
  { label: "Активные", value: "active" },
  { label: "Завершенные", value: "finished" },
]);

const selectProjectsList = ref("");
const isOwner = inject("isOwner");
</script>

<style scoped lang="scss">
.no-projects-img {
  max-width: 211px;
}

.ptojects-wrapper {
  min-height: 256px;
}

.project-card {
  min-width: 300px;
  min-height: 256px;

  border: 1px dashed $violet-6;
  border-radius: 5px;

  &-add {
    max-width: 352px;
  }
}

.q-toolbar {
  padding: 0px;
}
</style>
