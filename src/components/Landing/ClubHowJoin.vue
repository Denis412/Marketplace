<template>
  <section class="section-margin how-join container">
    <div class="row">
      <div class="col-6 relative-position">
        <iframe
          width="448"
          height="593"
          class="video"
          src="https://www.youtube.com/embed/JLgNkXbrcTA?feature=share"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>

        <img
          class="absolute-center"
          src="/assets/images/landing-background/main-page/bg-15.svg"
          style="z-index: -1"
        />
      </div>

      <div class="col-6 c-mt-80 c-pt-40">
        <h3 class="text-h3">Как вступить в 1Т Клуб?</h3>

        <p class="text-body2 q-mt-lg">
          Присоединяйтесь к нашему IT-сообществу. Пройдите простую регистрацию на сайте и станьте
          частью большой и дружной ㅤ IT-семьи!
        </p>

        <c-button
          to="/registration"
          background
          class="text-button2 c-px-32 c-py-16 q-mt-lg"
          label="Вступить в 1Т клуб"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import CButton from "../ClubButton.vue";
</script>

<style lang="scss" scoped>
.info-btn {
  padding: 8px 20px;

  width: 172px;
  height: 40px;

  background: linear-gradient(101.75deg, #4c1d95 4.25%, #881d95 96.95%);
  border-radius: 5px;
  text-transform: capitalize;
}
</style>
