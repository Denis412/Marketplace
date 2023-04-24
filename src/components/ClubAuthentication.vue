<template>
  <div class="col relative-position flex flex-center">
    <div class="flex column items-center">
      <p class="text-bold c-mb-25 text-h3">Войти в личный кабинет</p>
      <p class="c-mb-65 fs-16 text-body2">Рады видеть вас снова</p>
      <c-input
        class="c-mb-10 c-input-400"
        type="email"
        placeholder="Введите ваш e-mail"
      />
      <c-input
        class="c-mb-15 c-input-400"
        type="password"
        placeholder="Введите пароль"
        visibility
      />
      <a href="" class="c-mb-50 link-grey">Забыли пароль?</a>
      <c-button
        background
        label="Войти"
        class="text-body1 q-py-sm q-px-xl"
      ></c-button>
    </div>
    <q-img
      class="absolute c-img-270 c-ab-0 c-ar--13 c-z--1"
      src="../assets/images/authentication/gears.svg"
    ></q-img>
  </div>
</template>
<script setup>
import CInput from "src/components/ClubInput.vue";
import CButton from "src/components/ClubButton.vue";
</script>
<style lang="scss" scoped>
.c-z {
  &--1 {
    z-index: -1;
  }
}
.c-mb {
  &-10 {
    margin-bottom: 10px;
  }
  &-15 {
    margin-bottom: 15px;
  }
  &-25 {
    margin-bottom: 25px;
  }
  &-50 {
    margin-bottom: 50px;
  }
  &-65 {
    margin-bottom: 65px;
  }
}
.bg-auth {
  background-color: #eee8f3;
  z-index: -10;
}
.c-img {
  &-270 {
    max-width: 24vw;
  }
}
.c-ar {
  &--13 {
    right: -13vw;
  }
}
.c-ab-0 {
  bottom: 0px;
}
.c-input-400 {
  width: 100%;
  max-width: 400px;
}
.fs-16 {
  font-size: 16px;
}
.link-grey {
  text-decoration: none;
  color: #adadad;
}
</style>
