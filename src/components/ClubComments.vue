<template>
  <section class="comments container">
        <div class="header-text-32 text-center">Отзывы</div>

        <q-list class="row no-wrap comments-list" >
          <review-card v-for="comment in comments" :key="comment.id" v-bind="comment" />
        </q-list>
      </section>
</template>

<script setup>
import ReviewCard from "src/components/ClubReviewCard.vue";
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
  {
    id: 3,
    avatarUrl: "src/assests/images/Ellipse55.svg",
    fullname: "Александр Иванов",
    jobTitle: "Менеджер",
    content:
      "Честно говоря, я был сильно удивлен, что несмотря на разные результаты, масштабы бизнеса, опыт, все с кем мне приходилось общаться в клубе, невероятно доброжелательные, открытые и близкие по духу люди. также с помощью клуба нашел двух специалистов для решения своей задачи.",
    stars: 5,
  },
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

<style lang="scss" scoped>
.comments {
  margin-top: 124px;
}

.comments-list {
  margin-top: 50px;
  overflow-x: auto;
  width: 100%;
}

.comments-list,
.comments-list .card {
  transform: rotateX(180deg);
}
</style>
