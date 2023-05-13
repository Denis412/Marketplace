<template>
  <q-page class="c-px-32 c-py-72">
    <div
      class="loader loader-lg"
      v-if="projectsLoading || subjectsLoading"
    ></div>

    <div v-else>
      <h3 class="text-h3">О проекте</h3>

      <!-- <section> -->
      <!-- <pre>hi{{ currentProject }}</pre> -->
      <!-- <pre>rt{{ membersGroup("Команда") }}</pre> -->
      <!-- <pre>hg{{ membersGroup("Заказчики") }}</pre> -->
      <!-- <pre>gh{{ membersGroup("Участники") }}</pre> -->
      <pre>ih{{ currentSubjects }}</pre>
      <!-- </section> -->

      <section>
        <q-img
          :src="currentProject?.avatar || ''"
          class="bg-violet4 rounded-borders-8 project-avatar c-mt-40"
        />

        <div class="flex justify-end c-mt-40">
          <q-btn
            flat
            no-caps
            outlined
            icon-right="img:/assets/icons/plus/plus-gradient.svg"
            class="club-button-outline"
            label="Загрузить картинку"
          />
        </div>
      </section>

      <section class="c-mt-72 information-section">
        <h4 class="text-h4">Информация о проекте</h4>

        <div class="c-mt-40">
          <div class="flex no-wrap justify-between q-gutter-x-md">
            <c-label-control
              label="Название проекта"
              class="information-section-left"
            >
              <template #control>
                <q-input
                  outlined
                  v-model="form.name"
                  class="c-input-outline"
                  :placeholder="
                    currentProject?.name || 'Напишите название проекта'
                  "
                />
              </template>
            </c-label-control>

            <c-label-control
              label="Дата создания проекта"
              class="information-section-right"
            >
              <template #control>
                <q-input
                  :placeholder="created_at || 'ДД.ММ.ГГГГ'"
                  class="date-input c-input-outline"
                  outlined
                >
                  <template #append>
                    <q-icon
                      name="img:/assets/icons/calendar/calendar-grey.svg"
                      class="cursor-pointer"
                    >
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="form.birthday"
                          @update:model-value="
                            changeUSerData('birthday', $event)
                          "
                          mask="DD.MM.YYYY"
                          navigation-min-year-month="1901/01"
                          navigation-max-year-month="2009/01"
                          :options="optionsDateSelect"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </template>
            </c-label-control>
          </div>

          <div class="flex no-wrap justify-between q-gutter-x-md">
            <c-label-control label="Команда" class="information-section-left">
              <template #control>
                <q-input
                  outlined
                  v-model="form.team_name"
                  class="c-input-outline"
                  :placeholder="
                    currentProject?.team_name || 'Напишите название команды'
                  "
                />
              </template>
            </c-label-control>

            <c-label-control
              label="Дата сдачи проекта"
              class="information-section-right"
            >
              <template #control>
                <q-input
                  :placeholder="delivery_date || 'ДД.ММ.ГГГГ'"
                  class="date-input c-input-outline"
                  outlined
                >
                  <template #append>
                    <q-icon
                      name="img:/assets/icons/calendar/calendar-grey.svg"
                      class="cursor-pointer"
                    >
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="form.created_at"
                          @update:model-value="
                            changeUSerData('birthday', $event)
                          "
                          mask="DD.MM.YYYY"
                          navigation-min-year-month="1901/01"
                          navigation-max-year-month="2009/01"
                          :options="optionsDateSelect"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </template>
            </c-label-control>
          </div>
        </div>
      </section>

      <section class="project-target flex no-wrap justify-between c-mt-72">
        <div class="col column c-mr-96">
          <h4 class="text-h4">Цель проекта</h4>

          <q-input
            autogrow
            outlined
            class="c-input-outline c-input-area-mh q-mt-lg col"
            placeholder="Опишите цель проекта"
          />
        </div>

        <q-img
          src="/assets/images/about-project-page/target.svg"
          class="project-target-image"
        />
      </section>

      <section class="c-mt-72 description-project flex no-wrap justify-between">
        <q-img
          src="/assets/images/about-project-page/description.svg"
          class="description-project-image c-mr-96"
        />

        <div class="col column">
          <h4 class="text-h4">Описание проекта</h4>

          <q-input
            autogrow
            outlined
            class="c-input-outline c-input-area-mh q-mt-lg col"
            placeholder="Напишите описание проекта"
          />
        </div>
      </section>

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

      <section class="c-mt-72">hello</section>

      <section class="c-mt-72">hello</section>
    </div>
  </q-page>
</template>

<script setup>
import { useProjectsQuery } from "src/use/projects";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import _ from "lodash";

import CSpecialistItem from "src/components/ClubSpecialistItem.vue";

import CLabelControl from "src/components/ClubLabelControl.vue";

const route = useRoute();

const { projects, subjects, projectsLoading, subjectsLoading, projectsError } =
  useProjectsQuery().getWithWere({
    page: 1,
    perPage: 1,
    where: {
      column: "name",
      operator: "EQ",
      value: route.params.name,
    },
    space_id: route.params.space,
    project_space: true,
  });

const currentProject = computed(() => projects.value?.paginate_project.data[0]);

const currentSubjects = computed(() => subjects.value?.paginate_group.data);

const created_at = computed(() =>
  new Date(currentProject.value?.created_at).toLocaleDateString()
);

const delivery_date = computed(() => {
  const date = currentProject.value?.delivery_date?.date;

  return date ? new Date(date).toLocaleDateString() : "";
});

const form = ref({
  name: "",
  team_name: "",
  created_at: "",
  delivery_date: "",
});

const membersGroup = (group_name) => {
  let members = [];

  subjects.value?.paginate_group.data.forEach((group) => {
    if (group.name === group_name) members.push(...group.subject);
  });

  return members;
};
</script>

<style scoped lang="scss">
.project-avatar {
  max-height: 336px;
}

.information-section {
  width: 740px;

  &-left {
    width: 352px;
    min-width: 200px;
  }

  &-right {
    width: 256px;
    min-width: 200px;
  }
}

.project-target {
  width: 1020px;
  width: 1020px;

  &-image {
    width: 288px;
  }
}

.description-project {
  margin-left: 72px;

  &-image {
    width: 344px;
  }
}

.leaders {
  width: 1024px;

  &-info {
    width: 512px;
  }

  &-image {
    width: 352px;
  }
}
</style>
