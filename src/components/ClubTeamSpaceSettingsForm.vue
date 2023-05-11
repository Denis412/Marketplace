<!-- Компонент формы редактирования командного пространства -->
<template>
  <section class="teamSettingForm c-mb-32">
    <div class="flex teamSettingForm-section c-mb-40 c-pb-32">
      <section class="flex no-wrap">
        <c-label-control label="Ссылка на чат команды в Telegram">
          <template #control>
            <q-input
              v-model="telegram_chat_id"
              placeholder="https://t.me/..."
              class="c-input-outline teamSettingForm-input"
              outlined
              :rules="[
                minLength(18),
                maxLength(45),
                (val) =>
                  val.slice(0, 13) === 'https://t.me/' ||
                  val.slice(0, 12) === 'http://t.me/' ||
                  'Неверный формат ссылки',
              ]"
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

    <c-team-settings-buttons @updateTeamData="updateTeamData" />
  </section>
</template>

<script setup>
import CInput from "./ClubInput.vue";
import CLabelControl from "./ClubLabelControl.vue";
import CButton from "src/components/ClubButton.vue";
import CTeamSettingsButtons from "./ClubTeamSettingsButtons.vue";
import teamApi from "src/sdk/team";
import { useRouter } from "vue-router";
import { ref, inject } from "vue";

const currentTeam = inject("currentTeam");
const telegram_chat_id = ref(currentTeam.value.telegram_chat_id);
const router = useRouter();

const updateTeamData = async () => {
  try {
    await teamApi.update(currentTeam.value.id, {
      telegram_chat_id: telegram_chat_id.value,
    });

    await teamApi.refetchPaginateTeams({
      page: 1,
      perPage: 1,
      where: {
        column: "name",
        operator: "EQ",
        value: currentTeam.value.name,
      },
    });
  } catch (error) {
    console.log(error);
  }

  router.go(-1);
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