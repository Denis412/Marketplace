<template>
  <div :class="`relative-position z-top flex step-num step${num}`">
    <div class="absolute-center num">
      {{ num }}
    </div>
    <div class="absolute-center step-shadow"></div>
    <div class="absolute step-text">
      <div class="text-subtitle2">
        {{ title }}
      </div>
      <p class="text-body2">
        {{ info }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const { num } = defineProps({
  num: Number,
  title: String,
  info: String,
});
</script>

<style lang="scss" scoped>
.step-shadow {
  width: 320px;
  height: 320px;
  background: radial-gradient(50% 50% at 50% 50%,
      rgba(136, 29, 149, 0.3) 0%,
      rgba(136, 29, 149, 0) 100%);
  filter: blur(2px);
}

.step-num {
  width: 100px;
  height: 100px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    linear-gradient(135deg, #950c95 0%, #9600ff 100%, #3c0a5f 100%);
  border-radius: 100px;

  &:nth-child(even) {
    margin: 210px 0 0 355px;
  }

  margin-top: 210px;
}

.step1 {
  margin-top: 0;
}

.step5 {
  margin-top: 274px;
}

.num {
  font-size: 56px;
}

.step-text {
  width: 544px;
  top: 46px;
  left: 74px;
}
</style>
