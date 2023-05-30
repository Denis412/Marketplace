<template>
  <q-page class="c-py-64 c-px-32">
    <h4 class="text-h3">Профиль пользователя</h4>

    <section class="c-mt-64">
      <h4 class="text-h4">Основная информация</h4>

      <q-form class="c-mt-40">
        <section class="row q-gutter-x-md">
          <div class="col c-gutter-y-32">
            <c-label-control label="Никнейм" class="control">
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

            <c-label-control label="Telegram" class="control">
              <template #control>
                <q-input
                  outlined
                  v-model="form.telegram"
                  placeholder="https://t.me/"
                  @change="updateInfo('telegram_chat_id', $event)"
                  :rules="[isTelegramUrl]"
                  class="c-input-outline"
                />
              </template>
            </c-label-control>

            <c-label-control label="Специальность" class="control">
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

            <c-label-control label="Компетенции" class="w-100p">
              <template #control>
                <q-list class="flex q-gutter-sm">
                  <c-chip
                    v-for="competence in form.competencies"
                    :key="competence.id"
                    :label="competence.name"
                    gradient-outline
                    removed
                    @remove="deleteCompetence"
                  />
                </q-list>

                <q-select
                  no-caps
                  borderless
                  v-model="form.current_competence"
                  :options="currentCompetencies"
                  @update:model-value="updateInfo('competencies', $event)"
                  class="club-dropdown control q-mt-md"
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

            <c-label-control label="О себе" class="control c-mt-32 w-100p">
              <template #control>
                <q-input
                  outlined
                  v-model="form.about"
                  @change="updateInfo('about', $event)"
                  class="c-input-outline c-input-area-mh about-area__wrapper gray-scrollbar-input"
                  type="textarea"
                  autogrow
                  placeholder="Расскажите о себе"
                />
              </template>
            </c-label-control>
          </div>

          <div class="column no-wrap col">
            <c-label-control label="Статус" class="control">
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

            <div class="flex flex-center profile-image__wrapper">
              <q-img
                class="profile-image"
                src="/assets/images/account-settings-page/profile-man.svg"
              />
            </div>
          </div>
        </section>
      </q-form>
    </section>

    <div class="c-my-64 separator" />

    <section class="row">
      <div class="col q-gutter-y-lg">
        <h4 class="text-h4">Резюме</h4>

        <q-input
          outlined
          v-model="form.resume"
          @change="updateInfo('resume_link', $event)"
          class="c-input-outline w-100p"
          placeholder="Введите URL-адрес резюме"
          :rules="[isUrl]"
        />
      </div>

      <div class="col flex flex-center">
        <q-img
          class="profile-image-folder"
          src="/assets/images/account-settings-page/profile-folder.svg"
        />
      </div>
    </section>

    <!-- <div class="c-my-64 separator" />

    <section class="c-gutter-y-64">
      <h4 class="text-h4 c-pt-64 c-ml-96">Портфолио</h4>

      <q-list class="c-gutter-y-64">
        <c-item-portfolio
          v-for="(item, index) in items"
          :key="item.key"
          :item="item"
          :position="index + 1"
          :right-side="index % 2 !== 0"
        />
      </q-list>

      <div class="flex justify-center">
        <q-btn
          flat
          no-caps
          outline
          size="lg"
          class="club-button-outline text-body1"
          label="Добавить"
        />
      </div>
    </section> -->
  </q-page>
</template>

<script setup>
import { computed, inject, ref } from "vue";
import { useUserStore } from "src/stores/user";
import { getFileName } from "src/utils/getFileName";
import { getFileSize } from "src/utils/getFileSize";

import userApi from "src/sdk/user";
import filesApi from "src/sdk/file";
import specilalityApi from "src/sdk/speciality";
import userStatusApi from "src/sdk/user-status";

import CLabelControl from "src/components/ClubLabelControl.vue";
import CItemPortfolio from "src/components/ClubItemPortfolio.vue";
import CChip from "src/components/ClubChip.vue";
import { useValidators } from "src/use/validators";
import competenceApi from "src/sdk/competence";
import { useQuasar } from "quasar";

const { isTelegramUrl, isUrl } = useValidators();

const $q = useQuasar();

const currentUser = inject("currentUser");

const { result: specialities } = specilalityApi.paginateSpeciality({ page: 1, perPage: 50 });
const { result: competencies } = competenceApi.paginateCompetencies({ page: 1, perPage: 50 });
const { result: userStatuses } = userStatusApi.paginateUserStatuses({ page: 1, perPage: 50 });

