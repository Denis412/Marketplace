<template>
  <section class="section-margin">
    <div>
      <h3 class="text-h3 text-center">Наши участники — главный актив клуба</h3>
      <p class="text-subtitle1 club-mt-32">
        Нас уже более 1500 человек!<br />
        Наше сообщество основывается на взаимной поддержке. Мы верим, что вместе
        достигнем больших результатов и сможем реализовать самые смелые идеи.
        Присоединяйтесь к нам и становитесь частью большой и дружной команды.
      </p>
    </div>
    <div class="community-photos flex justify-center row justify-between">
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
  &-photos {
    min-height: 516px;
    width: 100vw;
    margin-top: 68px;

    div:nth-child(1) {
      width: 23.13%;

      div:nth-child(1) {
        background: url("./src/assets/images/community/0asp9NnUmlc1.png") center
          center/cover no-repeat;
        width: 100%;
        height: 250px;
      }

      div:nth-child(2) {
        background: url("./src/assets/images/community/2MEWedzgmlw1.png") center
          center/cover no-repeat;
        margin-top: 10px;
        width: 100%;
        height: 300px;
      }
    }

    div:nth-child(2) {
      width: 19.17%;

      div:nth-child(1) {
        background: url("./src/assets/images/community/04GQVbAHKCg1.png") center
          center/cover no-repeat;
        width: 100%;
        height: 300px;
      }

      div:nth-child(2) {
        background: url("./src/assets/images/community/FjdtnHwKAxE1.png") center
          center/cover no-repeat;
        width: 100%;
        height: 250px;
        margin-top: 10px;
      }
    }

    div:nth-child(3) {
      width: 19.03%;

      div:nth-child(1) {
        background: url("./src/assets/images/community/TFsX8vYZXDg1.png") center
          center/cover no-repeat;
        width: 100%;
        height: 250px;
      }

      div:nth-child(2) {
        background: url("./src/assets/images/community/jcbljhGaXNU1.png") center
          center/cover no-repeat;
        width: 100%;
        height: 300px;
        margin-top: 10px;
      }
    }

    div:nth-child(4) {
      width: 20.83%;

      div:nth-child(1) {
        background: url("./src/assets/images/community/Frame1763.png") center
          center/cover no-repeat;
        width: 100%;
        height: 100%;
      }
    }

    div:nth-child(5) {
      width: 15.07%;

      div:nth-child(1) {
        background: url("./src/assets/images/community/Rp6DRtyEhxQ1.png") center
          center/cover no-repeat;
        width: 100%;
        height: 250px;
      }

      div:nth-child(2) {
        background: url("./src/assets/images/community/OXwytqukwXA 1.png")
          center center/cover no-repeat;
        width: 100%;
        height: 300px;
        margin-top: 10px;
      }
    }
  }
}
</style>
