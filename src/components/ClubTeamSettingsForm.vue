<!-- Компонент формы редактирования команды -->
<template>
  <q-form  @submit="updateTeamData" class="teamSettingForm c-mb-32">
    <div class="flex no-wrap teamSettingForm-section c-pb-32">
      <section class="large-avatar relative-position c-mr-32">
        <q-avatar class="large-avatar">
          <q-img :src="form.avatar" />
        </q-avatar>

        <div
          class="absolute flex flex-center create-form-avatar-create cursor-pointer"
        >
          <q-img
            src="/assets/icons/pen/edit-white.svg"
            class="create-form-icon"
          >
            <q-menu class="w-max-content">
              <q-list separator>
                <q-item
                  clickable
                  class="flex no-wrap items-center text-caption1 text-black"
                  disable
                  @click="addAvatar"
                >
                  <q-item-section avatar class="teamSettingForm-icon-section">
                    <q-icon
                      name="img:/assets/icons/plus/plus-black.svg"
                      class="teamSettingForm-icon"
                    />
                  </q-item-section>

                  Добавить фото
                </q-item>

                <q-item
                  clickable
                  v-ripple
                  class="flex no-wrap items-center text-caption1 text-black"
                  disable
                  @click="deleteAvatar"
                >
                  <q-item-section avatar class="teamSettingForm-icon-section">
                    <q-icon
                      name="img:/assets/icons/delete/delete-black.svg"
                      class="teamSettingForm-icon"
                    />
                  </q-item-section>

                  Удалить фото
                </q-item>
              </q-list>
            </q-menu>
          </q-img>
        </div>
      </section>

      <section>
        <q-file
          class="q-file"
          outlined
          v-model="upload_img"
          accept=".png,.jpg"
          ref="uploadFile"
          @update:model-value="updateFile()"
        />
      </section>

      <section class="flex no-wrap">
        <c-label-control label="Название команды">
          <template #control>
            <q-input
              v-model="form.name"
              placeholder="Название команды"
              class="c-input-outline teamSettingForm-input-small"
              outlined
              :rules="[required, minLength(2), maxLength(30)]"
            >
              <template #append>
                <q-icon
                  name="img:/assets/icons/pen/edit-black.svg"
                  class="create-form-icon cursor-pointer"
                >
                </q-icon>
              </template>
            </q-input>
          </template>
        </c-label-control>
      </section>
    </div>

    <div class="flex teamSettingForm-section c-pb-32">
      <section class="flex no-wrap">
        <c-label-control label="Описание">
          <template #control>
            <q-input
              v-model="form.description"
              placeholder="Описание команды"
              class="c-textarea-outline teamSettingForm-input"
              outlined
              autogrow
              :rules="[required, maxLength(1000)]"
            />
          </template>
        </c-label-control>
      </section>
    </div>

    <div class="flex teamSettingForm-section c-pb-32">
      <section class="flex no-wrap">
        <c-label-control label="Ссылка на Telegram лидера">
          <template #control>
            <q-input
              v-model="form.telegram_chat_id"
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
                  name="img:/assets/icons/pen/edit-black.svg"
                  class="create-form-icon cursor-pointer"
                >
                </q-icon>
              </template>
            </q-input>
          </template>
        </c-label-control>
      </section>
    </div>

    <div class="flex teamSettingForm-section c-pb-32 c-mb-40">
      <section class="flex no-wrap">
        <c-label-control label="Виды работ">
          <template #control>
            <div class="flex">
              <q-input
                v-model="form.work_types"
                placeholder="Введите название работы"
                class="c-input-outline teamSettingForm-input-small"
                outlined
                :rules="[maxLength(30)]"
              >
                <template #append>
                  <q-icon
                    name="img:/assets/icons/pen/edit-black.svg"
                    class="create-form-icon cursor-pointer"
                  >
                  </q-icon>
                </template>
              </q-input>
              <c-button background size="lg" label="Добавить" class="c-ml-32" />
            </div>
          </template>
        </c-label-control>
        <!-- блок с добавленными видами -->
      </section>
    </div>
    <c-team-settings-buttons />
  </q-form>
</template>

<script setup>
import CLabelControl from "./ClubLabelControl.vue";
import CButton from "src/components/ClubButton.vue";
import CTeamSettingsButtons from "./ClubTeamSettingsButtons.vue";
import { ref, inject } from "vue";
import { useValidators } from "src/use/validators";
import { useRouter } from "vue-router";
import { useTeamUpdate } from "src/use/teams";

const { required, maxLength, minLength } = useValidators();
const { result: teamData, updateTeam } = useTeamUpdate();

const currentTeam = inject("currentTeam");
const upload_img = ref();
const uploadFile = ref();
const router = useRouter();

const form = ref({
  avatar:
    currentTeam.value?.avatar || "/assets/images/preloaders/default-avatar.svg",
  name: currentTeam.value?.name,
  description: currentTeam.value?.description,
  telegram_chat_id: currentTeam.value?.telegram_chat_id,
  work_types: "",
});

const updateFile = () => {
  if (Math.round(upload_img.value.size / Math.pow(1024, 2)) <= 10) {
    form.value.avatar = URL.createObjectURL(upload_img.value);
  } else {
    $q.notify("Максимальный вес картинки 10Mb!");
  }
};

const addAvatar = () => uploadFile.value.pickFiles();

const deleteAvatar = () =>
  (form.value.avatar = "/assets/images/preloaders/default-avatar.svg");

const updateTeamData = async () => {
  await updateTeam(currentTeam.value.id, {
    avatar: form.value.avatar,
    name: form.value.name,
    description: form.value.description,
    telegram_chat_id: form.value.telegram_chat_id,
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

  &-icon {
    width: 14px;
  }
  &-icon-section {
    min-width: 14px;
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

.q-file {
  display: none;
}
</style>
