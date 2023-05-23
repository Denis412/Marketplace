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
          @change="filteringSubjects('name')"
          v-model="filters.name"
        >
          <template #prepend>
            <q-icon name="img:/assets/icons/search/search-grey.svg" class="cursor-pointer" />
          </template>
        </q-input>

        <q-select
          no-caps
          borderless
          clearable
          class="club-dropdown text-caption1"
          v-model="filters.speciality"
          @update:model-value="filteringSubjects('speciality')"
          :options="selectSpecialitites"
          dropdown-icon="img:/assets/icons/arrow/arrow-down-grey.svg"
        />

        <!-- <q-btn-dropdown
          no-caps
          class="text-caption1"
          :loading="loading"
          v-model="filters.speciality"
          label="Специальность"
        >
          <q-list separator>
            <q-item
              clickable
              class="flex items-center"
              v-for="speciality in allSpecialities?.paginate_speciality.data"
              :key="speciality.id"
              @click="filteringSubjects('speciality', speciality.name)"
            >
              <span class="text-caption1">{{ speciality.name }}</span>
            </q-item>
          </q-list>
        </q-btn-dropdown> -->
      </section>

      <section class="row c-mt-24">
        <section class="col">
          <div class="subjects-wrapper">
            <q-list class="q-gutter-y-md" v-if="showSubjects?.length">
              <c-invite-subject-item
                v-for="subject in showSubjects"
                :key="subject.id"
                class="rounded-borders-10 flex justify-between"
                :subject="subject"
              />
            </q-list>

            <div class="flex flex-center" v-else>
              <span class="text-body2">Пользователи не найдены!</span>
            </div>
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
              <c-button background label="Сбросить" class="q-mt-md" @click="resetSubjects" />
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
import { computed, provide, ref } from "vue";

import specilalityApi from "src/sdk/speciality";
import userApi from "src/sdk/user";
import teamApi from "src/sdk/team";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useTeamApplication } from "src/use/teams";
import { useProjectApplication } from "src/use/projects";

const { result, loading: sending, sendApplication } = useTeamApplication();
const {
  result: sendedProjectApplication,
  loading: sendingProjectAppliaction,
  sendApplication: sendProjectApplication,
} = useProjectApplication();

const route = useRoute();
const $q = useQuasar();

const selectedSubjects = ref([]);
const filteredSubjects = ref(null);
const filters = ref({
  name: "",
  speciality: "",
});

const { result: team, loading: loadingTeam } = teamApi.paginateTeams({
  page: 1,
  perPage: 1,
  where: {
    column: "id",
    operator: "EQ",
    value: route.params.id,
  },
});

const { result: allSpecialities, loading } = specilalityApi.paginateSpeciality({
  page: 1,
  perPage: 100,
});

const { result: allSubjects, loading: loadingSubjects } = userApi.paginateSubjects({
  page: 1,
  perPage: 100,
  is_invite: !route.query.space,
  is_team: route.query.space,
  space_id: route.query.space,
});

const selectSpecialitites = computed(() =>
  allSpecialities.value?.paginate_speciality.data.map((speciality) => ({
    label: speciality.name,
    value: speciality.id,
  }))
);
const showSubjects = computed(
  () => filteredSubjects.value ?? allSubjects.value?.paginate_subject.data
);

provide("selectedSubjects", selectedSubjects);

const inviteSubjects = async () => {
  if (!selectedSubjects.value.length) return;

  try {
    if (route.query.space) {
      for (let subject of selectedSubjects.value) {
        await sendProjectApplication({
          subject: subject,
          project_name: route.query.name,
          project_id: route.params.id,
          space_id: route.query.space,
        });
      }
    } else
      for (let subject of selectedSubjects.value) {
        await sendApplication({
          name: team.value.paginate_team.data[0].name,
          subject: {
            [process.env.SUBJECT_TYPE_ID]: subject.id,
          },
          team: {
            [process.env.TEAM_TYPE_ID]: team.value.paginate_team.data[0].id,
          },
          status: process.env.APPLICATION_STATUS_PENDING,
          sender: "team",
          sender_id: team.value.paginate_team.data[0].id,
          target: subject,
        });
      }

    selectedSubjects.value = [];

    // router.push({
    //   name: "team",
    //   params: { name: route.params.name },
    // });
  } catch (error) {
    console.log(error);

    $q.notify({
      type: "negative",
      message: "Какие-то из пользователей уже были приглашены или состоят в команде!",
    });
  }
};

const filteringSubjects = async (filter) => {
  if (filter === "name" && (filters.value.name === "" || !filters.value.name.trim())) {
    filteredSubjects.value = null;
    return;
  }

  filteredSubjects.value = await userApi.refetchPaginateSubjects({
    page: 1,
    perPage: 100,
    where: filters.value.name
      ? { column: "fullname", operator: "FTS", value: filters.value.name }
      : null,
    is_invite: !route.query.space,
    is_team: route.query.space,
    space_id: route.query.space,
  });

  if (filters.value.speciality)
    filteredSubjects.value = filteredSubjects.value.filter(
      (subject) =>
        subject.speciality1?.name === filters.value.speciality.label ||
        subject.speciality1 === filters.value.speciality.label
    );
};

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
