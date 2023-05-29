<template>
  <section class="text-white column flex-center c-mb-160" style="overflow: hidden; z-index: 0">
    <section class="text-center">
      <h2 class="text-h2 c-mb-24">Оставить заявку</h2>
      <p class="text-subtitle2 c-mb-32">Расскажите нам о проекте, после мы свяжемся с вами</p>
    </section>

    <q-form class="form">
      <div class="c-gutter-y-32">
        <section class="row c-gutter-x-32">
          <c-label-control class="col" label="Ваше имя" label-class="text-subtitle4">
            <template #control>
              <q-input
                v-model="form.name"
                borderless
                placeholder="Иван Иванов"
                class="c-input-outline-border-none bg-white"
              />
            </template>
          </c-label-control>

          <c-label-control class="col" label="Почта для связи">
            <template #control>
              <q-input
                v-model="form.email"
                borderless
                placeholder="example@me.ru"
                class="c-input-outline-border-none bg-white"
              />
            </template>
          </c-label-control>
        </section>

        <section class="row c-gutter-x-32">
          <c-label-control class="col" label="Название компании">
            <template #control>
              <q-input
                v-model="form.company_name"
                borderless
                placeholder="1T Sprint"
                class="c-input-outline-border-none bg-white"
              />
            </template>
          </c-label-control>

          <c-label-control class="col" label="Телефон для связи">
            <template #control>
              <q-input
                mask="+# (###) ###-##-##"
                v-model="form.phone_number"
                placeholder="+7 ( ___ ) ___ - __ - __"
                borderless
                class="c-input-outline-border-none bg-white"
              />
            </template>
          </c-label-control>
        </section>

        <section class="row">
          <c-label-control class="col" label="Сообщение" control-style="height: 130px">
            <template #control>
              <q-input
                borderless
                autogrow
                v-model="form.message"
                placeholder="Расскажите, чем вас заинтересовал 1T Клуб"
                type="textarea"
                class="c-input-outline-border-none gray-scrollbar-input c-input-area-mh bg-white"
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
          />

          <!-- <c-recaptcha /> -->

          <div class="flex no-wrap flex-center">
            <q-checkbox
              v-model="isAccept"
              class="c-checkbox-violet-6 c-checkbox-white-b c-checkbox-rounded"
            />

            <span class="text-caption1">
              <span @click="isAccept = !isAccept">Я согласен на обработку </span>
              <a class="text-white" href="#">персональных данных</a>
            </span>
          </div>
        </section>
      </div>
    </q-form>

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
import { ref } from "vue";

const isAccept = ref(false);

const form = ref({
  name: "",
  email: "",
  company_name: "",
  phone_number: "",
  message: "",
});
</script>

<style scoped lang="scss">
.form {
  width: 80vw;

  padding: 64px 96px;

  background: linear-gradient(99.53deg, #351d59 0%, #521a58 100%);
  border-radius: 30px;

  &-message__wrapper {
    height: 130px;
  }
}
.submit-btn {
  padding: 16px 32px;
}
</style>
