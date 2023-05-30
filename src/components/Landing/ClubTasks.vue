<template>
  <h3 class="text-h3 text-center c-mb-64">Выполненные заказы 1Т Клуба</h3>

  <Carousel :itemsToShow="2" :wrapAround="true" :transition="500" ref="carousel" class="c-mb-40">
    <Slide v-for="slide in contentList" :key="slide">
      <div class="row justify-between carousel__item">
        <q-img :src="slide.image" alt="" class="col-4 text-left carousel__img"></q-img>

        <div class="col text-left flex column justify-between text-block">
          <div class="text-top">
            <div v-if="slide.sex === 'M'" class="text-body1 q-mb-sm">Решил запрос:</div>

            <div v-else class="text-body1 q-mb-sm">Решила запрос:</div>

            <div class="text-body2 text-content q-mb-sm">
              «{{ slide.name }}» — {{ slide.content }}
            </div>
            <div v-if="slide.time" class="text-body1">
              Срок выполнения
              <span class="text-body2">— {{ slide.time }} {{ monthString(slide) }}</span>
            </div>
            <!-- <div v-if="slide.experience">
              <div v-if="slide.sex === 'M'" class="text-body1">Перенял опыт:</div>

              <div v-else class="text-body1">Переняла опыт:</div>

              <div class="text-body2 text-content">{{ slide.experience }}</div>
            </div> -->
          </div>

          <div class="text-bottom">
            <a class="text-body1 more" :href="slide.url">Подробнее</a>
            <!-- <div class="text-subtitle4">{{ slide.name }}</div>

            <div class="text-body2 text-violet">{{ slide.profession }}</div> -->
          </div>
        </div>
      </div>
    </Slide>
  </Carousel>

  <div class="text-center c-mb-160">
    <q-btn
      @click="carousel.prev()"
      unelevated
      dense
      size="xl"
      class="q-mr-md"
      :icon="'chevron_left'"
    />
    <q-btn
      @click="carousel.next()"
      unelevated
      dense
      size="xl"
      class="q-mr-md"
      :icon="'chevron_right'"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const carousel = ref(null);

