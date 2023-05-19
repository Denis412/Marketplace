<template>
  <q-page class="c-px-32 c-pt-64">
    <h3 class="text-h3">Профиль пользователя</h3>

    <div class="c-mt-32 separator" />

    <section class="main-information">
      <section class="main-information__top">
        <div class="main-information__top-container">
          <div class="main-information__top-container__absolute">
            <div
              class="main-information__avatar-container main-information__top-container-avatar"
            >
              <div class="main-information__avatar-container">
                <q-avatar class="main-information__avatar">
                  <q-img
                    class="main-information__avatar-img"
                    :src="
                      currentUser.avatar ??
                      '/assets/images/preloaders/default-avatar.svg'
                    "
                  />
                </q-avatar>
              </div>

              <div class="main-information__text-container">
                <div class="main-information__text-container__half">
                  <span class="main-information__text-label">
                    ТехноНиндзя
                  </span>

                  <div
                    class="main-information__text-label q-gutter-x-sm cursor-pointer q-ml-md"
                  >
                    <q-icon
                      :size="baseIconSize"
                      name="img:/assets/icons/pen/edit-white.svg"
                    />
                    <span class="text-caption2"> Редактировать профиль </span>
                  </div>
                </div>

                <div class="main-information__text-container__status">
                  <span> Статус: Активно ищу команду </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="main-information__bottom">
        <div class="main-information__bottom-container">
          <div
            class="main-information__bottom-container__absolute text-body1 q-gutter-y-md"
          >
            <h4 class="text-h4">
              {{ currentUser.last_name }}
              {{ currentUser.first_name }}
              {{ currentUser.middle_name }}
            </h4>

            <div class="q-gutter-x-sm">
              <q-icon
                :size="baseIconSize"
                name="img:/assets/icons/geodata/geodata-violet-7.svg"
              />

              <span class="text-gray6"
                >{{ currentUser.city }}, Российская Федерация</span
              >
            </div>

            <div class="row text-gray7">
              <div class="col flex items-center q-gutter-x-sm">
                <q-icon
                  :size="baseIconSize"
                  name="img:/assets/icons/calendar/calendar-violet-7.svg"
                />

                <span>{{ currentUser.birthday }}</span>
              </div>

              <div class="col flex items-center q-gutter-x-sm">
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

                <span>{{ currentUser.gender }}</span>
              </div>
            </div>

            <div class="row text-gray7">
              <div class="col flex items-center q-gutter-x-sm">
                <q-icon
                  :size="baseIconSize"
                  name="img:/assets/icons/person/person-violet-7.svg"
                />

                <span>{{ currentUser.major }}</span>
              </div>

              <div class="col flex items-center q-gutter-x-sm">
                <q-icon
                  :size="baseIconSize"
                  name="img:/assets/icons/socials/telegram-violet-7.svg"
                />

                <span>{{ currentUser.telegram }}</span>
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
            v-for="n in 10"
            :key="n"
            gradient-outline
            label="Программирование"
          />
        </q-list>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { inject, ref } from "vue";

import CChip from "src/components/ClubChip.vue";

const currentUser = inject("currentUser");

const baseIconSize = ref("24px");
</script>

<style scoped lang="scss">
@import "src/css/fonts.scss";

.separator {
  height: 0;
  border: 3px solid $violet-2;
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
    width: $avatar_size;

    border-radius: 50%;
    z-index: 3;

    &-container {
      height: $avatar_size;
      min-width: $avatar_size;
    }

    &-img {
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

.competencies-section {
  min-height: 280px;

  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
}
</style>
