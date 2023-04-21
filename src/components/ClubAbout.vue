<template>
  <section class="container about">
        <div class="q-mb-md font-size-32">О Клубе за 1 минуту</div>

        <div class="flex justify-between">
          <p class="font-size-24 ">
            Мы проводим мероприятия и даём рекомендации участникам 1Т Клуба для
            их профессионального развития в IT, бизнесе и инвестировании. У нас
            можно найти специалистов и партнеров для совместной работы, а также
            обмениваться знаниями и опытом.
          </p>

          <q-video class="video"
            src="https://www.youtube.com/watch?v=OJzN26zynP0" />
        </div>
      </section>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.about {
  margin-top: 124px;
}

p {
  max-width: 348px;
}

.video {
  width: 640px;
  height: 457px;
  border-radius: 10px;
}
</style>
