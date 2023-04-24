<template>
  <section class="club-mt-32">
    <q-toolbar class="flex items-center">
      <q-toolbar-title style="max-width: min-content">
        <h4 class="text-h4">Проекты</h4>
      </q-toolbar-title>

      <q-btn-toggle
        v-model="selectProjectsList"
        flat
        stretch
        class="text-body1 text-violet-6"
        toggle-color="purple-7"
        :options="typesProjectsList"
      />
    </q-toolbar>

    <main>
      <div v-if="!projects || !projects.length">
        <q-list
          class="flex justify-between w-100p no-wrap q-gutter-x-lg"
          style="overflow-x: auto"
        >
          <q-card
            v-for="n in 3"
            :key="n"
            flat
            class="flex flex-center project-card"
          >
            <q-card-section class="text-center" v-if="n === 2">
              <div class="text-body2">
                Чтобы ваш проект был доступнен всем, добавьте его в это поле
              </div>

              <c-button
                outline
                label="Создать проект"
                class="q-mt-md"
                icon-left="img:/src/assets/icons/Plus/plusPrimaryGradient.svg"
              />
            </q-card-section>
          </q-card>
        </q-list>
      </div>

      <div></div>
    </main>
  </section>
</template>

<script setup>
import { ref } from "vue";
import CButton from "src/components/ClubButton.vue";

const { projects } = defineProps({
  projects: Array,
});

const typesProjectsList = ref([
  { label: "Завершенные", value: "finished" },
  { label: "Активные", value: "active" },
]);

const selectProjectsList = ref("");
</script>

<style scoped lang="scss">
.project-card {
  width: 352px;
  min-width: 300px;
  height: 256px;

  border: 1px dashed $violet-6;
  border-radius: 5px;
}
</style>
