<template>
  <section class="section-margin how-join container row justify-between">
    <div class="image relative-position">
      <img src="/assets/images/landing/welcome.svg" />

      <img
        class="absolute-center"
        src="/assets/images/landing-background/main-page/bg-15.svg"
        style="z-index: -1"
      />
    </div>

    <div class="info">
      <h3 class="text-h3">Как вступить в 1Т Клуб?</h3>

      <p class="text-body2 club-mt-72">
        Присоединяйтесь к нашему сообществу, пройдя простую регистрацию на
        сайте. Вступайте в 1Т Клуб и станьте частью нашей большой и дружной
        семьи!
      </p>

      <c-button background label="Присоединиться" class="info-btn block" />
    </div>
  </section>
</template>

<script setup>
import CButton from "../ClubButton.vue";
</script>

<style lang="scss" scoped>
.how-join {
  padding: 0 96px;
}

.info {
  max-width: 474px;
}

.info-btn {
  margin: 72px auto 0 auto;
  padding: 8px 20px;

  width: 172px;
  height: 40px;

  background: linear-gradient(101.75deg, #4c1d95 4.25%, #881d95 96.95%);
  border-radius: 5px;
  text-transform: capitalize;
}
</style>
