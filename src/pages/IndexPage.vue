<template>
  <q-page class="flex flex-center column bg-dark-purple h-100p px-160">
    <background-spot />

    <main class="text-white" style="z-index: 1">
      <main-screen />
      <directions />
      <statistics />
      <partitians />

      <section class="section-margin">
        <div class="q-mb-md font-size-32">О Клубе за 1 минуту</div>

        <div class="flex justify-between">
          <div class="font-size-24" style="max-width: 348px">
            Мы проводим мероприятия и даём рекомендации участникам 1Т Клуба для
            их профессионального развития в IT, бизнесе и инвестировании. У нас
            можно найти специалистов и партнеров для совместной работы, а также
            обмениваться знаниями и опытом.
          </div>

          <q-video
            style="width: 640px; height: 457px; border-radius: 10px"
            src="https://www.youtube.com/watch?v=OJzN26zynP0"
          />
        </div>
      </section>

      <section style="margin-top: 215px">
        <div class="text-center header-text-32">
          1Т Клуб - это масштабная экосистема для развития начинающих
          специалистов в сфере IT.
        </div>

        <cards-group />
      </section>

      <section class="section-margin">
        <graph-element />
      </section>

      <section class="flex column flex-center" style="margin-top: 92px">
        <div class="header-text-32">Кому подходит 1Т Клуб</div>

        <q-img
          class="q-mt-md"
          style="max-width: 833px"
          src="src/assets/images/Vector11.svg"
        />

        <categories-group />
      </section>

      <section class="section-margin">
        <div class="text-center header-text-32">С нами сотрудничают</div>

        <q-list
          class="flex flex-center"
          style="margin-left: -32px; margin-top: 41px"
        >
          <q-img
            style="margin-left: 32px; max-width: 256px"
            v-for="partner in partners"
            :key="partner.id"
            :src="partner.imageUrl"
          />
        </q-list>
      </section>

      <section class="flex flex-center section-margin">
        <div
          class="section-container text-center flex items-between justify-center"
        >
          <div
            style="
              font-size: 28px;
              line-height: 36px;
              font-weight: 400;
              margin-bottom: 32px;
            "
          >
            Сделате шаг навстречу будущему и будьте с нами!
          </div>

          <q-btn
            no-caps
            class="bg-gradient"
            style="font-size: 18px"
            label="Присоединиться к Клубу"
          />
        </div>
      </section>

      <section class="section-margin">
        <div class="text-center header-text-32">Наши продукты</div>

        <q-list class="flex flex-center" style="margin-left: -76px">
          <product-item
            style="margin-left: 76px"
            v-for="product in products"
            :key="product.id"
            v-bind="product"
          />
        </q-list>
      </section>

      <section class="flex column flex-center section-margin">
        <div class="header-text-32 text-center">Отзывы</div>

        <q-list
          class="flex flex-center no-wrap"
          style="
            margin-left: -30px;
            margin-top: 32px;
            overflow-x: auto;
            max-width: 1200px;
          "
        >
          <review-card
            style="margin-left: 30px"
            v-for="comment in comments"
            :key="comment.id"
            v-bind="comment"
          />
        </q-list>
      </section>

      <section class="section-margin">
        <club-contacts-form />
      </section>
    </main>
  </q-page>
</template>

<script setup>
import MainScreen from "src/components/ClubMainScreen.vue";
import Directions from "src/components/ClubDirections.vue";
import Statistics from "src/components/ClubStatistics.vue";
import Partitians from "src/components/ClubParticipants.vue";
import CardsGroup from "src/components/CardsGroup.vue";
import BackgroundSpot from "src/components/BackgroundSpot.vue";
import GraphElement from "src/components/GraphElement.vue";
import CategoriesGroup from "src/components/CategoriesGroup.vue";
import ProductItem from "src/components/ProductItem.vue";
import ReviewCard from "src/components/ReviewCard.vue";
import ClubContactsForm from "src/components/ClubContactsForm.vue";

import { ref } from "vue";

