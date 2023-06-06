<template>
  <q-page class="c-px-32 c-py-64">
    <h3 class="text-h3">Профиль пользователя</h3>

    <!-- <pre>{{ current ? currentUser : user }}</pre> -->

    <!--    <pre>gsd{{ user }}</pre>-->

    <div class="c-mt-32 separator" />

    <!--    <c-section-main-profile-user-information current v-if="user" :user="user" />-->

    <section class="main-information">
      <section class="main-information__top">
        <div class="main-information__top-container">
          <div class="main-information__top-container__absolute">
            <div class="main-information__avatar-container main-information__top-container-avatar">
              <div class="main-information__avatar-container">
                <q-avatar class="main-information__avatar">
                  <q-img
                    class="main-information__avatar-img"
                    :src="
                      route.query.current
                        ? currentUser.avatar
                        : user?.avatar ?? '/assets/images/preloaders/default-avatar.svg'
                    "
                  />
                </q-avatar>
              </div>

              <div class="main-information__text-container">
                <div class="main-information__text-container__half">
                  <span class="main-information__text-label">
                    {{ route.query.current ? currentUser.nickname : user?.nickname }}
                  </span>

                  <div
                    v-if="route.query.current"
                    class="main-information__text-label q-gutter-x-sm cursor-pointer q-ml-md"
                    @click="redirectSettings"
                  >
                    <q-icon :size="baseIconSize" name="img:/assets/icons/pen/edit-white.svg" />
                    <span class="text-caption2"> Редактировать профиль </span>
                  </div>
                </div>

                <div class="main-information__text-container__status">
                  <span>
                    Статус: {{ route.query.current ? currentUser.status : user?.status?.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="main-information__bottom">
        <div class="main-information__bottom-container">
          <div class="main-information__bottom-container__absolute text-body1 q-gutter-y-md">
            <h4 class="text-h4">
              {{ route.query.current ? currentUser.last_name : user?.fullname.last_name }}
              {{ route.query.current ? currentUser.first_name : user?.fullname.first_name }}
              {{ route.query.current ? currentUser.middle_name : user?.fullname.middle_name }}
            </h4>

            <div class="q-gutter-x-sm">
              <q-icon :size="baseIconSize" name="img:/assets/icons/geodata/geodata-violet-7.svg" />

              <span class="text-gray6"
                >{{ route.query.current ? currentUser.city : user?.city }}, Российская
                Федерация</span
              >
            </div>

            <div class="row text-gray7">
              <div class="col flex no-wrap items-center q-gutter-x-sm">
                <q-icon
                  :size="baseIconSize"
                  name="img:/assets/icons/calendar/calendar-violet-7.svg"
                />

                <span>{{ route.query.current ? currentUser.birthday : user?.birthday?.date }}</span>
              </div>

              <div class="col flex no-wrap items-center q-gutter-x-sm">
                <q-icon
                  v-if="currentUser.gender === 'Женский'"
                  :size="baseIconSize"
                  name="img:/assets/icons/sex/woman-sex-violet-7.svg"
                />

                <q-icon
                  v-else
                  :size="baseIconSize"
                  name="img:/assets/icons/sex/woman-sex-violet-7.svg"
                />

                <span>{{ route.query.current ? currentUser.gender : user?.gender }}</span>
              </div>
            </div>

            <div class="row text-gray7">
              <div class="col flex no-wrap items-center q-gutter-x-sm">
                <q-icon :size="baseIconSize" name="img:/assets/icons/person/person-violet-7.svg" />

                <span>{{
                  route.query.current ? currentUser.speciality1 : user?.speciality1.name
                }}</span>
              </div>

              <div class="col flex no-wrap items-center q-gutter-x-sm">
                <q-icon
                  :size="baseIconSize"
                  name="img:/assets/icons/socials/telegram-violet-7.svg"
                />

                <span>{{
                  route.query.current ? currentUser.telegram_chat_id : user?.telegram_chat_id
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>

    <section class="c-mt-32 c-py-32 c-px-96 competencies-section">
      <div class="text-subtitle4">Компетенции</div>

      <div class="q-mt-lg">
        <q-list class="row q-gutter-x-sm q-gutter-y-md">
          <c-chip
            v-for="competence in route.query.current
              ? currentUser.competencies
              : user?.competencies"
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
                {{ route.query.current ? currentUser.about : user?.about }}
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
                {{ route.query.current ? currentUser.resume_link : user?.resume_link }}
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
import { computed, inject, ref } from "vue";

import CChip from "src/components/ClubChip.vue";
import CSectionMainProfileUserInformation from "src/components/ClubSectionMainProfileUserInformation.vue";
import CItemPortfolio from "src/components/ClubItemPortfolio.vue";
import userApi from "src/sdk/user";
import { useRoute, useRouter } from "vue-router";

const currentUser = inject("currentUser");

const router = useRouter();
const route = useRoute();

const { id } = defineProps({
  id: String,
});

const { result: cU } = userApi.queryGetSubjectById({ id });

const user = computed(() => cU.value?.get_subject);

const baseIconSize = ref("24px");

// const { result: currentU } = userApi.paginateSubjects({
//   page: 1,
//   perPage: 1,
//   where: {
//     column: "id",
//     operator: "EQ",
//     value: id,
//   },
// });

// const user = computed(() => cU.value);

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

const redirectSettings = () => {
  router.push({
    name: "profileSettings",
  });
};
</script>

<style scoped lang="scss">
@import "src/css/fonts.scss";
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

.main-information {
  position: relative;
  margin-top: 64px;

  color: white;
  @extend .text-subtitle5;

  $left_padding: 8%;
  $top_height: 203px;
  $bottom_height: 302px;

  height: 505px;

  &__text {
    &-container {
      position: relative;

      margin-left: 32px;
      margin-right: 5%;

      width: 100%;

      &__absolute {
        position: absolute;
      }

      &__half {
        position: relative;

        display: flex;
        justify-content: space-between;
        align-items: end;

        width: 100%;
        height: 50%;
      }

      &__status {
        position: absolute;
        width: max-content;

        bottom: 32px;

        z-index: 3;

        @extend .text-body1;
        color: $violet-4;
      }
    }

    &-label {
      margin-bottom: 12px;

      &__right-side {
      }
    }
  }

  &__avatar {
    position: absolute;

    $avatar_size: 160px;

    height: $avatar_size;
    max-height: $avatar_size;
    width: $avatar_size;

    border-radius: 50%;
    z-index: 3;

    &-container {
      height: $avatar_size;
      min-width: $avatar_size;
    }

    &-img {
      max-height: $avatar_size;

      border-radius: 50%;
      border: 4px solid white;
    }
  }

  &__top {
    position: absolute;
    top: 0;
    min-height: $top_height;
    width: 100%;

    padding-left: $left_padding;

    background: linear-gradient(90deg, #9d69c6 20.77%, #581c87 100%);
    border-radius: 24px 24px 0px 0px;

    &-container {
      position: relative;
      height: $top_height;

      &-avatar {
        display: flex;
        width: 100%;
      }

      &__absolute {
        position: absolute;
        width: 100%;

        bottom: -80px;
      }
    }

    &-label {
      position: relative;

      &__absolute {
        position: absolute;

        @extend .text-caption2;

        right: 5%;
        bottom: 12px;
      }
    }
  }

  &__bottom {
    position: absolute;
    bottom: 0;
    min-height: $bottom_height;
    width: 100%;

    padding-left: $left_padding;

    color: black;
    background: white;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 24px 24px;

    &-container {
      position: relative;
      height: $bottom_height;

      &__absolute {
        position: absolute;
        bottom: 32px;
      }
    }
  }
}
</style>
