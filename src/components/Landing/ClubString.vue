<template>
  <section class="c-mb-160">
    <q-scroll-observer @scroll="onScroll" />
    <h2 :style="{ translate: translateRight + 'px' }" class="text-h0 text-no-wrap invert">
      {{ computedString(stringContent.invertText) }}
    </h2>
    <h2 :style="{ translate: -translateLeft + 'px' }" class="text-h0 text-no-wrap">
      {{ computedString(stringContent.mainText) }}
    </h2>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

const translateRight = ref("");
const translateLeft = ref("");
const stringContent = {
  mainText: "Вступить в 1т клуб",
  invertText: "Сейчас самое время",
};

const computedString = (string) => {
  return (string + " / ").repeat(10);
};

const onScroll = (info) => {
  translateRight.value = -2000 + info.position.top / 2;
  translateLeft.value = 2000 + info.position.top / 2;
};
</script>

<style scoped lang="scss">
.c {
  &-m {
    &b {
      &-160 {
        margin-bottom: 160px;
      }
    }
  }
}
.text-h0 {
  font-family: "Furore" !important;
  font-size: 90px !important;
  font-weight: 400 !important;
  line-height: 105px !important;
}
.invert {
  color: transparent;
  -webkit-text-stroke: 2px #9043b4;
  margin-bottom: 64px;
}
</style>
