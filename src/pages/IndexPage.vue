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
      <join/>
      <products/>

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
import Join from "src/components/ClubJoin.vue";
import Products from "src/components/ClubProducts.vue";
import BackgroundSpot from "src/components/BackgroundSpot.vue";
import ReviewCard from "src/components/ReviewCard.vue";
import { ref } from "vue";





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
</style>
