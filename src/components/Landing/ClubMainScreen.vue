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
        class="text-button2 q-mr-lg"
        label="Вступить в 1Т клуб"
      />
      
      <!-- Куда должно вести? -->
      <q-img
        src="/assets/images/Play_video.svg"
        height="60px"
        width="60px"
        alt="logo"
      />

      <span class="text-subtitle5 c-ml-12">Смотреть ролик</span>
    </section>
    </div>

    <q-img class="col" style="max-width: 480px" :src="img" />
  </section>
</template>

<script setup>
import CButton from "../ClubButton.vue";

const { title, subtitle, img } = defineProps({
  title: String,
  subtitle: String,
  img: String,
});
</script>

<style lang="scss" scoped>
section {
  margin-top: 56px;
}
</style>
