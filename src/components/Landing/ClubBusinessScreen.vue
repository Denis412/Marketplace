<template>
  <section class="flex no-wrap container justify-between items-center">
    <div class="screen-content">
      <h1 class="text-h1 c-mb-18">Для Бизнеса</h1>

      <p class="text-subtitle5 c-mb-40">
        1Т Клуб — это поддержка, наставничество и полная вовлеченность в ваш IT-проект
      </p>

      <section class="">
        <c-button
          to="/registration"
          background
          class="text-button2 reg-btn"
          label="Вступить в 1Т клуб"
        />
      </section>
    </div>

    <q-img
      class="screen-img"
      style="max-width: 480px"
      src="/assets/images/landing-business/amico.svg"
    />
  </section>
</template>

<script setup>
import CButton from "../ClubButton.vue";
</script>

<style lang="scss" scoped>
.container {
  margin-top: 60px;
}
.screen {
  &-content {
    max-width: 545px;
  }
  &-img {
    width: 365px;
    height: 370px;
  }
}
.reg-btn {
  padding: 16px 24px;
  margin: 0;
}
</style>
