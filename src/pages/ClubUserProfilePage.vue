<template>
  <q-page class="c-px-32 c-py-64">
    <h3 class="text-h3">Профиль пользователя</h3>

    <div class="c-mt-32 separator" />

    <c-section-main-profile-user-information />

    <section class="c-mt-32 c-py-32 c-px-96 competencies-section">
      <div class="text-subtitle4">Компетенции</div>

      <div class="q-mt-lg">
        <q-list class="row q-gutter-x-sm q-gutter-y-md">
          <c-chip
            v-for="competence in currentUser.competencies"
            :key="competence.id"
            gradient-outline
            :label="competence.name"
          />
        </q-list>
      </div>
    </section>

    <section class="about row c-mt-32">
      <div class="col">
        <div class="c-py-32 c-pl-32 c-mt-32 about-information">
          <div class="c-pr-32 gray-scrollbar h-100p">
            <div class="q-gutter-y-lg">
              <div class="text-subtitle4">О себе</div>

              <div class="text-body2 text-gray6">
                {{ currentUser.about }}
              </div>
            </div>
          </div>
        </div>

        <div class="c-pa-32 c-mt-32 about-resume">
          <div class="q-gutter-y-lg">
            <div class="text-subtitle4">Резюме</div>

            <div class="text-body2 text-gray6">С резюме можно ознакомиться здесь:</div>

            <div>
              <a href="#" class="text-body2">
                {{ currentUser.resume_link }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="col flex flex-center">
        <q-img class="about-image" src="/assets/images/account-settings-page/about-profile.svg" />
      </div>
    </section>

    <!-- <div class="c-mt-64 c-mb-64 separator" />

    <section>
      <h4 class="text-h4 c-pb-64">Портфолио</h4>

      <q-list class="c-gutter-y-64">
        <c-item-portfolio
          v-for="(item, index) in items"
          :key="item.key"
          :item="item"
          :position="index + 1"
          :right-side="index % 2 !== 0"
        />
      </q-list>
    </section> -->
  </q-page>
</template>

<script setup>
import { inject, ref } from "vue";

import CChip from "src/components/ClubChip.vue";
import CSectionMainProfileUserInformation from "src/components/ClubSectionMainProfileUserInformation.vue";
import CItemPortfolio from "src/components/ClubItemPortfolio.vue";
import userApi from "src/sdk/user";

const currentUser = inject("currentUser");

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

// onMounted(async () => {
//   console.log("hello");
//   await userApi.refetchPaginateSubjects({
//     page: 1,
//     perPage: 1,
//     where: {
//       column: "id",
//       operator: "EQ",
//       value: currentUser.value.subject_id,
//     },
//   });
// });
</script>

<style scoped lang="scss">
.competencies-section {
  min-height: 280px;

  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
}

.about {
  &-information {
    max-height: 315px;
    height: 315px;

    background: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 24px;
  }

  &-image {
    max-width: 355px;
  }

  &-resume {
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 24px;
  }
}
</style>
