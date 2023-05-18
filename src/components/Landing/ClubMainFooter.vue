<template>
  <q-footer class="footer px-160">
    <div class="flex q-pt-lg" style="width: 100%">
      <section class="col relative">
        <q-img src="/assets/images/logo-white.svg" class="footer-logo" />

        <div class="flex q-gutter-x-md q-mt-lg">
          <div
            v-for="social in socials"
            :key="social.id"
            style="width: 24px; height: 24px"
          >
            <q-img :src="social.imageUrl" />
          </div>
        </div>

        <div
          class="q-mt-xl text-center"
          style="width: max-content; margin-bottom: 22px"
        >
          © 1Т.Club<br />
          2023
        </div>
      </section>

      <section class="q-gutter-y-lg col">
        <div class="text-16 q-mb-sm">Навигация</div>

        <div v-for="n in 3" :key="n">Какой-то раздел</div>
      </section>

      <section class="q-gutter-y-lg col">
        <div class="text-16 q-mb-sm">Контакты</div>

        <div v-for="contact in contacts" :key="contact.id" class="flex">
          <q-img :src="contact.imageUrl" style="max-width: 22px" />

          <div class="text-16 q-ml-sm">
            {{ contact.text }}
          </div>
        </div>
      </section>

      <section class="flex column">
        <div class="text-16 q-md-sm">Приложения</div>

        <q-btn color="white club-mt-32">
          <q-img
            style="width: 24px"
            src="/assets/icons/socials/google-play.svg"
          />

          <div class="q-ml-sm text-left" style="color: #333333">
            <span class="store-btn-text1"> Загрузите в </span>
            <br />
            <span class="store-btn-text2"> Google Play </span>
          </div>
        </q-btn>

        <q-btn class="q-mt-md" color="white">
          <q-img style="width: 24px" src="/assets/icons/socials/apple.svg" />

          <div class="q-ml-sm text-left" style="color: #333333">
            <span class="store-btn-text1">Загрузите в</span>
            <br />
            <span class="store-btn-text2">App Store</span>
          </div>
        </q-btn>
      </section>
    </div>
  </q-footer>
</template>

<script setup>
import { ref } from "vue";

const contacts = ref([
  {
    id: 1,
    imageUrl: "/assets/icons/geodata/geodata-white.svg",
    text: "Text",
  },
  {
    id: 2,
    imageUrl: "/assets/icons/mail/mail-white.svg",
    text: "Text@Text.ru",
  },
  {
    id: 3,
    imageUrl: "/assets/icons/phone/phone-white.svg",
    text: "+7 (999) 999 99 99",
  },
]);

const socials = ref([
  { id: 1, imageUrl: "/assets/icons/socials/vk-white.svg" },
  { id: 2, imageUrl: "/assets/icons/socials/youtube-white.svg" },
  { id: 3, imageUrl: "/assets/icons/socials/telegram-white.svg" },
]);
</script>

<style scoped lang="scss">
.footer {
  background: #0d0519;

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
</style>
