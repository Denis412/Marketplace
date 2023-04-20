<template>
  <div :class="`relative-position flex step-num step${num}`">
        <div class="absolute-center num">
          {{ num }}
        </div>
        <div class="absolute-center step-shadow ">
        </div>
        <div class="absolute step-text">
          <div class="title">
            {{ title }}
          </div>
          <p class="step-information">
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
  info: String
})
</script>

<style lang="scss" scoped>
.step-shadow {
  width: 320px;
  height: 320px;
  background: radial-gradient(50% 50% at 50% 50%, rgba(136, 29, 149, 0.3) 0%, rgba(136, 29, 149, 0) 100%);
  filter: blur(2px);
}

.step-num {
  width: 100px;
  height: 100px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(135deg, #950C95 0%, #9600FF 100%, #3C0A5F 100%);
  border-radius: 100px;

  &:nth-child(odd) {
    margin: 210px auto;
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

.title {
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
}

.step-information {
  font-weight: 400;
  font-size: 16px;
  line-height: 36px;
}

.step-text {
  width: 544px;
  bottom: -72px;
  left: 74px;
}
</style>
