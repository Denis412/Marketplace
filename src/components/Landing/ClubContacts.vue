<template>
  <section class="section-margin map">
    <div class="row">
      <div class="col-6"></div>
      <div class="col-6">
        <div class="flex flex-center q-pt-xl"><c-write-to-us-form /></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import CWriteToUsForm from "components/Landing/ClubWriteToUsForm.vue";
</script>

<style scoped lang="scss">
.card {
  padding: 32px 95px;
  background-color: #260f4a;

  margin-bottom: 66px;
}

.map {
  background-image: url("/assets/images/landing/map.png");
  background-size: cover;
  background-repeat: no-repeat;
  height: 40rem;
  @media (min-width: 2000px) {
    height: 120vh;
  }
}
</style>
