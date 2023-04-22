<template>
  <q-page class="flex flex-center column bg-dark-purple h-100p px-160">
    <background-spot />

    <main class="text-white container" style="z-index: 1">
      <c-chapter-page
        title="1Т Клуб"
        section-classes="flex"
        title-classes="text-h1"
        subtitle="1Т Клуб - сообщество единомышленников, которых объединяет страсть к работе и саморазвитию"
        subtitle-classes="text-subtitle2 q-my-md"
        header-classes="col"
        content-classes="col-1"
      >
        <template #header-append>
          <q-btn
            no-caps
            class="bg-gradient font-size-24 q-px-xl q-mt-xl"
            label="Вступить в клуб"
          />
        </template>

        <template #chapter-content>
          <q-img style="width: 480px" src="src/assets/images/amico.svg" />
        </template>
      </c-chapter-page>

      <c-chapter-page
        title="Выберите направление"
        section-classes="text-center"
        title-classes="text-h1"
        subtitle="Выберите интересующий вас профиль и мы поможем вам познакомиться с платформой или сделать это самостоятельно."
        subtitle-classes="text-subtitle1 club-my-32"
      >
        <template #chapter-content>
          <card-group :directions="cardsList" />
        </template>
      </c-chapter-page>

      <c-chapter-page
        section-classes="text-center"
        subtitle="Почетные участники 1Т Клуба"
        subtitle-classes="text-subtitle1 club-mt-80"
      >
        <template #title>
          <div class="flex justify-between">
            <div
              v-for="statistic in statisticsList"
              :key="statistic.id"
              class="text-h1"
            >
              {{ statistic.value }}
              <div class="text-h2">{{ statistic.title }}</div>
            </div>
          </div>
        </template>

        <template #chapter-content>
          <div class="partitians-faces relative-position">
            <partitian :index="index" v-for="index in 33" :key="index" />
          </div>
        </template>
      </c-chapter-page>

      <c-chapter-page
        title="О Клубе за 1 минуту"
        title-classes="text-h3 q-mb-md"
        content-classes="flex justify-between"
      >
        <template #chapter-content>
          <p class="text-subtitle2" style="max-width: 348px">
            Мы проводим мероприятия и даём рекомендации участникам 1Т Клуба для
            их профессионального развития в IT, бизнесе и инвестировании. У нас
            можно найти специалистов и партнеров для совместной работы, а также
            обмениваться знаниями и опытом.
          </p>

          <q-video
            class="video"
            src="https://www.youtube.com/watch?v=OJzN26zynP0"
          />
        </template>
      </c-chapter-page>

      <c-chapter-page
        title="1Т Клуб - это масштабная экосистема для развития начинающих специалистов в сфере IT."
        title-classes="text-h3 text-center q-mb-md"
        content-classes="flex justify-between"
      >
        <template #chapter-content>
          <card-group :items="cards" />
        </template>
      </c-chapter-page>

      <c-chapter-page
        title="В 1T Клубе вас ждет:"
        title-classes="text-subtitle1 q-mb-xl"
        content-classes="relative-position"
      >
        <template #chapter-content>
          <step
            v-for="(step, index) in steps"
            :key="step.title"
            :num="index + 1"
            :title="step.title"
            :info="step.info"
          />

          <steps-background />
        </template>
      </c-chapter-page>

      <c-chapter-page
        title="Кому подходит 1Т Клуб"
        title-classes="text-h3"
        section-classes="text-center"
      >
        <template #subtitle>
          <img class="q-mt-md" src="src/assets/images/Vector11.svg" />
        </template>

        <template #chapter-content>
          <categories-group />
        </template>
      </c-chapter-page>

      <c-chapter-page
        title="С нами сотрудничают"
        title-classes="text-h3"
        section-classes="text-center"
        content-classes="row justify-between q-mt-xl"
      >
        <template #chapter-content>
          <img
            v-for="partner in partners"
            :key="partner.id"
            :src="partner.imageUrl"
          />
        </template>
      </c-chapter-page>

      <c-chapter-page section-classes="flex justify-center">
        <template #chapter-content>
          <div class="join text-center justify-center">
            <div class="text-subtitle1">
              Сделате шаг навстречу будущему и будьте с нами!
            </div>

            <q-btn
              no-caps
              class="bg-gradient club-mt-32 text-body2"
              label="Присоединиться к Клубу"
            />
          </div>
        </template>
      </c-chapter-page>

      <c-chapter-page
        title="Наши продукты"
        title-classes="text-h3"
        section-classes="text-center"
        content-classes="row justify-between"
      >
        <template #chapter-content>
          <product-item
            v-for="product in products"
            :key="product.id"
            v-bind="product"
          />
        </template>
      </c-chapter-page>

      <c-chapter-page
        title="Отзывы"
        title-classes="text-h3 text-center"
        section-classes="container"
      >
        <template #chapter-content>
          <q-list class="row no-wrap comments-list">
            <review-card
              v-for="comment in comments"
              :key="comment.id"
              v-bind="comment"
            />
          </q-list>
        </template>
      </c-chapter-page>

      <c-chapter-page
        title="Наши участники — главный актив клуба"
        subtitle="Нас уже более 1500 человек!
        Наше сообщество основывается на взаимной поддержке. Мы верим, что вместе
        достигнем больших результатов и сможем реализовать самые смелые идеи.
        Присоединяйтесь к нам и становитесь частью большой и дружной команды."
        title-classes="text-h3 text-center"
        subtitle-classes="text-subtitle1 club-mt-32"
        section-classes="container"
      >
        <template #chapter-content>
          <c-community />
        </template>
      </c-chapter-page>

      <c-chapter-page
        title="Как вступить в 1Т Клуб?"
        title-classes="text-h3"
        section-classes="flex justify-between club-px-96"
      >
        <template #prepend-header>
          <div class="relative-position">
            <img src="src/assets/images/cuate.svg" />
            <img
              class="absolute-center"
              src="src/assets/images/Ellipse 70.svg"
              style="z-index: -1"
            />
          </div>
        </template>

        <template #subtitle>
          <p class="club-mw-474 club-mt-72 text-body2">
            Присоединяйтесь к нашему сообществу, пройдя простую регистрацию на
            сайте. Вступайте в 1Т Клуб и станьте частью нашей большой и дружной
            семьи!
          </p>
        </template>
      </c-chapter-page>

      <c-chapter-page title="Часто задаваемые вопросы" title-classes="text-h3">
        <template #chapter-content>
          <dropdown
            v-for="item in dropdown"
            :key="item.title"
            :title="item.title"
            :content="item.content"
          />
        </template>
      </c-chapter-page>

      <c-chapter-page>
        <template #chapter-content>
          <club-contacts />
        </template>
      </c-chapter-page>
    </main>
  </q-page>
