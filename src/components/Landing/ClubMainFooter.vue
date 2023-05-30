<template>
  <q-footer class="footer px-160 q-pb-xl section-margin">
    <div class="flex q-pt-lg q-py-xl container" style="width: 100%">
      <section class="col relative">
        <img src="/assets/images/Logo_no_gradient.svg" class="footer-logo" />
      </section>

      <section class="q-gutter-y-lg col">
        <div class="text-subtitle4 q-mb-sm">Навигация</div>

        <div class="text-gray5" v-for="n in nav" :key="n">
          <router-link class="link" :to="n.route">{{ n.text }}</router-link>
        </div>
      </section>

      <section class="q-gutter-y-lg col">
        <div class="text-subtitle4 q-mb-sm">Контакты</div>

        <div v-for="contact in contacts" :key="contact.id" class="flex">
          <img :src="contact.imageUrl" style="max-width: 22px" />

          <div class="text-16 q-ml-sm text-gray5">
            {{ contact.text }}
          </div>
        </div>
      </section>

      <div class="flex q-gutter-x-md">
        <div v-for="social in socials" :key="social.id" style="width: 24px; height: 24px">
          <q-img :src="social.imageUrl" />
        </div>
      </div>
    </div>
  </q-footer>
</template>

<script setup>
import { ref } from "vue";

const nav = [
  {
    text: "Для Бизнеса",
    route: "business",
  },
  {
    text: "Для Работы",
    route: "business",
  },
  {
    text: "Для Развития",
    route: "business",
  },
];

const contacts = ref([
  {
    id: 1,
    imageUrl: "/assets/icons/geodata/geodata-white.svg",
    text: "ул. Ростовская набережная д.5",
  },
  {
    id: 2,
    imageUrl: "/assets/icons/mail/mail-white.svg",
    text: "Club@1T.ru",
  },
  {
    id: 3,
    imageUrl: "/assets/icons/phone/phone-white.svg",
    text: "+7 (999) 333-33-07",
  },
]);

const socials = ref([
  { id: 1, imageUrl: "/assets/icons/socials/telegram-white.svg" },
  { id: 2, imageUrl: "/assets/icons/socials/vk-white.svg" },
  { id: 3, imageUrl: "/assets/icons/socials/youtube-white.svg" },
]);
</script>

<style scoped lang="scss">
.link {
  text-decoration: none;
  color: $gray-4;
}
.footer {
  background: #0d0519;
  padding-bottom: 50px !important;
  &-logo {
    width: 56px;
  }
}
.store-btn {
  width: 129px;
  height: 44px;

  &-text1 {
    font-size: 8px;
    line-height: 24px;
    font-weight: 400;
  }

  &-text2 {
    font-size: 12px;
    line-height: 24px;
    font-weight: 500;
  }
}

.footer-logo {
  height: 63px;
  width: 74px;
}
</style>