const currentSpecialitites = computed(() =>
  specialities.value?.paginate_speciality.data.map((speciality) => ({
    label: speciality.name,
    value: speciality.id,
  }))
);

const currentCompetencies = computed(() =>
  competencies.value?.paginate_competence.data.map((competence) => ({
    label: competence.name,
    value: competence.id,
  }))
);

const currentUserStatuses = computed(() =>
  userStatuses.value?.paginate_user_status.data.map((status) => ({
    label: status.name,
    value: status.id,
  }))
);

// const selectResume = ref(null);
// const uploader = ref(null);

// const iconsSize = ref("24px");
const form = ref({
  nickname: currentUser.value.nickname,
  status: currentUser.value.status,
  telegram: currentUser.value.telegram_chat_id,
  speciality: currentUser.value.speciality1,
  competencies: currentUser.value.competencies,
  current_competence: "",
  about: currentUser.value.about,
  resume: currentUser.value.resume_link,
  artefacts: currentUser.value.artefacts,
});

const items = ref([
  {
    id: 1,
    title: "FRONT-END Разработка",
    content:
      "Front-end разработка — мое специализированное направление, в котором я создаю интерфейсы и пользовательский опыт для веб-сайтов и приложений. Я владею HTML, CSS и JavaScript, и использую эти языки для реализации красивого и функционального дизайна. Моя работа включает в себя создание адаптивных и интуитивно понятных интерфейсов и улучшение пользовательского взаимодействия.",
    image: "",
  },
  {
    id: 2,
    title: "ВЕБ-САЙТЫ",
    content:
      "В разделе Веб-сайты могу предоставить примеры моих разработанных веб-сайтов, которые отражают мою способность создавать эффективные и привлекательные онлайн-присутствия.",
    image: "",
  },
]);

// const pickFile = () => uploader.value.pickFiles();

const deleteCompetence = async (label) => {
  form.value.competencies = form.value.competencies.filter(
    (competence) => competence.name !== label
  );

  await userApi.update(currentUser.value.subject_id, {
    competencies: {
      [process.env.COMPETENCE_TYPE_ID]: form.value.competencies.map((competence) => competence.id),
    },
  });

  useUserStore().SET_PROP("competencies", form.value.competencies);
};

const updateInfo = async (property_name, value) => {
  let input;

  // console.log("updated prop", property_name, value);

  // if (property_name === "resume_link") {
  //   if (value === null) input = { [property_name]: null };
  //   else {
  //     const fileId = await filesApi.uploadFiles(value);

  //     const resumeFile = await filesApi.get(fileId);

  //     input = {
  //       resume_link: filesApi.getUrl(resumeFile[0]),
  //     };

  //     useUserStore().SET_PROP(property_name, value);
  //   }
  // }
  if (property_name === "status") {
    input = {
      status: {
        [process.env.USER_STATUS_TYPE_ID]: value.value,
      },
    };

    useUserStore().SET_PROP(property_name, value.label);
  } else if (property_name === "speciality") {
    input = {
      speciality1: {
        [process.env.SPECIALITY_TYPE_ID]: value.value,
      },
    };

    useUserStore().SET_PROP("speciality1", value.label);
  } else if (property_name === "competencies" && value.label && value.label.trim()) {
    console.log("value", value);
    if (form.value.competencies?.find((competence) => competence.name === value.label)) {
      $q.notify({
        type: "warning",
        message: "Такая компетенция уже есть в списке.",
      });
    } else {
      form.value.current_competence = "";
      form.value.competencies = [
        ...(form.value.competencies ?? []),
        { name: value.label, id: value.value },
      ];

      console.log("compete", form.value.competencies);

      input = {
        competencies: {
          [process.env.COMPETENCE_TYPE_ID]: form.value.competencies.map(
            (competence) => competence.id
          ),
        },
      };

      useUserStore().SET_PROP(property_name, form.value.competencies);
    }
  } else {
    input = {
      [property_name]: value,
    };

    useUserStore().SET_PROP(property_name, value);
  }

  console.log(input);

  await userApi.update(currentUser.value.subject_id, input);
};
</script>

<style scoped lang="scss">
.control {
  width: 80%;
}

.profile-image {
  max-width: 245px;

  &-folder {
    max-width: 290px;
  }

  &__wrapper {
    height: 100%;
  }
}

.about-area__wrapper {
  height: 252px;
  max-height: 252px;
}
</style>
