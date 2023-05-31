<template>
  <section class="text-center container c-mb-160">
    <h3 class="text-h3 c-mb-64">Лучшие it-команды 1т клуба</h3>
    <div>
      <q-carousel
        v-model="contentList[0].slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        height="560px"
        ref="carousel"
        class="text-white bg-transparent"
        @update:model-value="func"
      >
        <c-best-teams-item v-for="item in contentList" :key="item.id" v-bind="item" />
        <template v-slot:control>
          <q-carousel-control position="bottom" class="flex flex-center gap">
            <q-btn
              fab
              padding="0"
              text-color="white"
              :disable="currentSlide === 1"
              icon="img:/assets/icons/arrow/arrow-left-white.svg"
              @click="$refs.carousel.previous()"
            />
            <span class="text-subtitle5 counter">{{ currentSlide }}/{{ contentList.length }}</span>
            <q-btn
              fab
              padding="0"
              text-color="white"
              :disable="currentSlide === contentList.length"
              icon="img:/assets/icons/arrow/arrow-right-white.svg"
              @click="$refs.carousel.next()"
            />
          </q-carousel-control>
        </template>
      </q-carousel>
    </div>
  </section>
</template>

<script setup>
import CBestTeamsItem from "./ClubBestTeamsItem.vue";
import { ref } from "vue";
const currentSlide = ref(1);
const contentList = ref([
  {
    id: 1,
    slide: "ITitans",
    name: "ITitans",
    content:
      "ITitans - команда активных, молодых специалистов, готовых воплощать в жизнь все смелые идеи заказчика в условиях полного Agile",
    links: [
      { label: "Лендинг", url: "" },
      { label: "Промосайт", url: "" },
      { label: "...", url: "" },
    ],
    teammates: [
      {
        slide: 1,
        name: ["Екатерина Куршина", "Оксана Бураменская"],
        profession: ["Руководитель проектов", "UI/UX - Дизайнер"],
        image: [
          "/assets/images/landing-business/teams/E_Kurshina.png",
          "/assets/images/landing-business/teams/O_Buramenskaya.png",
        ],
      },
      {
        slide: 2,
        name: ["Лилия Габриелян", "Елена Москвина"],
        profession: ["UI/UX - Дизайнер", "Digital-маркетолог"],
        image: [
          "/assets/images/landing-business/teams/L_Gabrielyan.png",
          "/assets/images/landing-business/teams/E_Moskvina.png",
        ],
      },
      {
        slide: 3,
        name: ["Татьяна Новикова", "Галина Боровкова"],
        profession: ["Системный аналитик", "Web-разработчик"],
        image: [
          "/assets/images/landing-business/teams/T_Novikova.png",
          "/assets/images/landing-business/teams/G_Borovkova.png",
        ],
      },
    ],
  },
  {
    id: 2,
    slide: "WebWave",
    name: "WebWave",
    content:
      "Молодая команда разработки IT продуктов составом в 18 активных участников, готовая покорять индустрию",
    links: [
      { label: "Лендинг", url: "" },
      { label: "Сайт-визитка", url: "" },
      { label: "...", url: "" },
    ],
    teammates: [
      {
        slide: 1,
        name: ["Андреев Егор", "Дмитрий Кулибин"],
        profession: ["Менеджер", "Web-pазработчик"],
        image: [
          "/assets/images/landing-business/teams/E_Andreev.png",
          "/assets/images/landing-business/teams/D_Kylibin.png",
        ],
      },
      {
        slide: 2,
        name: ["Марина Фисун", ""],
        profession: ["UI/UX - Дизайнер", ""],
        image: ["/assets/images/landing-business/teams/M_Fisun.png", ""],
      },
    ],
  },
  {
    id: 3,
    slide: "Pixel Punks",
    name: "Pixel Punks",
    content:
      "Pixel Punks — создаем продающие сайты на основе анализа, проводя UX/UI тесты и используя современный визуальный язык",
    links: [
      { label: "Лендинг", url: "" },
      { label: "Сайт-визитка", url: "" },
      { label: "...", url: "" },
    ],
    teammates: [
      {
        slide: 1,
        name: ["Мещерякова Наталья", "Мельник Константин"],
        profession: ["UI/UX - Дизайнер", "Web-pазработчик"],
        image: [
          "/assets/images/landing-business/teams/N_Mesheryakova.png",
          "/assets/images/landing-business/teams/K_Melnik.png",
        ],
      },
      {
        slide: 2,
        name: ["Зауголкина Анастасия", ""],
        profession: ["Менеджер, дизайнер", ""],
        image: ["/assets/images/landing-business/teams/A_Zaugolkina.png", ""],
      },
    ],
  },
  {
    id: 4,
    slide: "TeamCode",
    name: "TeamCode",
    content:
      "Создаем сайты различного направления и сложности. Реализуем дизайн, адаптив и кроссбраузерность",
    links: [
      { label: "Лендинг", url: "" },
      { label: "Веб-приложения", url: "" },
      { label: "...", url: "" },
    ],
    teammates: [
      {
        slide: 1,
        name: ["Игнаткин Данил", "Червакова Юлия"],
        profession: ["Web-pазработчик", "UI/UX - Дизайнер"],
        image: [
          "/assets/images/landing-business/teams/D_Ignatkin.png",
          "/assets/images/landing-business/teams/U_Chervakova.png",
        ],
      },
      {
        slide: 2,
        name: ["Шаповалова Эльвира", ""],
        profession: ["Менеджер", ""],
        image: ["/assets/images/landing-business/teams/E_Shapovalova.png", ""],
      },
    ],
  },
]);

const func = (value) => {
  currentSlide.value = contentList.value.find((slide) => slide.name === value).id;
};
</script>

<style scoped lang="scss">
.container {
  max-width: 1120px;
}
.counter {
  color: #b9b9b9;
}
.gap {
  gap: 30px;
}
</style>
