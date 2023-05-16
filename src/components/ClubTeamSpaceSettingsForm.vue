<!-- Компонент формы редактирования командного пространства -->
<template>
  <q-form @submit="updateTeamData" class="teamSettingForm c-mb-32">
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
            >
              <template #append>
                <q-icon
                  name="img:/icons/editBlack.svg"
                  class="create-form-icon cursor-pointer"
                >
                </q-icon>
              </template>
            </q-input>
          </template>
        </c-label-control>
      </section>
    </div>

    <c-team-settings-buttons />
  </q-form>
</template>

<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";

import { useValidators } from "src/use/validators";
import { useTeamUpdate } from "src/use/teams";

import CLabelControl from "./ClubLabelControl.vue";
import CTeamSettingsButtons from "./ClubTeamSettingsButtons.vue";

const { maxLength, telegramm, minLength } = useValidators();
const { result: teamData, updateTeam } = useTeamUpdate();

const currentTeam = inject("currentTeam");
const telegram_chat_id = ref(currentTeam.value.telegram_chat_id);
const router = useRouter();

const updateTeamData = async () => {
  await updateTeam(currentTeam.value.id, {
    telegram_chat_id: telegram_chat_id.value,
  });

  router.push({
    name: "team",
    params: { name: teamData.value.name },
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
