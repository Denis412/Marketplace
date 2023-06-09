<template>
  <q-form class="teamSettingForm c-mb-32">
    <div class="flex teamSettingForm-section c-mb-40 c-pb-32">
      <section class="flex no-wrap">
        <c-label-control label="Ссылка на чат команды в Telegram">
          <template #control>
            <q-input
              v-model="telegram_chat_id"
              placeholder="https://t.me/..."
              class="c-input-outline teamSettingForm-input"
              outlined
              :rules="[minLength(18), maxLength(45), telegramm]"
              @change="updateTeamData"
            />
          </template>
        </c-label-control>
      </section>
    </div>
  </q-form>
</template>

<script setup>
import { ref, inject } from "vue";
import { useRouter, useRoute } from "vue-router";

import { useValidators } from "src/use/validators";

import CLabelControl from "./ClubLabelControl.vue";
import CTeamSettingsButtons from "./ClubTeamSettingsButtons.vue";

import TeamService from "src/sevices/TeamService";

const { maxLength, telegramm, minLength } = useValidators();

const currentTeam = inject("currentTeam");
const telegram_chat_id = ref(currentTeam.value.telegram_chat_id);
const router = useRouter();
const route = useRoute();

const updateTeamData = async () => {
  const { result: teamData } = await TeamService.updateTeam(
    { telegram_chat_id: telegram_chat_id.value },
    { id: currentTeam.value.id }
  );

  console.log("team", teamData.value);

  router.push({
    name: "teamSpace",
    params: { id: route.params.id },
    query: { name: teamData.value.name, space: route.query.space },
  });
};
</script>

<style lang="scss" scoped>
.teamSettingForm {
  max-width: 640px;
  width: 100%;

  &-section {
    border-bottom: 1px solid #f4f4f4;
  }

  &-input {
    max-width: 640px;
    width: 640px;
  }

  &-input-small {
    max-width: 468px;
    width: 468px;
  }
}

.create-form {
  max-width: 544px;
  width: 544px;
  min-height: 544px;

  &-icon {
    fill: rgb(0, 0, 0);
    width: 18px;
  }

  &-avatar {
    &-create {
      bottom: 15px;
      right: -8px;
      width: 40px;
      height: 40px;
      background: $liner-button;
      border-radius: 50%;
      border: 2px solid #ffffff;
    }
  }
}
</style>
