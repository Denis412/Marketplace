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
              @change="updateProp('name', $event)"
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
              v-model="form.created_at"
              class="date-input c-input-outline"
              outlined
              readonly
            >
              <template #append>
                <q-icon name="img:/assets/icons/calendar/calendar-grey.svg" />
              </template>
            </q-input>
          </template>
        </c-label-control>
      </div>

      <div class="flex no-wrap justify-between q-gutter-x-md">
        <!-- <c-label-control label="Команда" class="information-section-left">
          <template #control>
            <q-input
              outlined
              v-model="form.team_name"
              class="c-input-outline"
              @change="updateProp('team_name', $event)"
              :placeholder="
                currentProject?.team_name || 'Напишите название команды'
              "
            />
          </template>
        </c-label-control> -->

        <c-label-control
          label="Дата сдачи проекта"
          class="information-section-right"
        >
          <template #control>
            <q-input
              v-model="form.delivery_date"
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
                      v-model="form.delivery_date"
                      @update:model-value="updateProp('delivery_date', $event)"
                      mask="DD.MM.YYYY"
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
import { useProjectUpdate } from "src/use/projects";
import { useRouter } from "vue-router";

const router = useRouter();

const { result, loading, updateProject } = useProjectUpdate();

const currentProject = inject("currentProject");
const space_id = inject("spaceId");

const created_at = computed(() =>
  new Date(currentProject.value?.created_at).toLocaleDateString()
);
const delivery_date = computed(() => currentProject.value?.delivery_date?.date);

const form = ref({
  name: currentProject.value.name,
  created_at: created_at.value,
  delivery_date: delivery_date.value,
});

const updateProp = async (prop_name, value) => {
  let input;

  if (prop_name === "delivery_date") {
    input = {
      name: currentProject.value.name,
      delivery_date: {
        date: value,
      },
    };
  } else {
    input = {
      name: currentProject.value.name,
      [prop_name]: value,
    };
  }

  await updateProject({
    id: currentProject.value.id,
    input,
    project_name: currentProject.value.name,
    project_space: currentProject.value.space,
    space_id: space_id,
  });
};
</script>

<style scoped lang="scss"></style>
