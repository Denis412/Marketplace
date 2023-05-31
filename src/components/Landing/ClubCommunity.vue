<template>
  <section class="community">
    <div class="text-area">
      <h3 class="text-h3 text-center">Наши участники — главный актив 1Т Клуба</h3>
      <p class="text-center text-subtitle5">
        Нас уже более 1500 человек! Наше IT-сообщество основывается на взаимной поддержке. Мы верим,
        что вместе достигнем больших результатов и сможем реализовать самые смелые идеи! .
      </p>
    </div>
    <div class="community-photos row justify-between">
      <div>
        <div></div>
        <div></div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
.community {
  margin-top: 128px;

  .text-area {
    max-width: 1120px;
    margin: 0 auto;
  }

  &-photos {
    min-height: 516px;
    width: 100vw;
    margin-top: 68px;

    div:nth-child(1) {
      width: 23.13%;

      div:nth-child(1) {
        background: url("/assets/images/landing/photos/photo-1.png") center center/cover no-repeat;
        width: 100%;
        height: 250px;
      }

      div:nth-child(2) {
        background: url("/assets/images/landing/photos/photo-2.png") center center/cover no-repeat;
        margin-top: 10px;
        width: 100%;
        height: 300px;
      }
    }

    div:nth-child(2) {
      width: 19.17%;

      div:nth-child(1) {
        background: url("/assets/images/landing/photos/photo-3.png") center center/cover no-repeat;
        width: 100%;
        height: 300px;
      }

      div:nth-child(2) {
        background: url("/assets/images/landing/photos/photo-4.png") center center/cover no-repeat;
        width: 100%;
        height: 250px;
        margin-top: 10px;
      }
    }

    div:nth-child(3) {
      width: 19.03%;

      div:nth-child(1) {
        background: url("/assets/images/landing/photos/photo-5.png") center center/cover no-repeat;
        width: 100%;
        height: 250px;
      }

      div:nth-child(2) {
        background: url("/assets/images/landing/photos/photo-6.png") center center/cover no-repeat;
        width: 100%;
        height: 300px;
        margin-top: 10px;
      }
    }

    div:nth-child(4) {
      width: 20.83%;

      div:nth-child(1) {
        background: url("/assets/images/landing/photos/photo-7.png") center center/cover no-repeat;
        width: 100%;
        height: 100%;
      }
    }

    div:nth-child(5) {
      width: 15.07%;

      div:nth-child(1) {
        background: url("/assets/images/landing/photos/photo-8.png") center center/cover no-repeat;
        width: 100%;
        height: 250px;
      }

      div:nth-child(2) {
        background: url("/assets/images/landing/photos/photo-9.png") center center/cover no-repeat;
        width: 100%;
        height: 300px;
        margin-top: 10px;
      }
    }
  }
}

.title {
  font-weight: 800;
  font-size: 32px;
  line-height: 36px;
}

p {
  margin-top: 32px;
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
}
</style>
