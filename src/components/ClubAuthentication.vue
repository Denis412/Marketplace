<template>
  <div class="fullscreen text-center flex row">
    <section class="col relative-position flex flex-center">
      <q-form class="flex column items-center" @submit="authorization">
        <h3 class="text-bold c-mb-25 text-h3">Войти в личный кабинет</h3>
        <p class="c-mb-65 fs-16 text-body2">Рады видеть вас снова</p>

        <!-- <q-file
          v-model="files"
          label="Pick files"
          filled
          multiple
          append
          style="max-width: 300px"
        />
        <c-button
          background
          label="Загрузить"
          @click="upload"
          style="height: 50px"
        /> -->

        <c-input
          class="c-input-400"
          v-model="form.login"
          type="email"
          placeholder="Введите ваш e-mail"
        />

        <c-input
          class="q-mt-md c-input-400"
          v-model="form.password"
          type="password"
          placeholder="Введите пароль"
          visibility
        />

        <p
          href=""
          class="c-mb-50 q-mt-md link-grey cursor-pointer"
          @click="resetPassword"
        >
          Забыли пароль?
        </p>

        <c-button background label="Войти" type="submit" class="text-body1" />
      </q-form>

      <q-img
        class="absolute c-img-270 c-ab-0 c-ar--13 c-z--1"
        src="../assets/images/authentication/gears.svg"
      />
    </section>

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
        <h3 class="text-bold c-mb-15 text-h3">Впервые здесь?</h3>

        <p class="c-mb-115 fs-16 text-body2 c-maxw-300">
          Зарегистрируйтесь в нашем клубе прямо сейчас
        </p>

        <c-button
          to="/registration"
          outline
          label="Регистрация"
          class="text-body1"
        />
      </div>
    </section>

    <c-password-recovery-dialog
      v-model="forgotPassword"
      :auth-info="authInfo"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "stores/user";

import CInput from "src/components/ClubInput.vue";
import CButton from "src/components/ClubButton.vue";
import CPasswordRecoveryDialog from "./ClubPasswordRecoveryDialog.vue";
import userApi from "src/sdk/user";
import { useQuasar } from "quasar";
import filesApi from "src/sdk/file";

const $q = useQuasar();
const router = useRouter();
const store = useUserStore();

const forgotPassword = ref(false);
const authInfo = ref({});

const files = ref(null);

const upload = async () => {
  try {
    const data = await filesApi.uploadFiles(files.value);

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const form = ref({
  login: "",
  password: "",
});

const authorization = async () => {
  try {
    await userApi.login(form.value);

    store.SET_CURRENT_USER();

    console.log("store", store.GET_CURRENT_USER);

    await router.push({
      path: "/club",
    });
  } catch (error) {
    console.log(error);

    $q.notify({
      type: "negative",
      position: "top",
      message: "Введен неверный логин или пароль!",
    });
  }
};

const resetPassword = () => {
  authInfo.value.email = form.value.login;
  authInfo.value.password = form.value.password;

  forgotPassword.value = true;
};
</script>

<style lang="scss" scoped>
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
    &-300 {
      max-width: 300px;
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
