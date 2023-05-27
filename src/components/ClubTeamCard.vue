<template>
  <q-card
    v-if="isShowCard"
    class="team card-shadow rounded-borders-10 c-pa-32 cursor-pointer column no-wrap justify-between"
    @click="to()"
  >
    <section class="flex no-wrap">
      <q-card-section class="flex flex-center">
        <q-avatar class="avatar-108">
          <q-img :src="team.avatar || '/assets/images/preloaders/default-avatar.svg'" />
        </q-avatar>
      </q-card-section>

      <q-card-section class="c-ml-24">
        <h4 class="text-subtitle3 text-violet7">
          {{ team.name }}
        </h4>

        <pre>{{ team.space }}</pre>

        <p class="text-body2 c-mt-12 text-gray7">
          {{ team.description }}
        </p>

        <c-button color="negative" label="Удалить" @click.stop="teamDelete" />
      </q-card-section>
    </section>

    <q-card-section v-if="application">
      <c-application-controls
        :application="application"
        :incoming="incoming"
        @accept="$emit('accept', application)"
        @status-calc="hideCard"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";

import CApplicationControls from "./ClubApplicationControls.vue";
import CButton from "src/components/ClubButton.vue";

import { useTeamDelete } from "src/use/teams";

const currentUser = inject("currentUser");
const router = useRouter();

const { deletingTeam, deleteTeam } = useTeamDelete();

const isShowCard = ref(true);

const { team, application, incoming } = defineProps({
  team: Object,
  application: Object,
  incoming: Boolean,
});

const to = async () => {
  router.push({
    name: "teamSpace",
    params: { id: team.id },
    query: { name: team.name, space: team.space },
  });
};

const teamDelete = async () => await deleteTeam(team, currentUser.value.subject_id);

const hideCard = (status, application) => {
  console.log("app", status, application);
  if (incoming && status.label !== "Одобрена" && status.label !== "Отклонена")
    isShowCard.value = false;
};
</script>

<style lang="scss" scoped>
.team {
  max-height: 275px;
  height: 275px;

  & .q-card__section {
    padding: 0;

    p {
      margin-bottom: 0;
    }
  }
}

.content {
  height: 100%;
}

.team-btn {
  width: 115px;
  height: 40px;
}
</style>