</template>

<script setup>
import BackgroundSpot from "src/components/BackgroundSpot.vue";
import CCommunity from "src/components/ClubCommunity.vue";
import ClubContacts from "src/components/ClubContacts.vue";
import CChapterPage from "src/components/ClubChapterPage.vue";
import Partitian from "src/components/ClubPartitian.vue";
import StepsBackground from "src/components/ClubStepsBackgroung.vue";
import Step from "src/components/ClubStep.vue";
import CategoriesGroup from "src/components/ClubCategoriesGroup.vue";
import ProductItem from "src/components/ProductItem.vue";
import ReviewCard from "src/components/ClubReviewCard.vue";
import Dropdown from "src/components/ClubDropdown.vue";
import ClubWriteToUsForm from "src/components/ClubWriteToUsForm.vue";
import ClubContactsSection from "src/components/ClubContactsSection.vue";

import CardGroup from "src/components/ClubCardGroup.vue";
import { ref } from "vue";

const cardsList = ref([
  {
    id: 1,
    title: "Для Бизнеса",
    content: ["Новые партнеры", "Специалисты для развития бизнес-проектов"],
  },
  {
    id: 2,
    title: "Для Работы",
    content: ["Новые заказы", "Стажировка в 1Т Клубе", "Участие в командах"],
  },
  {
    id: 3,
    title: "Для Развития",
    content: ["Онлайн-курсы", "База знаний", "Консультации экспертов"],
  },
]);
const statisticsList = ref([
  { id: 1, value: "200+", title: "заказов" },
  { id: 2, value: "1500+", title: "участников" },
  { id: 3, value: "50+", title: "городов" },
]);
const cards = ref([
  {
    id: 1,
    imageUrl: "src/assets/images/Colloboration.svg",
    title: "Сообщества",
  },
  { id: 2, imageUrl: "src/assets/images/Comand.svg", title: "Команды" },
  { id: 3, imageUrl: "src/assets/images/Projects.svg", title: "Проекты" },
  {
    id: 4,
    imageUrl: "src/assets/images/Accelerator.svg",
    title: "Акселератор",
  },
  { id: 5, imageUrl: "src/assets/images/Mentor.svg", title: "Менторство" },
  {
    id: 6,
    imageUrl: "src/assets/images/Consultation.svg",
    title: "Консультация",
  },
  { id: 7, imageUrl: "src/assets/images/Tools.svg", title: "Инструменты" },
  { id: 8, imageUrl: "src/assets/images/Cubok.svg", title: "Привелегии" },
]);
const steps = ref([
  {
    title: "Нетворкинг",
    info: "Онлайн встречи и офлайн мероприятия для участников 1Т Клуба.Знакомства, обмен опытом и идеями в разных сферах.",
  },
  {
    title: "Командная работа",
    info: "Сформированные команды для решения бизнес задач.Онлайн встречи и офлайн мероприятия для участников 1Т Клуба.Знакомства, обмен опытом и идеями в разных сферах.",
  },
  {
    title: "База знаний",
    info: "Безопасное хранение всех рабочих документов в едином пространстве 1Т Клуба.",
  },
  {
    title: "Управление задачами",
    info: "Сервис внутри 1Т клуба для управления вашим проектом с возможностью следить за процессом в режиме реального времени.",
  },
  {
    title: "Экспертная поддержка",
    info: "Консультации специалистов и сопровождение вашего проекта, начиная с этапа создания технического задания до запуска сайта.",
  },
]);
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
const dropdown = ref([
  {
    title: "Какие требования к участникам Клуба?",
    content: "placeholder",
  },
  {
    title: "Что внутри 1Т Клуба? Какие задачи я смогу решать?",
    content: "placeholder",
  },
  {
    title: "Как вступить в команду команду?",
    content: "placeholder",
  },
  {
    title: "Как оформить заказ в 1Т Клубе?",
    content: "placeholder",
  },
]);
</script>

<style scoped lang="scss">
.q-page {
  overflow: hidden;
}

.partitians {
  &-faces {
    margin-top: 58px;
    height: 338px;
  }
}

.video {
  width: 640px;
  height: 457px;
  border-radius: 10px;
}

.join {
  max-width: 816px;
  min-height: 192px;

  padding: 32px;

  background: rgba(135, 32, 148, 0.197);
  box-shadow: inset 8px -8px 32px rgba(103, 24, 112, 0.2),
    inset -12px 12px 32px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(53.01px);

  border-radius: 12px;
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

.club-mw-474 {
  max-width: 474px;
}

.club-px-96 {
  padding: 0 96px;
}
</style>
