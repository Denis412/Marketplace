<template>
  <div class="fullscreen text-center flex row">
    <div class="col">
      <div class="flex column items-center club-mt-65">
        <h4 class="text-bold">Войти в личный кабинет</h4>
        <p>Рады видеть вас снова</p>
        <c-input placeholder="Введите ваш e-mail" />
        <c-input placeholder="Введите пароль" />
        <a href="">Забыли пароль?</a>
        <q-btn>Войти</q-btn>
      </div>
    </div>
    <div class="col-5 bg-auth">
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
</script>
<style lang="scss" scoped>
.club-mt-65 {
  margin-top: 65px;
}
.club-mt-245 {
  margin-top: 245px;
}
.club-mb-15 {
  margin-bottom: 16px;
}
.club-mb-115 {
  margin-bottom: 115px;
}
.bg-auth {
  background-color: #eee8f3;
}
</style>
