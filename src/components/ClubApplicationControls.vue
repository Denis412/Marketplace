<template>
  <footer class="flex justify-between items-center c-mt-32">
    <section class="text-body2">{{ statusObject.updated_at }}</section>

    <section class="flex items-center q-gutter-x-md text-body1">
      <div :style="{ color: statusObject.property?.color }">
        {{ statusObject.property?.label }}
      </div>

      <c-button
        v-if="!incoming || statusObject.property?.label === 'Одобрена'"
        background
        :label="labelButton"
        @click.stop="cancelApplication"
      />

      <div v-else class="flex q-gutter-x-md">
        <c-button background label="Принять" @click.stop="acceptApplication" />

        <c-button outline label="Отклонить" @click.stop="cancelApplication" />
      </div>
    </section>
  </footer>
</template>

<script setup>
import { computed } from "vue";

import CButton from "./ClubButton.vue";
import propertyApi from "src/sdk/property";
import applicationApi from "src/sdk/application";
import teamApi from "src/sdk/team";
import userApi from "src/sdk/user";

const { application, incoming } = defineProps({
  application: Object,
  incoming: Boolean,
});

const { result: statusProperty, loading } = propertyApi.queryPropertyById({
  id: process.env.APPLICATION_STATUS_PROPERTY,
});

const statusObject = computed(() => {
  let property = statusProperty.value?.property.meta.options.find(
    (option) => option.id === application.status
  );

  const lastTimeUpdated = new Date(statusProperty.value?.property.updated_at);

  return { property, updated_at: lastTimeUpdated.toLocaleDateString() };
});
const labelButton = computed(() =>
  statusObject.value.property?.label === "В ожидании" ? "Отменить" : "Скрыть"
);

const acceptApplication = async () => {
  console.log(application);

  try {
    if (!incoming)
      await applicationApi.update(application.id, {
        status: process.env.APPLICATION_STATUS_APPROVED,
      });
    else
      await teamApi.acceptUser({
        team_id: application.team.id,
        space_id: application.team.space,
        data: {
          name: application.subject.fullname.first_name,
          surname: application.subject.fullname.last_name,
          email: application.subject.email.email,
          id: application.subject.id,
          application_id: application.id,
        },
      });
  } catch (error) {
    if (!incoming) {
      console.log(error);
    } else {
      $q.notify({
        type: "negative",
        message: "Пользователь уже состоит в команде!",
      });
    }
  }
};

const cancelApplication = async () => {
  await applicationApi.deleteById(application.id);

  await userApi.refetchPaginateSubjects({
    page: 1,
    perPage: 1,
    where: {
      column: "user_id",
      operator: "EQ",
      value: JSON.parse(localStorage.getItem("user-data")).user_id,
    },
    is_my_teams: true,
  });

  await teamApi.refetchPaginateTeams({
    page: 1,
    perPage: 1,
    where: {
      column: "name",
      operator: "EQ",
      value: application.team.name,
    },
  });
};
</script>

<style scoped lang="scss"></style>