const contentList = ref([
  {
    id: 1,
    slide: 1,
    name: "Машук",
    sex: "M",
    content:
      "образовательный центр. Наша задача — разработать дизайн сайта с учетом корпоративного стиля, брендинга и цветовой гаммы компании. Необходимо использовать современные тенденции в дизайне, учитывая требования пользователя и целевой аудитории. Верстка сайта должна быть адаптивна, т.е. подстраиваться под размер и ориентацию любого девайса.",
    image: "/assets/images/landing-business/tasks/mashuk.svg",
    time: 2,
    url: "",
  },
  {
    id: 2,
    slide: 2,
    name: "Московские ведомости",
    sex: "M",
    content:
      "сетевое издание редакции. Наша задача — разработать современный сайт в минималистичном дизайне. Дизайн сайта должен соответствовать выбранной клиентом светлой цветовой гамме, содержать информационные элементы. Верстка сайта должна быть адаптивна, т.е. подстраиваться под размер и ориентацию любого девайса.",
    image: "/assets/images/landing-business/tasks/mos_ved.svg",
    time: 1,
    url: "",
  },
  {
    id: 3,
    slide: 3,
    name: "МАКО",
    sex: "M",
    content:
      "ассоциация граждан и организаций по содействию развитию корпоративного образования Наша задача — разработать удобный, современный сайт. Дизайн сайта должен быть эргономичен, функционален, соответствовать заявленной цветовой гамме. Верстка сайта должна быть адаптивна, т.е. подстраиваться под размер и ориентацию любого девайса. Проект находится на финальной стадии разработки.",
    image: "/assets/images/landing-business/tasks/mako.svg",
    time: null,
    url: "",
  },
  // {
  //   id: 1,
  //   slide: 1,
  //   name: "Александр Грефов",
  //   sex: "M",
  //   profession: "Маркетинговое агенство",
  //   solution:
  //     "Нашел тимлида в отделе менеджмента благодаря сообществу, которое помогло закрыть вакансию. Очень доволен новым членом команды! На мой запрос накидали проверенных IT-специалистов, выбирал из них.",
  //   experience:
  //     "И все ещё перенимаю! Очень полезно видеть, как у других устроены оргструктуры. Это позволяет улучшать  и мои процессы в компании.",
  //   image: "/assets/images/landing-business/tasks/a_grefov.jfif",
  //   time: "2 месяца",
  // },
  // {
  //   id: 2,
  //   slide: 2,
  //   name: "Оксана Малькова",
  //   sex: "W",
  //   profession: "Интернет-магазин",
  //   solution:
  //     "Не было понимания, как развивать один из моих проектов. Пообщавшись с нескольким резидентами, поняла, как сделать pivot, и процесс пошел.",
  //   experience:
  //     "Участвую в событиях образовательного трека, чтобы обновлять и совершенствовать свои навыки.",
  //   image: "/assets/images/landing-business/tasks/o_malkova.jfif",
  //   time: "1 месяц",
  // },
  // {
  //   id: 3,
  //   slide: 3,
  //   name: "Тимур Пеньков",
  //   sex: "M",
  //   profession: "Личный бренд",
  //   solution:
  //     "В 1Т Клубе нашел маркетолога, который полностью закрыл наши задачи. Еще в Клубе также нашел IT-специалистов по другим специальностям, которые мне были очень нужны, но я не мог на них выйти. Это позволило мне сэкономить много времени.",
  //   experience: null,
  //   image: "/assets/images/landing-business/tasks/t_penkov.jfif",
  //   time: null,
  // },
  // {
  //   id: 4,
  //   slide: 4,
  //   name: "Арсений Шерстнев",
  //   sex: "M",
  //   profession: "Сайт для фитнес-клуба",
  //   solution:
  //     "Для нашего фитнес-клуба долго искали команду разработчиков CRM системы. В 1Т Клубе подобрали квалифицированных IT-специалистов, которые быстро справились с поставленной задачей.",
  //   experience: null,
  //   image: "/assets/images/landing-business/tasks/a_sherstnev.jfif",
  //   time: null,
  // },
  // {
  //   id: 5,
  //   slide: 5,
  //   name: "Артем Янинов",
  //   sex: "M",
  //   profession: "Запуск стартапа",
  //   solution:
  //     "Был творческий кризис в гипотезах кратного роста маркетинга. Последнюю пару лет топчемся в одном результате, хочется вырасти. И благодаря одному из экспертов 1Т Клуба натолкнулись на идею сильного промоушн-мероприятия. Сейчас в стадии запуска.Это одна из многих полезностей, которые я получаю для своей компании в рамках 1Т Клуба.",
  //   experience: null,
  //   image: "/assets/images/landing-business/tasks/a_ayninov.jfif",
  // },
]);

const monthString = (slide) => {
  switch (slide.time) {
    case 1:
      return "месяц";

    case 2 || 3 || 4:
      return "месяца";

    default:
      return "месяцев";
  }
};
</script>
<style scoped lang="scss">
* {
  box-sizing: border-box;
}
.container {
  margin-bottom: 160px;
}
.bold {
  font-weight: 900;
}
.carousel {
  &__img {
    width: 100%;
    max-width: 250px;
    min-width: 250px;
    border-radius: 10px 0 0 10px;
  }
  &__item {
    height: 420px;
    width: 646px;
    background: linear-gradient(
      101.5deg,
      rgba(16, 5, 34, 0.15) 37.03%,
      rgba(255, 255, 255, 0.1) 80.19%,
      rgba(16, 5, 34, 0.15) 100%
    );
    border: 2px solid rgba(63, 63, 70, 0.7);
    color: white;
    border-radius: 12px;
  }
  &__viewport {
    perspective: 2000px;
  }
  &__track {
    transform-style: preserve-3d;
  }
  &__slide {
    opacity: 1;
    transform: scale(1);
    &--sliding {
      transition: 0.5s;
    }
    &--prev {
      opacity: 0.5;
      transform: translateY(-5%) scale(0.9);
    }
    &--next {
      opacity: 0.5;
      transform: translateY(-5%) scale(0.9);
    }
  }
}
.text {
  &-block {
    padding: 24px;
  }
  &-content {
    max-width: 345px;
  }
  &-violet {
    color: #9043b4;
  }
}
.more {
  color: white;
  text-decoration: none;
  &::after {
    content: url("/assets/icons/arrow/arrow-right-small.svg");
    margin-left: 17px;
  }
}
</style>
