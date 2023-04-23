<template>
  <div class="fullscreen text-center flex row">
    <div class="col">
      <div class="flex column items-center club-mt-65">
        <h4 class="text-bold club-mb-25">Войти в личный кабинет</h4>
        <p class="club-mb-65">Рады видеть вас снова</p>
        <c-input
          class="club-mb-10 c-input-400"
          type="email"
          placeholder="Введите ваш e-mail"
        />
        <c-input
          class="club-mb-15 c-input-400"
          type="password"
          visibility
          placeholder="Введите пароль"
        />
        <a href="" class="club-mb-50">Забыли пароль?</a>
        <q-btn>Войти</q-btn>
      </div>
    </div>
    <div class="col-5 bg-auth relative-position">
      <q-img
        class="absolute club-img-120 club-absolute-right-20"
        src="../assets/images/authentication/envelope.svg"
      ></q-img>
      <q-img
        class="absolute club-img-120 club-absolute-right-20 club-absolute-top-70"
        src="../assets/images/authentication/speech-bubble.svg"
      ></q-img>
      <div class="flex column flex-center club-mt-245">
        <h4 class="text-bold club-mb-15">Впервые здесь?</h4>
        <p class="club-mb-115">Зарегистрируйтесь в нашем клубе прямо сейчас</p>
        <q-btn>Регистрация</q-btn>
      </div>
    </div>
  </div>
</template>
<script setup>
import CInput from "src/components/ClubInput.vue";
import { useValidators } from "src/use/validators";

const { passwordValid, minLength, required } = useValidators();
</script>
<style lang="scss" scoped>
.club-mt-65 {
  margin-top: 65px;
}
.club-mt-245 {
  margin-top: 245px;
}
.club-mb-15 {
  margin-bottom: 15px;
}
.club-mb-25 {
  margin-bottom: 25px;
}
.club-mb-50 {
  margin-bottom: 50px;
}
.club-mb-65 {
  margin-bottom: 65px;
}
.club-mb-115 {
  margin-bottom: 115px;
}
.bg-auth {
  background-color: #eee8f3;
}
.club-img-120 {
  max-width: 120px;
}
.club-absolute-right-20 {
  right: 20px;
}
.club-absolute-top-70 {
  top: 70px;
}
.c-input-400 {
  width: 100%;
  max-width: 400px;
}
</style>
