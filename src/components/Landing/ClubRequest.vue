<template>
  <section
    class="text-white column flex-center c-mb-160 container"
    style="overflow: hidden; z-index: 0"
  >
    <section class="text-center">
      <h2 class="text-h2 c-mb-24">Оставить заявку</h2>
      <p class="text-subtitle2 c-mb-32">Расскажите нам о проекте, после мы свяжемся с вами</p>
    </section>

    <q-form class="form" ref="formRef" @submit.prevent="sendEmail">
      <div class="c-gutter-y-32">
        <section class="row c-gutter-x-32">
          <c-label-control class="col" label="Ваше имя" label-class="text-subtitle4">
            <template #control>
              <q-input
                v-model="form.name"
                borderless
                placeholder="Иван Иванов"
                class="c-input-landing bg-white test"
              >
                <template v-slot:append>
                  <q-icon class="star" name="img:/assets/icons/form/star.svg" />
                </template>
              </q-input>
            </template>
          </c-label-control>

          <c-label-control class="col" label="Почта для связи" label-class="text-subtitle4">
            <template #control>
              <q-input
                v-model="form.email"
                borderless
                placeholder="example@me.ru"
                class="c-input-landing bg-white"
              >
                <template v-slot:append>
                  <q-icon class="star" name="img:/assets/icons/form/star.svg" /> </template
              ></q-input>
            </template>
          </c-label-control>
        </section>

        <section class="row c-gutter-x-32">
          <c-label-control class="col" label="Название компании" label-class="text-subtitle4">
            <template #control>
              <q-input
                v-model="form.company_name"
                borderless
                placeholder="1T Sprint"
                class="c-input-landing bg-white"
              />
            </template>
          </c-label-control>

          <c-label-control class="col" label="Телефон для связи" label-class="text-subtitle4">
            <template #control>
              <q-input
                mask="+7 ( ### ) ### - ## - ##"
                v-model="form.phone_number"
                placeholder="+7 ( ___ ) ___ - __ - __"
                borderless
                class="c-input-landing bg-white ph"
              />
            </template>
          </c-label-control>
        </section>

        <section class="row">
          <c-label-control
            class="col"
            label="Сообщение"
            label-class="text-subtitle4"
            control-style="height: 130px"
          >
            <template #control>
              <q-input
                borderless
                autogrow
                v-model="form.message"
                placeholder="Расскажите, чем вас заинтересовал 1T Клуб"
                type="textarea"
                class="c-input-landing gray-scrollbar-input c-input-area-mh bg-white"
              />
            </template>
          </c-label-control>
        </section>

        <section class="row c-gutter-x-32">
          <q-btn
            no-caps
            flat
            class="club-button-background text-subtitle4 submit-btn"
            label="Оставить заявку"
            :disable="!isAccept"
            type="submit"
          />

          <!-- <c-recaptcha /> -->

          <div class="flex no-wrap flex-center">
            <q-checkbox
              v-model="isAccept"
              class="c-checkbox-violet-2 c-checkbox-white-b c-checkbox-rounded"
            />

            <span class="text-caption1">
              <span @click="isAccept = !isAccept">Я согласен на обработку </span>
              <a class="text-white" href="#">персональных данных</a>
            </span>
          </div>
        </section>
      </div>
    </q-form>

    <q-dialog v-model="alert.success">
      <q-card class="text-center text-white position-relative form-popup">
        <q-card-section class="q-pa-none form-popup-title">
          <p class="text-subtitle3 q-ma-none">Заявка успешно отправлена</p>
        </q-card-section>

        <q-card-section class="q-pa-none q-ma-none form-popup-subtitle">
          <p class="text-subtitle5 q-ma-none">Спасибо за обратную связь, скоро с вами свяжутся</p>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-none q-ma-none form-popup-cross">
          <q-btn size="12px" flat round dense v-close-popup>
            <q-icon class="form-popup-cross-icon" name="img:/assets/icons/form/cross.svg"></q-icon>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="alert.error">
      <q-card class="text-center text-white position-relative form-popup">
        <q-card-section class="q-pa-none form-popup-title">
          <p class="text-subtitle3 q-ma-none">Вы допустили ошибку</p>
        </q-card-section>

        <q-card-section class="q-pa-none q-ma-none form-popup-subtitle">
          <p class="text-subtitle5 q-ma-none">{{ alert.errorText }}</p>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-none q-ma-none form-popup-cross">
          <q-btn size="12px" flat round dense v-close-popup>
            <q-icon class="form-popup-cross-icon" name="img:/assets/icons/form/cross.svg"></q-icon>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="alert.serverError">
      <q-card class="text-center text-white position-relative form-popup">
        <q-card-section class="q-pa-none form-popup-title">
          <p class="text-subtitle3 q-ma-none">Произошла ошибка</p>
        </q-card-section>

        <q-card-section class="q-pa-none q-ma-none form-popup-subtitle">
          <p class="text-subtitle5 q-ma-none">Попробуйте отправить заявку позже</p>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-none q-ma-none form-popup-cross">
          <q-btn size="12px" flat round dense v-close-popup>
            <q-icon class="form-popup-cross-icon" name="img:/assets/icons/form/cross.svg"></q-icon>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <section style="z-index: -1">
      <q-img
        class="absolute"
        style="top: 20px; left: -100px"
        src="/assets/images/customer-application/bg-1.svg"
      />
    </section>
  </section>
</template>

<script setup>
import CLabelControl from "src/components/ClubLabelControl.vue";
// import CRecaptcha from "src/components/ClubRecaptcha.vue";
import emailjs from "@emailjs/browser";
import { computed, ref } from "vue";

const isAccept = ref(false);

const alert = ref({
  success: false,
  error: false,
  serverError: false,
  errorText: "",
});

const formRef = ref(null);

const form = ref({
  name: "",
  email: "",
  company_name: "",
  phone_number: "",
  message: "",
});

const sendEmail = () => {
  if (!form.value.name) {
    alert.value.errorText = "Поле 'Ваше имя' обязательно для заполнения";
    alert.value.error = !alert.value.error;
  } else if (!form.value.email) {
    alert.value.errorText = "Поле 'Почта для связи' обязательно для заполнения";
    alert.value.error = !alert.value.error;
  } else if (!/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i.test(form.value.email)) {
    alert.value.errorText = "Некорректно введена почта";
    alert.value.error = !alert.value.error;
  } else {
    emailjs
      .send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        form.value,
        process.env.EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          alert.value.success = !alert.value.success;
          form.value = {
            name: "",
            email: "",
            company_name: "",
            phone_number: "",
            message: "",
          };
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert.value.serverError = !alert.value.serverError;
        }
      );
  }
};

console.log();
</script>

<style scoped lang="scss">
.container {
  max-width: 1120px;
}
.form {
  width: 100%;

  padding: 64px 96px;

  background: linear-gradient(99.53deg, #351d59 0%, #521a58 100%);
  border-radius: 30px;

  &-message__wrapper {
    height: 130px;
  }
  &-popup {
    width: 100%;
    max-width: 733px;
    min-height: 262px;
    background: linear-gradient(99.53deg, #512d55 0%, #523382 100%);
    border-radius: 25px;
    &-title {
      margin-top: 96px;
      margin-bottom: 10px;
    }
    &-cross {
      position: absolute;
      top: 17px;
      right: 17px;

      &-icon {
        height: 12px;
        width: 12px;
      }
    }
  }
}
.submit-btn {
  padding: 16px 32px;
}
.star {
  width: 12px;
  height: 12px;
}
</style>
