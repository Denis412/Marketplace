<template>
  <section class="flex no-wrap container items-center">
    <div class="col">
      <h1 class="text-h1">{{ title }}</h1>

      <p class="text-subtitle4 q-mt-md">
        {{ subtitle }}
      </p>

      <section class="flex q-py-md q-mt-xl items-center">
        <c-button
          to="/registration"
          background
          class="text-button2 q-mr-lg c-px-32 c-py-16"
          label="Вступить в 1Т клуб"
        />

        <a class="text-subtitle5 link" href="#about">
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

    <q-img class="col" style="max-width: 480px" src="/assets/images/amico.svg" />
  </section>
</template>

<script setup>
import CButton from "../ClubButton.vue";

const { title, subtitle, img, video } = defineProps({
  title: String,
  subtitle: String,
  img: String,
  video: Boolean,
});
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
</style>
