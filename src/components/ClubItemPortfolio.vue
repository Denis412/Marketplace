<template>
  <div class="portfolio-item__wrapper">
    <div class="portfolio-item-number__absolute" :class="numberPosition">
      <div class="flex flex-center portfolio-item-number">{{ position }}</div>
    </div>

    <div :class="paddingSide">
      <div class="row c-gutter-x-32">
        <q-img v-if="rightSide" class="portfolio-item-image" style="background-color: red" />

        <div class="col portfolio-item-content q-pt-lg" :class="textPosition">
          <div class="h-100p gray-scrollbar" :class="scrollDirection">
            <span class="text-subtitle4 w-100p">{{ item.title }}</span>

            <div class="c-mt-12">
              <span class="text-body2 text-gray7">
                {{ item.content }}
              </span>
            </div>
          </div>
        </div>

        <q-img
          v-if="!rightSide"
          class="portfolio-item-image"
          :src="item.image"
          style="background-color: red"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const { rightSide, item, position } = defineProps({
  rightSide: Boolean,
  item: Object,
  position: Number,
});

const numberPosition = ref({
  "portfolio-item-number__absolute-left": !rightSide,
  "portfolio-item-number__absolute-right": rightSide,
});

const scrollDirection = ref({
  "direction-rtl": rightSide,
});

const paddingSide = ref({
  "c-pl-96": !rightSide,
  "c-pr-96": rightSide,
});

const textPosition = ref({
  "portfolio-item-content__left": !rightSide,
  "portfolio-item-content__right": rightSide,
});
</script>

<style scoped lang="scss">
.portfolio {
  &-item {
    $item-height: 225px;

    &__wrapper {
      position: relative;

      max-height: $item-height;
    }

    &-content {
      max-height: $item-height;

      &__left {
        * {
          text-align: left;
        }
      }

      &__right {
        * {
          text-align: right;
        }
      }
    }

    &-number {
      width: 100%;
      height: 100%;

      font-size: 48px;

      color: white;

      &__absolute {
        position: absolute;

        z-index: -1;

        width: 100px;
        height: 100px;

        border-radius: 50%;

        background: $violet-4;

        &-left {
          left: 20px;
        }

        &-right {
          right: 20px;
        }
      }
    }

    &-image {
      max-width: 45%;
      min-height: $item-height;
      max-height: $item-height;

      border-radius: 10px;
    }
  }
}
</style>
