<template>
  <section class="text-center container">
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
              icon="img:/assets/icons/arrow/arrow-left-white.svg"
              @click="$refs.carousel.previous()"
            />
            <span class="text-subtitle5 counter">{{ currentSlide }}/{{ contentList.length }}</span>
            <q-btn
              fab
              padding="0"
              text-color="white"
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
      "ITitans - команда активных, молодых специалистов, готовых воплощать в жизнь все смелые идеи заказчика в условиях полного Agile.",
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
          "/assets/images/landing-business/teams/E_Kurshina.jfif",
          "/assets/images/landing-business/teams/O_Buramenskaya.jfif",
        ],
      },
      {
        slide: 2,
        name: ["Лилия Габриелян", "Елена Москвина"],
        profession: ["UI/UX - Дизайнер", "Digital-маркетолог"],
        image: [
          "/assets/images/landing-business/teams/L_Gabrielyan.jfif",
          "/assets/images/landing-business/teams/E_Moskvina.jfif",
        ],
      },
      {
        slide: 3,
        name: ["Татьяна Новикова", "Галина Боровкова"],
        profession: ["Системный аналитик", "Web-разработчик"],
        image: [
          "/assets/images/landing-business/teams/T_Novikova.jfif",
          "/assets/images/landing-business/teams/G_Borovkova.jfif",
        ],
      },
    ],
  },
  {
    id: 2,
    slide: "TEAM 2",
    name: "TEAM 2",
    content:
      "ITitans - команда активных, молодых специалистов, готовых воплощать в жизнь все смелые идеи заказчика в условиях полного Agile.",
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
          "/assets/images/landing-business/teams/E_Kurshina.jfif",
          "/assets/images/landing-business/teams/O_Buramenskaya.jfif",
        ],
      },
      {
        slide: 2,
        name: ["Лилия Габриелян", "Елена Москвина"],
        profession: ["UI/UX - Дизайнер", "Digital-маркетолог"],
        image: [
          "/assets/images/landing-business/teams/L_Gabrielyan.jfif",
          "/assets/images/landing-business/teams/E_Moskvina.jfif",
        ],
      },
      {
        slide: 3,
        name: ["Татьяна Новикова", "Галина Боровкова"],
        profession: ["Системный аналитик", "Web-разработчик"],
        image: [
          "/assets/images/landing-business/teams/T_Novikova.jfif",
          "/assets/images/landing-business/teams/G_Borovkova.jfif",
        ],
      },
    ],
  },
  {
    id: 3,
    slide: "TEAM 3",
    name: "TEAM 3",
    content:
      "ITitans - команда активных, молодых специалистов, готовых воплощать в жизнь все смелые идеи заказчика в условиях полного Agile.",
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
          "/assets/images/landing-business/teams/E_Kurshina.jfif",
          "/assets/images/landing-business/teams/O_Buramenskaya.jfif",
        ],
      },
      {
        slide: 2,
        name: ["Лилия Габриелян", "Елена Москвина"],
        profession: ["UI/UX - Дизайнер", "Digital-маркетолог"],
        image: [
          "/assets/images/landing-business/teams/L_Gabrielyan.jfif",
          "/assets/images/landing-business/teams/E_Moskvina.jfif",
        ],
      },
      {
        slide: 3,
        name: ["Татьяна Новикова", "Галина Боровкова"],
        profession: ["Системный аналитик", "Web-разработчик"],
        image: [
          "/assets/images/landing-business/teams/T_Novikova.jfif",
          "/assets/images/landing-business/teams/G_Borovkova.jfif",
        ],
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
