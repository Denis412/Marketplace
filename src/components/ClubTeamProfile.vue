<template>
  <section>
    <header>
      <h3 class="text-h3">Профиль команды</h3>
    </header>

    <main class="club-mt-24">
      <section
        class="w-100p bg-white rounded-borders-10 c-px-64 c-pt-24 c-pb-24"
      >
        <q-toolbar class="flex justify-end">
          <q-icon class="cursor-pointer" name="more_horiz" size="40px" />
        </q-toolbar>

        <div class="flex no-wrap">
          <q-avatar class="large-avatar">
            <q-img src="/src/assets/images/Ellipse55.svg" />
          </q-avatar>

          <div class="club-ml-32">
            <h4 class="text-h4">{{ team.title }}</h4>
            <div class="text-body2 q-mt-sm">{{ team.description }}</div>

            <q-list class="club-mt-32 q-gutter-sm">
              <c-button
                background
                v-for="direction in team.directions"
                :key="direction.title"
                :label="direction.title"
              />
            </q-list>
          </div>
        </div>
      </section>

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
          <div v-if="!team.projects || !team.projects.length">
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

      <section class="club-mt-32">
        <div class="text-h4">Участники</div>

        <div class="q-mt-md rounded-borders-10 bg-white c-pa-32">
          <q-toolbar class="toolbar-bottom-border q-pb-md">
            <q-btn-toggle
              v-model="selectMembersList"
              flat
              stretch
              class="text-body1 text-violet-6"
              toggle-color="purple-7"
              :options="membersTeamList"
            />

            <c-button background label="Пригласить" class="text-body2" />
          </q-toolbar>

          <q-toolbar class="overflow-auto">
            <q-btn-toggle
              v-model="selectSpecialistsList"
              flat
              stretch
              class="text-caption1 text-violet-6"
              toggle-color="purple-7"
              :options="specialtiesList"
            />
          </q-toolbar>

          <q-list class="flex q-mt-md">
            <section
              v-for="specialist in team[selectSpecialistsList]"
              :key="specialist.id"
              class="flex items-center c-ml-24"
            >
              <q-avatar class="medium-avatar">
                <q-img src="/src/assets/images/Ellipse55.svg" />
              </q-avatar>

              <div class="q-ml-md">
                <div class="text-body2">
                  {{ specialist.first_name }} {{ specialist.last_name }}
                </div>

                <div class="text-caption1 q-mt-sm">
                  {{ specialist.speciality }}
                </div>
              </div>
            </section>
          </q-list>
        </div>
      </section>
    </main>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import CButton from "./ClubButton.vue";

const { team } = defineProps({
  team: Object,
});

const typesProjectsList = ref([
  { label: "Завершенные", value: "finished" },
  { label: "Активные", value: "active" },
]);

const membersTeamList = ref([
  { label: "Команда", value: "team" },
  { label: "Отправленные заявки", value: "sended" },
]);

const specialtiesList = ref([
  { label: "Разработчики", value: "developers" },
  { label: "Менеджеры", value: "managers" },
  { label: "Маркетологи", value: "marketers" },
  { label: "Дизайнеры", value: "designers" },
  { label: "Аналитики", value: "analitics" },
]);

const selectProjectsList = ref("");
const selectMembersList = ref("");
const selectSpecialistsList = ref("");
</script>

<style scoped lang="scss">
.project-card {
  width: 352px;
  min-width: 300px;
  height: 256px;

  border: 1px dashed $violet-6;
  border-radius: 5px;
}

.toolbar-bottom-border {
  border-bottom: 1px solid #d8c4e7;
}
</style>
