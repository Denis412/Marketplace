<template>
  <q-page class="flex flex-center column bg-dark-purple h-100p">
    <background-spot />

    <main class="text-white" style="z-index: 1">

      <main-screen />
      <directions />
      <statistics />
      <partitians />
      <about/>
      <items/>
      <steps/>
      <clients/>
      <partners/>



      <section class="flex flex-center section-margin">
        <div class="section-container text-center flex items-between justify-center">
          <div style="
                                    font-size: 28px;
                                    line-height: 36px;
                                    font-weight: 400;
                                    margin-bottom: 32px;
                                  ">
            Сделате шаг навстречу будущему и будьте с нами!
          </div>

          <q-btn no-caps class="bg-gradient" style="font-size: 18px" label="Присоединиться к Клубу" />
        </div>
      </section>

      <section class="section-margin">
        <div class="text-center header-text-32">Наши продукты</div>

        <q-list class="flex flex-center" style="margin-left: -76px">
          <product-item style="margin-left: 76px" v-for="product in products" :key="product.id" v-bind="product" />
        </q-list>
      </section>

      <section class="flex column flex-center section-margin">
        <div class="header-text-32 text-center">Отзывы</div>

        <q-list class="flex flex-center no-wrap" style="
                                  margin-left: -30px;
                                  margin-top: 32px;
                                  overflow-x: auto;
                                  max-width: 1200px;
                                ">
          <review-card style="margin-left: 30px" v-for="comment in comments" :key="comment.id" v-bind="comment" />
        </q-list>
      </section>
    </main>
  </q-page>
</template>

<script setup>
import MainScreen from "src/components/ClubMainScreen.vue"
import Directions from "src/components/ClubDirections.vue";
import Statistics from "src/components/ClubStatistics.vue";
import Partitians from "src/components/ClubParticipants.vue";
import Steps from "src/components/ClubSteps.vue";
import Items from "src/components/ClubItems.vue";
import About from "src/components/ClubAbout.vue";
import Clients from "src/components/ClubClients.vue";
import Partners from "src/components/ClubPartners.vue";
import BackgroundSpot from "src/components/BackgroundSpot.vue";
import ProductItem from "src/components/ProductItem.vue";
import ReviewCard from "src/components/ReviewCard.vue";
import { ref } from "vue";



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
