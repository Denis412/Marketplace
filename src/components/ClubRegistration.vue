<template>
  <div class="col-5 bg-auth relative-position flex flex-center">
    <div class="absolute c-width c-at-0 c-ar-20 c-z--1">
      <q-img
        class="c-img-120"
        src="../assets/images/authentication/envelope.svg"
      ></q-img>
      <q-img
        class="c-img-120 c-at--3"
        src="../assets/images/authentication/speech-bubble.svg"
      ></q-img>
    </div>
    <div class="flex column flex-center">
      <p class="text-bold c-mb-15 text-h3">Впервые здесь?</p>
      <p class="c-mb-115 fs-16 text-body2 c-maxw-300">
        Зарегистрируйтесь в нашем клубе прямо сейчас
      </p>
      <c-button
        outline
        label="Регистрация"
        class="text-body1 q-py-sm q-px-xl"
      ></c-button>
    </div>
  </div>
</template>
<script setup>
import CButton from "src/components/ClubButton.vue";
</script>
<style lang="scss" scoped>
.c-z {
  &-0 {
    z-index: 0;
  }
  &--1 {
    z-index: -1;
  }
}
.c-width {
  width: 100%;
  max-width: 10vw;
}
.c-maxw {
  &-300 {
    max-width: 300px;
  }
}
.c-mt {
  &-65 {
    margin-top: 65px;
  }
  &-205 {
    margin-top: 205px;
  }
}
.c-mb {
  &-15 {
    margin-bottom: 15px;
  }
  &-115 {
    margin-bottom: 115px;
  }
}
.bg-auth {
  background-color: #eee8f3;
  z-index: -10;
}
.c-img {
  &-120 {
    max-width: 10vw;
  }
}
.c-ar {
  &-20 {
    right: 20px;
  }
}
.c-at {
  &-0 {
    top: 0;
  }
  &--3 {
    top: -3vw;
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
