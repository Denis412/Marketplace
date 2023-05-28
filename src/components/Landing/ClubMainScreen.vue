<template>
  <section class="flex no-wrap container">
    <div class="col">
      <h1 class="text-h1">1Т Клуб</h1>

      <p class="text-subtitle5 q-mt-md">
        1Т Клуб — сообщество IT-специалистов, которых объединяет страсть к работе и саморазвитию
      </p>

      <section class="flex q-py-md q-mt-xl items-center">
      <c-button
        to="/registration"
        background
        class="text-button2 q-mr-lg c-px-32 c-py-16"
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

    <q-img
      class="col"
      style="max-width: 480px"
      src="/assets/images/amico.svg"
    />
  </section>
</template>

<script setup>
import CButton from "../ClubButton.vue";
</script>

<style lang="scss" scoped>
section {
  margin-top: 85px;
}
</style>
