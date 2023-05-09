<template>
  <q-page class="c-pa-32 page-background">
    <header>
      <h3 class="text-h3">Пригласить участника</h3>
    </header>

    <main class="q-mt-md">
      <section class="flex items-center">
        <q-input
          class="search-input c-input-outline"
          outlined
          placeholder="Поиск участника"
          @update:model-value="filteredSubjects"
          v-model="filter"
        >
          <template #prepend>
            <q-icon
              name="img:/src/assets/icons/search/search-grey.svg"
              class="cursor-pointer"
            />
          </template>
        </q-input>

        <c-dropdown
          :loading="loading"
          label="Специальность"
          class="c-ml-32"
          :list="allSpecialities?.paginate_speciality.data"
        />
      </section>

      <section class="row c-mt-24">
        <section class="col">
          <div class="subjects-wrapper">
            <q-list class="q-gutter-y-md">
              <c-invite-subject-item
                v-for="subject in allSubjects?.paginate_subject.data"
                :key="subject.id"
                class="rounded-borders-10 flex justify-between"
                :subject="subject"
              />
            </q-list>
          </div>

          <div class="q-mt-md q-gutter-x-md text-body1">
            <c-button
              :disable="!selectedSubjects.length"
              background
              label="Пригласить"
              @click="inviteSubjects"
            />

            <c-button outline label="Отменить" />
          </div>
        </section>

        <section class="col c-ml-32">
          <div v-if="selectedSubjects.length">
            <section class="selected-subjects-wrapper c-pa-32">
              <q-list class="flex q-gutter-md">
                <c-selected-subject-chip
                  v-for="subject in selectedSubjects"
                  :key="subject.id"
                  :subject="subject"
                />
              </q-list>
            </section>

            <div class="text-body1">
              <c-button
                background
                label="Сбросить"
                class="q-mt-md"
                @click="resetSubjects"
              />
            </div>
          </div>
        </section>
      </section>
    </main>
  </q-page>
</template>

<script setup>
import CButton from "src/components/ClubButton.vue";
import CInviteSubjectItem from "src/components/ClubInviteSubjectItem.vue";
import CSelectedSubjectChip from "src/components/ClubSelectedSubjectChip.vue";
import CDropdown from "src/components/ClubDropdown.vue";
import { provide, ref } from "vue";

import specilalityApi from "src/sdk/speciality";
import userApi from "src/sdk/user";
import teamApi from "src/sdk/team";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import applicationApi from "src/sdk/application";

const router = useRouter();
const route = useRoute();
const $q = useQuasar();

const { result: team, loading: loadingTeam } = teamApi.paginateTeams({
  page: 1,
  perPage: 1,
  where: {
    column: "name",
    operator: "EQ",
    value: route.params.name,
  },
});
const { result: allSpecialities, loading } = specilalityApi.paginateSpeciality({
  page: 1,
  perPage: 100,
});
const { result: allSubjects, loading: loadingSubjects } =
  userApi.paginateSubjects({ page: 1, perPage: 100, is_invite: true });

const selectedSubjects = ref([]);
const filter = ref([]);

provide("selectedSubjects", selectedSubjects);

const inviteSubjects = async () => {
  if (!selectedSubjects.value.length) return;

  try {
    // Исправить поведение заявок, если в перечне выбранных пользователей есть те,
    // которые уже были приглашены или состоят в команде. Сейчас при такой ситуции
    // приглашения отправляются всем, кто ранее не приглашался и выводится ошибка

    for (let subject of selectedSubjects.value) {
      await teamApi.inviteUser({
        space_id: team.value.paginate_team.data[0].space,
        team_id: team.value.paginate_team.data[0].id,
        data: {
          id: subject.id,
          name: subject.fullname.first_name,
          surname: subject.fullname.last_name,
          email: subject.email.email,
          subject_id: subject.id,
          team_id: team.value.paginate_team.data[0].id,
          sender: "team",
        },
      });
    }

    await teamApi.refetchPaginateTeams({
      page: 1,
      perPage: 1,
      where: {
        column: "name",
        operator: "EQ",
        value: route.params.name,
      },
    });

    $q.notify({
      type: "positive",
      message: "Приглашения отправлены!",
    });

    selectedSubjects.value = [];

    // router.push({
    //   name: "team",
    //   params: { name: route.params.name },
    // });
  } catch (error) {
    console.log(error);

    $q.notify({
      type: "negative",
      message:
        "Какие-то из пользователей уже были приглашены или состоят в команде!",
    });
  }
};
const filteredSubjects = () => {};
const resetSubjects = () => (selectedSubjects.value = []);
</script>

<style scoped lang="scss">
.search-input {
  width: 450px;
}

.subjects-wrapper {
  max-height: 532px;
  overflow-y: auto;

  padding: 24px;
  background: $grey-4;
  border-radius: 10px;
}

.selected-subjects-wrapper {
  height: max-content;

  border-radius: 10px;
  background: $grey-4;
}
</style>