const partners = ref([
  { id: 1, imageUrl: "src/assets/images/logoRSO.svg" },
  { id: 2, imageUrl: "src/assets/images/logoRAO.svg" },
  { id: 3, imageUrl: "src/assets/images/logoRosnou.svg" },
  { id: 4, imageUrl: "src/assets/images/logoObrsoyuz.svg" },
]);

const products = ref([
  {
    id: 1,
    title: "Акселератор 1Т Клуб",
    imageUrl: "src/assets/images/Ellipse68.svg",
  },
  {
    id: 2,
    title: "Радио 1Т Клуб",
    imageUrl: "src/assets/images/Ellipse68.svg",
  },
  {
    id: 3,
    title: "Мероприятия 1Т Клуб",
    imageUrl: "src/assets/images/Ellipse68.svg",
  },
]);

const comments = ref([
  {
    id: 1,
    avatarUrl: "src/assets/images/Ellipse55.svg",
    fullname: "Дмитрий Соколов",
    jobTitle: "Дизайнер",
    content:
      "Честно говоря, я был сильно удивлен, что несмотря на разные результаты, масштабы бизнеса, опыт, все с кем мне приходилось общаться в клубе, невероятно доброжелательные, открытые и близкие по духу люди. также с помощью клуба нашел двух специалистов для решения своей задачи.",
    stars: 4,
  },
  {
    id: 2,
    avatarUrl: "src/assets/images/Ellipse54.svg",
    fullname: "Александр Иванов",
    jobTitle: "Менеджер",
    content:
      "Я стал частью большой команды. Для меня это личностный рост и постоянная поддержка. Могу обратиться с любым вопросом и меня услышат. Начал находить решения, как мне эффективнее продвигаться по моим задачам. Сейчас активно принимаю участие в проекте. Я убедился, что замыкаться в своей области и в своем кругу знакомств не дают развития. За это моя благодарность 1Т Клубу.",
    stars: 5,
  },
  // {
  //   id: 3,
  //   avatarUrl: "src/assests/images/Ellipse55.svg",
  //   fullname: "Александр Иванов",
  //   jobTitle: "Менеджер",
  //   content:
  //     "Честно говоря, я был сильно удивлен, что несмотря на разные результаты, масштабы бизнеса, опыт, все с кем мне приходилось общаться в клубе, невероятно доброжелательные, открытые и близкие по духу люди. также с помощью клуба нашел двух специалистов для решения своей задачи.",
  //   stars: 5,
  // },
  // {
  //   id: 4,
  //   avatarUrl: "src/assests/images/Ellipse55.svg",
  //   fullname: "Александр Иванов",
  //   jobTitle: "Менеджер",
  //   content:
  //     "Честно говоря, я был сильно удивлен, что несмотря на разные результаты, масштабы бизнеса, опыт, все с кем мне приходилось общаться в клубе, невероятно доброжелательные, открытые и близкие по духу люди. также с помощью клуба нашел двух специалистов для решения своей задачи.",
  //   stars: 5,
  // },
  // {
  //   id: 5,
  //   avatarUrl: "src/assests/images/Ellipse55.svg",
  //   fullname: "Александр Иванов",
  //   jobTitle: "Менеджер",
  //   content:
  //     "Честно говоря, я был сильно удивлен, что несмотря на разные результаты, масштабы бизнеса, опыт, все с кем мне приходилось общаться в клубе, невероятно доброжелательные, открытые и близкие по духу люди. также с помощью клуба нашел двух специалистов для решения своей задачи.",
  //   stars: 5,
  // },
]);
</script>

<style scoped lang="scss">
.q-page {
  overflow: hidden;
}

.section-container {
  max-width: 772px;
  width: 772px;
  min-height: 192px;
  height: 192px;

  padding: 32px;

  background: rgba(135, 32, 148, 0.197);
  box-shadow: inset 8px -8px 32px rgba(103, 24, 112, 0.2),
    inset -12px 12px 32px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(53.01px);

  border-radius: 12px;
}
</style>
