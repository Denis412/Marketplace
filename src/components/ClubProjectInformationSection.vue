<template>
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
              :placeholder="currentProject?.name || 'Напишите название проекта'"
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
                      @update:model-value="changeUSerData('birthday', $event)"
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
                      @update:model-value="changeUSerData('birthday', $event)"
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
</template>

<script setup>
import { inject, computed, ref } from "vue";

import CLabelControl from "src/components/ClubLabelControl.vue";

const currentProject = inject("currentProject");

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
</script>

<style scoped lang="scss"></style>
