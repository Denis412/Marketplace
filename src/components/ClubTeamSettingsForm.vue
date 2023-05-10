<!-- Компонент формы редактирования команды -->
<template>
  <q-form class="teamSettingForm c-mb-32">
    <div class="flex no-wrap teamSettingForm-section c-pb-32">
      <section class="large-avatar relative-position c-mr-32">
        <q-avatar class="large-avatar">
          <q-img src="/src/assets/previews/avatar-140.png" />
        </q-avatar>

        <div
          class="absolute flex flex-center create-form-avatar-create cursor-pointer"
        >
          <q-img
            src="/src/assets/icons/edit.svg"
            class="create-form-icon"
            @click="triggerInput"
          >
            <q-menu class="w-max-content">
              <q-list separator>
                <q-item
                  clickable
                  class="flex no-wrap items-center text-caption1 text-black"
                >
                  <q-item-section avatar class="teamSettingForm-icon-section">
                    <q-icon
                      name="img:/src/assets/icons/Plus.svg"
                      class="teamSettingForm-icon"
                    />
                  </q-item-section>

                  <q-item-section>Добавить изображение</q-item-section>
                </q-item>

                <q-item
                  clickable
                  class="flex no-wrap items-center text-caption1 text-black"
                >
                  <q-item-section avatar class="teamSettingForm-icon-section">
                    <q-icon
                      name="img:/src/assets/icons/delete.svg"
                      class="teamSettingForm-icon"
                    />
                  </q-item-section>

                  <q-item-section>Удалить изображение</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-img>
        </div>
      </section>

      <section class="flex no-wrap">
        <c-label-control label="Название команды">
          <template #control>
            <q-input
              v-model="text"
              placeholder="Название команды"
              class="c-input-outline teamSettingForm-input-small"
              outlined
            >
              <template #append>
                <q-icon
                  name="img:/src/assets/icons/editBlack.svg"
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
              v-model="text"
              placeholder="Описание команды"
              class="c-textarea-outline teamSettingForm-input"
              outlined
              autogrow
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
              v-model="text"
              placeholder="Введите ссылку"
              class="c-input-outline teamSettingForm-input"
              outlined
            >
              <template #append>
                <q-icon
                  name="img:/src/assets/icons/editBlack.svg"
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
                v-model="text"
                placeholder="Введите название работы"
                class="c-input-outline teamSettingForm-input-small"
                outlined
              >
                <template #append>
                  <q-icon
                    name="img:/src/assets/icons/editBlack.svg"
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
import CInput from "./ClubInput.vue";
import CLabelControl from "./ClubLabelControl.vue";
import CButton from "src/components/ClubButton.vue";
import CTeamSettingsButtons from "./ClubTeamSettingsButtons.vue";

import { ref, inject, provide } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

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
</style>