<template>
  <div class="fullscreen text-center flex row">
    <section class="col-5 bg-auth relative-position flex flex-center">
      <div class="absolute c-width c-at-0 c-ar-20 c-z--1">
        <q-img class="c-img-120" src="/assets/images/authentication/envelope.svg" />
        <q-img class="c-img-120 c-at--3" src="/assets/images/authentication/speech-bubble.svg" />
      </div>

      <div class="flex column flex-center">
        <h3 class="text-bold c-mb-15 text-h3">Уже заходили?</h3>
        <p class="c-mb-115 fs-16 text-body2 c-maxw-250">Будем рады видеть вас снова</p>
        <c-button to="/authentication" outline label="Войти" class="text-body1" />
      </div>
    </section>

    <section class="col relative-position flex flex-center">
      <q-form class="flex column form" @submit="registration">
        <h3 class="text-bold c-mb-25 text-h3">Регистрация</h3>
        <p class="c-mb-30 fs-16 text-body2">Зарегистрируйтесь в нашем клубе</p>

        <q-input
          flat
          outlined
          class="c-input-outline"
          v-model="form.name"
          type="text"
          maxlength="50"
          placeholder="Введите ваше имя"
          @update:model-value="capitailze('name')"
          :rules="[required, onlyRussian, noSpace, maxLength(50)]"
          lazy-rules
        />

        <q-input
          flat
          outlined
          class="c-input-outline q-mt-md"
          v-model="form.surname"
          type="text"
          placeholder="Введите вашу фамилию"
          @update:model-value="capitailze('surname')"
          :rules="[required, onlyRussian, noSpace, maxLength(50)]"
          lazy-rules
        />

        <q-input
          flat
          outlined
          class="c-input-outline q-mt-md"
          v-model="form.email"
          type="email"
          maxlength="256"
          placeholder="Введите ваш e-mail"
          :rules="[required, email, maxLength(256)]"
          lazy-rules
        />

        <q-input
          flat
          outlined
          class="c-input-outline q-mt-md"
          v-model="form.password"
          type="password"
          placeholder="Введите пароль"
          visibility
          maxlength="50"
          :rules="[required, onlyLatin, minLength(8), maxLength(50), passwordValid]"
          lazy-rules
        >
          <template v-slot:append>
            <q-icon
              class="cursor-pointer"
              :name="
                showPassword
                  ? `img:/assets/icons/eye/eye-grey.svg`
                  : `img:/assets/icons/eye/eye-hidden-grey.svg`
              "
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>

        <q-input
          flat
          outlined
          class="c-input-outline q-mt-md"
          v-model="form.confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          maxlength="50"
          visibility
          :rules="[required, equal(form.password)]"
          lazy-rules
        >
          <template v-slot:append>
            <q-icon
              class="cursor-pointer"
              :name="
                showConfirmPassword
                  ? `img:/assets/icons/eye/eye-grey.svg`
                  : `img:/assets/icons/eye/eye-hidden-grey.svg`
              "
              @click="showConfirmPassword = !showConfirmPassword"
            />
          </template>
        </q-input>

        <q-checkbox
          dense
          v-model="agreement"
          color="purple"
          class="c-mb-30 q-mt-md text-caption2 c-checkbox-rounded"
        >
          <template v-slot:default>
            <span class="flex">
              Я принимаю
              <pre> <a href="" class="text-caption2">Условия использования</a> </pre>
              и соглашаюсь с
              <pre><a href="" class="text-caption2">политикой конфиденциальности</a> </pre>
            </span>
          </template>
        </q-checkbox>

        <!-- :disable="!agreement" -->

        <div class="flex flex-center">
          <c-button
            disable
            type="submit"
            background
            label="Зарегистрироваться"
            class="text-body1"
          />
        </div>
      </q-form>

      <q-img
        class="absolute c-img-270 c-ab-0 c-al--11 c-z--1"
        src="/assets/images/authentication/gears.svg"
      />
    </section>

    <c-confirmation-code-dialog
      v-model="showConfirmCode"
      :timer="timer"
      :auth-info="authUserInfo"
    />
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { useTimer } from "src/use/timer";
import { useValidators } from "src/use/validators";
import { useQuasar } from "quasar";

import CInput from "src/components/ClubInput.vue";
import CButton from "src/components/ClubButton.vue";
import CConfirmationCodeDialog from "src/components/ClubConfirmationCodeDialog.vue";
import userApi from "src/sdk/user";
import capitalizeWord from "src/utils/capitalizeWord";

const $q = useQuasar();
const timer = useTimer(90);
const {
  required,
  email,
  minLength,
  noSpace,
  maxLength,
  passwordValid,
  equal,
  onlyLatin,
  onlyRussian,
} = useValidators();

const authUserInfo = ref({});
const agreement = ref(false);
const showConfirmCode = ref(false);

const form = ref({
  name: "",
  surname: "",
  previousEmail: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const capitailze = (prop) => {
  if (form.value[prop].charCodeAt(0) >= 97) form.value[prop] = capitalizeWord(form.value[prop]);
};

const registration = async () => {
  // try {
  //   let userInfo;
  //   console.log(timer.timer.value);
  //   if (form.value.previousEmail !== form.value.email) {
  //     console.log(form.value.previousEmail, form.value.email);
  //     if (timer.timer.value === 90 || timer.timer.value === 0) {
  //       userInfo = await userApi.registration(form.value);
  //       form.value.previousEmail = form.value.email;
  //       if (timer.timer.value === 0) timer.clear();
  //       timer.start();
  //       $q.notify({
  //         type: "positive",
  //         message: "Вам на почту отправлено письмо с кодом подтверждения!",
  //       });
  //     } else {
  //       $q.notify({
  //         type: "warning",
  //         message: `Подождите еще ${timer.timer.value} секунд!`,
  //       });
  //     }
  //   }
  //   showConfirmCode.value = true;
  //   if (userInfo) {
  //     authUserInfo.value.user_id = userInfo.recordId;
  //     authUserInfo.value.email = userInfo.record.email;
  //     authUserInfo.value.password = form.value.password;
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
};

registration.count = 0;
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.form {
  max-width: 400px;
  width: 400px;

  margin: 0 16px;
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
