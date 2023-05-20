<template>
  <q-page class="c-py-64 c-px-32">
    <h4 class="text-h3">Профиль пользвоателя</h4>

    <section class="c-ml-96 c-mt-64">
      <h4 class="text-h4">Основная информация</h4>

      <q-form class="c-mt-40">
        <c-label-control label="Никнейм">
          <template #control>
            <q-input
              outlined
              v-model="form.nickname"
              @change="updateInfo('nickname', $event)"
              class="c-input-outline"
              placeholder="Придумайте никнейм"
            />
          </template>
        </c-label-control>

        <c-label-control label="Статус">
          <template #control>
            <q-select
              no-caps
              borderless
              v-model="form.status"
              :options="currentUserStatuses"
              @update:model-value="updateInfo('status', $event)"
              class="club-dropdown"
              dropdown-icon="img:/assets/icons/arrow/arrow-down-grey.svg"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey"> Ничего не найдено </q-item-section>
                </q-item>
              </template>
            </q-select>
          </template>
        </c-label-control>

        <c-label-control label="Telegram">
          <template #control>
            <q-input
              outlined
              v-model="form.telegram"
              @change="updateInfo('telegram_chat_id', $event)"
              class="c-input-outline"
              placeholder="Придумайте никнейм"
            />
          </template>
        </c-label-control>

        <c-label-control label="Специальность">
          <template #control>
            <q-select
              no-caps
              borderless
              v-model="form.speciality"
              :options="currentSpecialitites"
              @update:model-value="updateInfo('speciality', $event)"
              class="club-dropdown"
              dropdown-icon="img:/assets/icons/arrow/arrow-down-grey.svg"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey"> Ничего не найдено </q-item-section>
                </q-item>
              </template>
            </q-select>
          </template>
        </c-label-control>

        <c-label-control label="Компетенции">
          <template #control>
            <q-select
              no-caps
              borderless
              v-model="form.competencies"
              @update:model-value="updateInfo('competencies', $event)"
              class="club-dropdown"
              dropdown-icon="img:/assets/icons/arrow/arrow-down-grey.svg"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey"> Ничего не найдено </q-item-section>
                </q-item>
              </template>
            </q-select>
          </template>
        </c-label-control>

        <c-label-control label="О себе">
          <template #control>
            <q-input
              outlined
              v-model="form.about"
              @change="updateInfo('about', $event)"
              class="c-input-outline"
              type="textarea"
              placeholder="Расскажите о себе"
            />
          </template>
        </c-label-control>
      </q-form>
    </section>

    <div class="c-my-64 separator" />

    <section class="c-ml-96">
      <h4 class="text-h4">Резюме</h4>
    </section>

    <div class="c-my-64 separator" />

    <section class="c-ml-96">
      <h4 class="text-h4">Портфолио</h4>

      <q-list class="c-gutter-y-64">
        <c-item-portfolio
          v-for="(item, index) in items"
          :key="item.key"
          :item="item"
          :position="index + 1"
          :right-side="index % 2 !== 0"
        />
      </q-list>
    </section>
  </q-page>
</template>

<script setup>
import { computed, inject, ref } from "vue";
import { useUserStore } from "src/stores/user";

import userApi from "src/sdk/user";
import specilalityApi from "src/sdk/speciality";
import userStatusApi from "src/sdk/user-status";

import CLabelControl from "src/components/ClubLabelControl.vue";
import CItemPortfolio from "src/components/ClubItemPortfolio.vue";

const currentUser = inject("currentUser");

const { result: specialities } = specilalityApi.paginateSpeciality({ page: 1, perPage: 50 });
const { result: userStatuses } = userStatusApi.paginateUserStatuses({ page: 1, perPage: 50 });

const currentSpecialitites = computed(() =>
  specialities.value?.paginate_speciality.data.map((speciality) => ({
    label: speciality.name,
    value: speciality.id,
  }))
);

const currentUserStatuses = computed(() =>
  userStatuses.value?.paginate_user_status.data.map((status) => ({
    label: status.name,
    value: status.id,
  }))
);

const form = ref({
  nickname: currentUser.value.nickname,
  status: currentUser.value.status,
  telegram: currentUser.value.telegram_chat_id,
  speciality: currentUser.value.speciality1,
  competencies: currentUser.value.competencies,
  about: currentUser.value.about,
  resume: currentUser.value.resume_link,
  artefacts: currentUser.value.artefacts,
});

const updateInfo = async (property_name, value) => {
  let input;

  if (property_name === "status") {
    input = {
      status: {
        [process.env.USER_STATUS_TYPE_ID]: value.value,
      },
    };
  } else if (property_name === "speciality") {
    input = {
      speciality1: {
        [process.env.SPECIALITY_TYPE_ID]: value.value,
      },
    };
  } else {
    input = {
      [property_name]: value,
    };
  }

  useUserStore().SET_PROP(property_name, value);

  await userApi.update(currentUser.value.subject_id, input);
};
</script>

<style scoped lang="scss"></style>
