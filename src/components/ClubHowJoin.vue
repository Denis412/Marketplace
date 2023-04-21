<template>
  <section class="how-join container row justify-between">
    <div class="image relative-position">
      <img src="src/assets/images/cuate.svg"/>
      <img class="absolute-center" src="src/assets/images/Ellipse 70.svg">
    </div>
    <div class="info">
      <h3 class="title text-center">
        Как вступить в 1Т Клуб?
      </h3>
      <p>
        Присоединяйтесь к нашему сообществу, пройдя простую регистрацию на сайте. Вступайте в 1Т Клуб и станьте частью нашей большой и дружной семьи!
      </p>
      <q-btn class="info-btn block" label="Присоединиться"/>
    </div>
  </section>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.how-join {
  margin-top: 124px;
  padding: 0 96px;
}

.title {
  font-weight: 800;
  font-size: 32px;
  line-height: 39px;
}

.info {
  max-width: 396px;
}

p {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin-top: 72px;
}

.info-btn {
  margin: 72px auto 0 auto;
  padding: 8px 20px;

  width: 172px;
  height: 40px;

  background: linear-gradient(101.75deg, #4C1D95 4.25%, #881D95 96.95%);
  border-radius: 5px;
  text-transform: capitalize;
}
</style>
