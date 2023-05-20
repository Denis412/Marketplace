<template>
  <c-closing-dialog title="Создание проекта" title-position="center">
    <template #main-content>
      <q-form class="form">
        <c-label-control label="Название проекта">
          <template #control>
            <q-input
              outlined
              v-model="title"
              class="c-input-outline"
              placeholder="Название проекта"
              :rules="[required]"
            />
          </template>
        </c-label-control>

        <section v-if="loading">
          <div class="text-body2 text-center">Создаем проект...</div>
        </section>

        <section class="c-mt-32">
          <div class="text-body1">Лидер проекта</div>

          <c-specialist-item current-user class="bg-gray2 q-mt-lg" />
        </section>

        <footer class="flex justify-center q-gutter-x-lg c-mt-32 text-body1 rel-index-0">
          <q-btn
            flat
            no-caps
            label="Создать"
            class="club-button-background text-body1"
            @click="projectCreate"
          />

          <q-btn flat no-caps label="Отмена" class="club-button-outline text-body1" v-close-popup />
        </footer>
      </q-form>
    </template>
  </c-closing-dialog>
</template>

<script setup>
import { inject, ref } from "vue";

import { useProjectCreate } from "src/use/projects";
import { useValidators } from "src/use/validators";

import CClosingDialog from "src/components/ClubClosingDialog.vue";
import CLabelControl from "src/components/ClubLabelControl.vue";
import CSpecialistItem from "./ClubSpecialistItem.vue";

const { result, loading, createProject } = useProjectCreate();
const { required } = useValidators();

const currentTeam = inject("currentTeam");
const currentUser = inject("currentUser");

const title = ref("");

const projectCreate = async () => {
  await createProject({
    name: title.value,
    team: currentTeam.value,
    user: currentUser.value,
    space_id: currentTeam.value.space,
  });

  console.log(result.value);
};
</script>

<style scoped lang="scss">
.form {
  width: 350px;
}
</style>
