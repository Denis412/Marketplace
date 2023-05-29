<template>
  <q-page class="c-pa-32">
    <header>
      <h3 class="text-h3" v-if="!route.query.customer">Пригласить участника</h3>
      <h3 class="text-h3" v-else>Пригласить заказчика</h3>
    </header>

    <main class="q-mt-md">
      <section class="flex items-center c-gutter-x-32">
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
          class="club-dropdown text-caption1 text-black"
          v-model="filters.speciality"
          @update:model-value="filteringSubjects('speciality')"
          :options="selectSpecialitites"
          dropdown-icon="img:/assets/icons/arrow/arrow-down-grey.svg"
        >
          <template #prepend v-if="!filters.speciality">
            <span class="text-caption1 text-black">Специальность</span>
          </template>
        </q-select>
      </section>

      <section class="row c-mt-24">
        <section class="col">
          <div class="subjects-wrapper gray-scrollbar">
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

          <div class="q-mt-md q-gutter-x-md text-body1 rel-index-0">
            <c-button
              :disable="!selectedSubjects.length"
              background
              label="Пригласить"
              @click="inviteSubjects"
            />

            <c-button outline label="Отменить" @click="cancel" />
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

            <div class="text-body1 rel-index-0">
              <c-button outline label="Сбросить" class="q-mt-md" @click="resetSubjects" />
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
import { computed, inject, provide, ref, watch } from "vue";

import specilalityApi from "src/sdk/speciality";
import userApi from "src/sdk/user";
import teamApi from "src/sdk/team";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useTeamApplication } from "src/use/teams";
import { useProjectApplication } from "src/use/projects";
import projectApi from "src/sdk/project";

const currentUser = inject("currentUser");

const { result, loading: sending, sendApplication } = useTeamApplication();
const {
  result: sendedProjectApplication,
  loading: sendingProjectAppliaction,
  sendApplication: sendProjectApplication,
} = useProjectApplication();

const router = useRouter();
const route = useRoute();
const $q = useQuasar();

const selectedSubjects = ref([]);
const filteredSubjects = ref(null);
const filters = ref({
  name: "",
  speciality: "",
});

const { result: team } = teamApi.paginateTeams({
  page: 1,
  perPage: 1,
  where: {
    column: "id",
    operator: "EQ",
    value: route.params.id,
  },
});

const { result: project } = projectApi.paginateProject({
  page: 1,
  perPage: 1,
  where: {
    column: "id",
    operator: "EQ",
    value: route.params.id,
  },
  space_id: route.query.space,
});

const { result: projectSubjects } = userApi.paginateSubjects({
  page: 1,
  perPage: 100,
  is_team: true,
  space_id: route.query.space,
});

const { result: allSpecialities } = specilalityApi.paginateSpeciality({
  page: 1,
  perPage: 100,
});

const { result: allSubjects } = userApi.paginateSubjects({
  page: 1,
  perPage: 100,
  is_invite: true,
  where: {
    column: "id",
    operator: "NEQ",
    value: currentUser.value.subject_id,
  },
});

const selectSpecialitites = computed(() =>
  allSpecialities.value?.paginate_speciality.data.map((speciality) => ({
    label: speciality.name,
    value: speciality.id,
  }))
);

const showSubjects = computed(
  () => filteredSubjects.value ?? (!route.query?.project ? teamFilter.value : projectFilter.value)
);

const teamFilter = computed(() => {
  return allSubjects.value?.paginate_subject.data.filter((subject) => {
    return !team.value?.paginate_team.data[0]?.members.some((member) => member.id === subject.id);
  });
});

const projectFilter = computed(() => {
  return projectSubjects.value?.paginate_subject.data.filter((subject) => {
    return (
      !project.value?.paginate_project.data[0]?.members.some(
        (member) => member.email.email === subject.email.email
      ) &&
      !project.value?.paginate_project.data[0]?.customers.some(
        (customer) => customer.email.email === subject.email.email
      ) &&
      project.value?.paginate_project.data[0]?.leader?.email.email !== subject.email.email
    );
  });
});

provide("selectedSubjects", selectedSubjects);

const inviteSubjects = async () => {
  if (!selectedSubjects.value.length) return;

  try {
    if (route.query.project) {
      for (let subject of selectedSubjects.value) {
        await sendProjectApplication({
          subject: subject,
          project_name: route.query.name,
          project_id: route.params.id,
          is_customer: route.query.customer,
          space_id: route.query.space,
        });
      }
    } else {
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
          space: team.value.paginate_team.data[0].space,
          sender_id: team.value.paginate_team.data[0].id,
          target: subject,
        });
      }

      router.push({
        name: "teamSpace",
        params: { ...route.params },
        query: { ...route.query },
      });
    }

    selectedSubjects.value = [];
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

  if (!route.query.space) filteredSubjects.value = teamFilter.value;
  else filteredSubjects.value = projectFilter.value;

  filteredSubjects.value = filteredSubjects.value.filter(
    (subject) =>
      subject.fullname.first_name.includes(filters.value.name) ||
      subject.fullname.middle_name.includes(filters.value.name) ||
      subject.fullname.last_name.includes(filters.value.name)
  );

  // filteredSubjects.value = await userApi.refetchPaginateSubjects({
  //   page: 1,
  //   perPage: 100,
  //   where: filters.value.name
  //     ? { column: "fullname", operator: "FTS", value: filters.value.name }
  //     : null,
  //   is_invite: !route.query.space,
  //   is_team: route.query.space,
  //   space_id: route.query.space,
  // });

  if (filters.value.speciality)
    filteredSubjects.value = filteredSubjects.value.filter(
      (subject) =>
        subject.speciality1?.name === filters.value.speciality.label ||
        subject.speciality1 === filters.value.speciality.label
    );
};

const resetSubjects = () => (selectedSubjects.value = []);

const cancel = () => {
  if (route.query.project)
    router.push({
      name: "project",
      params: { ...route.params },
      query: { ...route.query },
    });
  else
    router.push({
      name: "teamSpace",
      params: { ...route.params },
      query: { ...route.query },
    });
};
</script>

<style scoped lang="scss">
.search-input {
  width: 450px;
}

.c {
  background: $violet-4;
}

.subjects-wrapper {
  max-height: 532px;

  padding: 24px;
  background: white;
  box-shadow: 0px 29px 12px rgba(0, 0, 0, 0.01), 0px 16px 10px rgba(0, 0, 0, 0.05),
    0px 7px 7px rgba(0, 0, 0, 0.09), 0px 2px 4px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1) !important;
  border-radius: 10px;
}

.selected-subjects-wrapper {
  height: max-content;

  border-radius: 10px;
  box-shadow: 0px 29px 12px rgba(0, 0, 0, 0.01), 0px 16px 10px rgba(0, 0, 0, 0.05),
    0px 7px 7px rgba(0, 0, 0, 0.09), 0px 2px 4px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1) !important;
  background: white;
}
</style>
