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
        class="text-body1"
        toggle-color="purple-7"
        :options="typesProjectsList"
      />
    </q-toolbar>

    <main>
      <div v-if="!projects || !projects.length">
        <q-list
          class="q-gutter-x-md row no-wrap justify-between"
          style="overflow-x: auto"
        >
          <q-card
            v-for="n in 3"
            :key="n"
            flat
            class="flex flex-center project-card col-3"
          >
            <!-- <q-card-section class="text-center" v-if="n === 1">
              <div class="text-body2 text-violet-6">
                Чтобы ваш проект был доступнен всем, добавьте его в это поле
              </div>

              <c-button
                outline
                label="Создать проект"
                class="q-mt-md"
                icon-left="img:/src/assets/icons/Plus/plusPrimaryGradient.svg"
              />
            </q-card-section> -->
            <q-card-section class="text-center">
              <div class="text-h4 text-violet-6 text-uppercase">
                Проект
              </div>
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
  { label: "Активные", value: "active" },
  { label: "Завершенные", value: "finished" },
 
]);

const selectProjectsList = ref("");
</script>

<style scoped lang="scss">
.project-card {
  min-width: 300px;
  height: 256px;

  border: 1px dashed $violet-6;
  border-radius: 5px;
}

.q-toolbar{
  padding: 0px;
}
</style>
