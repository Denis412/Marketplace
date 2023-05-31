<template>
  <section class="flex no-wrap container items-center">
    <div class="col">
      <h1 class="text-h1">{{ title }}</h1>

      <div class="row">
        <p class="text-body2 q-mt-md col-10">
          {{ subtitle }}
        </p>
      </div>

      <section class="flex q-py-md c-mt-40 items-center">
        <c-button
          to="/registration"
          background
          class="text-subtitle4 q-mr-lg c-px-32"
          label="Вступить в 1Т клуб"
        />

        <q-btn
          v-if="request"
          class="text-subtitle4 q-ml-sm c-px-32 request-btn"
          label="Оставить заявку"
          @click="scrollTo(requestBlock)"
        />

        <a v-if="video" class="text-subtitle5 link" href="#about">
          <q-img
            class="play_video"
            src="/assets/images/Play_video.svg"
            height="60px"
            width="60px"
            alt="logo"
          />
          <span class="q-ml-md">Смотреть ролик</span></a
        >
      </section>
    </div>

    <q-img class="col" style="max-width: 480px" :src="img || '/assets/images/amico.svg'" />
  </section>
</template>

<script setup>
import CButton from "../ClubButton.vue";
import { scroll } from "quasar";

const { title, subtitle, img, video, request, requestBlock } = defineProps({
  title: String,
  subtitle: String,
  img: String,
  video: Boolean,
  request: Boolean,
  requestBlock: Object,
});

const { getScrollTarget, setVerticalScrollPosition } = scroll;

const scrollTo = (el) => {
  const target = getScrollTarget(el);
  const offset = el.offsetTop + 90;
  const duration = 750;
  setVerticalScrollPosition(target, offset, duration);
};
</script>

<style lang="scss" scoped>
section {
  margin-top: 56px;
}

.link {
  text-decoration: none;
  color: white;
}
.play_video {
  cursor: pointer;
}
.request-btn {
  border: 3px solid #881d95;
  text-transform: none;
  border-radius: 8px;
}
</style>
