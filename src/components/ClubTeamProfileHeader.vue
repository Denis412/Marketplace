<template>
  <!-- <pre>{{ currentTeam }}</pre> -->
  <q-card flat class="header-wrapper w-100p">
    <q-toolbar class="absolute flex justify-end">
      <c-popup-team-actions style="z-index: 10" />
    </q-toolbar>

    <q-card-section class="row no-wrap c-mx-64 c-mt-64 c-mb-40">
      <q-avatar class="large-avatar">
        <q-img :src="currentTeam.avatar || '/assets/images/preloaders/default-avatar.svg'" />
      </q-avatar>

      <section class="c-ml-32 text-information__wrapper">
        <h4 class="text-subtitle1 text-violet6">{{ currentTeam.name }}</h4>

        <section class="block gray-scrollbar decription__wrapper w-100p">
          <p
            class="text-subtitle5 q-mt-sm ellipsis"
            v-if="fullDes && currentTeam.description.length > 121"
          >
            {{ currentTeam.description.substr(0, 121) }}...
          </p>

          <p v-else class="text-subtitle5 q-mt-sm long-text">
            {{ currentTeam.description }}
          </p>
        </section>

        <div
          class="text-violet4 text-body1 q-mt-sm btn-text-align cursor-pointer"
          @click="fullDes = !fullDes"
          v-if="currentTeam.description.length > 121"
        >
          {{ !fullDes ? "Cкрыть" : "Подробнее" }}
        </div>

        <q-list v-if="currentTeam?.directions" class="row c-mt-32 q-gutter-sm text-caption1">
          <c-chip
            v-for="direction in currentTeam?.directions"
            :key="direction.name"
            gradient-outline
            :label="direction"
          />
        </q-list>

        <div class="flex items-center c-mt-32 header-controls">
          <c-button
            v-if="!isMember && !isOwner && isProfile"
            background
            :disable="isInvited"
            :label="!isInvited ? 'Подать заявку' : 'Заявка отправлена'"
            class="text-body2"
            @click="applicationSend"
          />

          <div v-if="sendingApplication" class="text-body2">Отправляем заявку...</div>

          <q-checkbox
            dense
            v-if="!isProfile && isOwner"
            v-model="isReady"
            @update:model-value="updateTeamStatus"
            left-label
            label="Готовность к заказам"
            class="c-mr-32 c-checkbox-violet-6 text-liner-button text-body1 c-checkbox-label-pr-md c-checkbox-rounded"
          />

          <a
            v-if="isMember || isOwner"
            :href="isProfile ? '#' : '#'"
            class="text-liner-button link text-body1"
          >
            <a :href="currentTeam.leader_telegram_chat_id" v-if="isProfile">Лидер команды</a>
            <a :href="currentTeam.telegram_chat_id" v-else>Чат команды</a>

            <q-icon
              class="text-subtitle4 q-ml-sm"
              name="img:/assets/icons/socials/telegram-gradient.svg"
            />
          </a>
        </div>
      </section>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed, inject, ref } from "vue";
import { useRouter } from "vue-router";

// import { useTeamApplication, useTeamUpdate } from "src/use/teams";

import TeamService from "src/sevices/TeamService";

import CButton from "src/components/ClubButton.vue";
import CChip from "./ClubChip.vue";
import CPopupTeamActions from "./ClubPopupTeamActions.vue";
// import teamApi from "src/sdk/team";

const { isProfile } = defineProps({
  isProfile: Boolean,
});

const router = useRouter();
// const { updateTeam } = useTeamUpdate();

const currentUser = inject("currentUser");
const currentTeam = inject("currentTeam");

const sendingApplication = ref(false);
const isReady = ref(currentTeam.value.ready_for_orders ?? false);
const isOwner = inject("isOwner");
const isMember = inject("isMember");
const fullDes = ref(true);

const isInvited = computed(() =>
  currentTeam.value?.applications.some(
    (application) => application.subject.id === currentUser.value.subject_id
  )
);

const updateTeamStatus = async () => {
  await TeamService.updateTeam({ ready_for_orders: isReady.value }, { id: currentTeam.value.id });
};

const applicationSend = async () => {
  sendingApplication.value = true;

  await TeamService.sendTeamApplication({
    name: currentUser.value.first_name,
    subject: {
      [process.env.SUBJECT_TYPE_ID]: currentUser.value.subject_id,
    },
    team: {
      [process.env.TEAM_TYPE_ID]: currentTeam.value.id,
    },
    status: process.env.APPLICATION_STATUS_PENDING,
    sender: "subject",
    sender_id: currentUser.value.subject_id,
    target: currentTeam.value,
  });

  sendingApplication.value = false;
};
</script>

<style scoped lang="scss">
.header-wrapper {
  .q-card__section {
    padding: 0;
  }
}

.popup {
  top: 10px !important;
  right: 10px !important;

  &-item {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
}

.text-information__wrapper {
  width: 90%;
}

.decription__wrapper {
  max-height: 100px;
}

.decription__wrapper {
  width: 90%;
  max-height: 100px;
}

.long-text {
  word-wrap: break-word !important;
}

.text-description {
  max-width: 100px;
  text-overflow: ellipsis;
}

.header-controls {
  p {
    margin: 0;
  }
}

.btn-text-align {
  padding-left: 0;
}
</style>
