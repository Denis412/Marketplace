<template>
  <section class="text-center directions container">
    <h2 class="title relative-position z-max text-h3 q-mb-xl q-pb-xl">
      Выберите направление
      <img
        src="/assets/images/landing-background/main-page/bg-14.svg"
        class="absolute-center shadow"
      />
    </h2>
    <c-card-group :directions="cardsList" :btnContent="btnContent" />
  </section>
</template>

<script setup>
import CCardGroup from "components/Landing/ClubCardGroup.vue";

const { btnContent, cardsList } = defineProps({
  btnContent: String,
  cardsList: Array,
});
</script>

<style lang="scss" scoped>
.directions {
  margin-top: 179px;
}

.subtitle {
  margin: 33px 0;
}

.shadow {
  z-index: -1;
}
</style>
