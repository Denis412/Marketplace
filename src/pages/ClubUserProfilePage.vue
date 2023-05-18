<template>
  <q-page class="c-px-32 c-pt-64">
    <h3 class="text-h3">Профиль пользователя</h3>

    <div class="c-mt-32 separator" />

    <section class="main-information">
      <div class="main-information__top">
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

              <div class="main-information__nick-container">
                <div class="main-information__nick-container__half">
                  <span class="main-information__nick-label">ТехноНиндзя</span>
                </div>

                <div class="main-information__nick-container__status">
                  <span class="">Статус: Активно ищу команду</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="main-information__top-label q-gutter-x-sm cursor-pointer">
          <q-icon name="img:/assets/icons/pen/edit-white.svg" />
          <span>Редактировать профиль</span>
        </div>
      </div>

      <div class="main-information__bottom">
        <div class="main-information__bottom-container">
          <div class="main-information__bottom-container__absolute">
            <h4 class="text-h4">Забирова Анна Александровна</h4>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { inject } from "vue";

const currentUser = inject("currentUser");
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

  &__nick {
    &-container {
      position: relative;
      margin-left: 32px;

      &__half {
        position: relative;
        display: flex;
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
      width: $avatar_size;
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

        bottom: -80px;
      }
    }

    &-label {
      position: absolute;

      @extend .text-caption2;

      right: 5%;
      bottom: 12px;

      span {
        width: 24px;
        height: 24px;
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
