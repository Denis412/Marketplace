<template>
  <div class="fullscreen text-center flex row">
    <section class="col-5 bg-auth relative-position flex flex-center">
      <div class="absolute c-width c-at-0 c-ar-20 c-z--1">
        <q-img
          class="c-img-120"
          src="../assets/images/authentication/envelope.svg"
        />

        <q-img
          class="c-img-120 c-at--3"
          src="../assets/images/authentication/speech-bubble.svg"
        />
      </div>

      <div class="flex column flex-center">
        <h3 class="text-bold c-mb-15 text-h3">Уже заходили?</h3>

        <p class="c-mb-115 fs-16 text-body2 c-maxw-250">
          Будем рады видеть вас снова
        </p>

        <c-button
          to="/authentication"
          outline
          label="Войти"
          class="text-body1"
        />
      </div>
    </section>

    <section class="col relative-position flex flex-center">
      <q-form
        class="flex column items-center c-maxw-400"
        @submit="registration"
      >
        <h3 class="text-bold c-mb-25 text-h3">Регистрация</h3>

        <p class="c-mb-30 fs-16 text-body2">Зарегистрируйтесь в нашем клубе</p>

        <c-input
          class="c-input-400"
          v-model="form.name"
          type="text"
          placeholder="Введите ваше имя"
          :rules="[required, maxLength(50)]"
        />

        <c-input
          class="c-input-400"
          v-model="form.surname"
          type="text"
          placeholder="Введите вашу фамилию"
          :rules="[required, maxLength(50)]"
        />

        <c-input
          class="c-input-400"
          v-model="form.email"
          type="email"
          placeholder="Введите ваш e-mail"
          :rules="[required, maxLength(150)]"
        />

        <c-input
          class="c-input-400"
          v-model="form.password"
          type="password"
          placeholder="Введите пароль"
          visibility
          :rules="[required, minLength(8), maxLength(30), passwordValid]"
        />

        <c-input
          class="c-input-400"
          v-model="form.confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          visibility
          :rules="[required, equal(form.password)]"
        />

        <q-checkbox
          dense
          v-model="agreement"
          color="purple"
          class="c-mb-30 c-maxw-350 c-checkbox-rounded"
        >
          <template v-slot:default>
            Я принимаю <a href="">Условия использования</a> и соглашаюсь с
            <a href="">политикой конфиденциальности</a>
          </template>
        </q-checkbox>

        <c-button
          :disable="!agreement"
          type="submit"
          background
          label="Зарегистрироваться"
          class="text-body1"
        />
      </q-form>

      <q-img
        class="absolute c-img-270 c-ab-0 c-al--11 c-z--1"
        src="../assets/images/authentication/gears.svg"
      />
    </section>

    <!-- <pre>{{ authUserInfo }}</pre> -->

    <c-confirmation-code-dialog
      v-model="showConfirmCode"
      :timer="timer"
      :auth-info="authUserInfo"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useTimer } from "src/use/timer";
import { useValidators } from "src/use/validators";
import { useQuasar } from "quasar";

import CInput from "src/components/ClubInput.vue";
import CButton from "src/components/ClubButton.vue";
import CConfirmationCodeDialog from "src/components/ClubConfirmationCodeDialog.vue";
import userApi from "src/sdk/user";

const $q = useQuasar();
const timer = useTimer(90);
const { required, minLength, maxLength, passwordValid, equal } =
  useValidators();

const authUserInfo = ref({});
const agreement = ref(false);
const showConfirmCode = ref(false);

const form = ref({
  name: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const registration = async () => {
  registration.count++;

  try {
    let userInfo;

    console.log(timer.timer.value);

    if (registration.count === 1) {
      if (timer.timer.value === 90)
        userInfo = await userApi.registration(form.value);

      console.log(userInfo);

      $q.notify({
        type: "positive",
        message: "Вам на почту отправлено письмо с кодом подтверждения!",
      });
    }

    timer.start();
    showConfirmCode.value = true;

    if (userInfo) {
      authUserInfo.value.user_id = userInfo.recordId;
      authUserInfo.value.email = userInfo.record.email;
      authUserInfo.value.password = form.value.password;
    }
  } catch (error) {
    console.log(error);
  }
};

registration.count = 0;
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.c {
  &-ab {
    &-0 {
      bottom: 0px;
    }
  }
  &-at {
    &-0 {
      top: 0;
    }
    &--3 {
      top: -3vw;
    }
  }
  &-al {
    &--11 {
      left: -11vw;
    }
  }
  &-ar {
    &-20 {
      right: 20px;
    }
    &--13 {
      right: -13vw;
    }
  }
  &-input {
    &-400 {
      width: 200%;
      max-width: 400px;
    }
  }
  &-img {
    &-120 {
      max-width: 10vw;
    }
    &-270 {
      max-width: 24vw;
    }
  }
  &-maxw {
    &-250 {
      max-width: 250px;
    }
    &-300 {
      max-width: 300px;
    }
    &-350 {
      max-width: 350px;
    }
  }
  &-mb {
    &-10 {
      margin-bottom: 10px;
    }
    &-15 {
      margin-bottom: 15px;
    }
    &-25 {
      margin-bottom: 25px;
    }
    &-30 {
      margin-bottom: 30px;
    }
    &-50 {
      margin-bottom: 50px;
    }
    &-65 {
      margin-bottom: 65px;
    }
    &-115 {
      margin-bottom: 115px;
    }
  }
  &-mt {
    &-65 {
      margin-top: 65px;
    }
    &-205 {
      margin-top: 205px;
    }
  }
  &-width {
    width: 100%;
    max-width: 10vw;
  }
  &-z {
    &-0 {
      z-index: 0;
    }
    &--1 {
      z-index: -1;
    }
  }
}
.bg-auth {
  background-color: #eee8f3;
  z-index: -10;
}
.fs-16 {
  font-size: 16px;
}
.link-grey {
  text-decoration: none;
  color: #adadad;
}
</style>
