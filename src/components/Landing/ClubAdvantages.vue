<template>
  <section class="text-center c-mb-160">
    <h3 class="text-h3 c-mb-64">НАШИ ПРЕИМУЩЕСТВА</h3>
    <c-advantages-list class="horizontal-scroll-wrapper squares" :content-list="contentList" />
  </section>
</template>
<script setup>
import CAdvantagesList from "./ClubAdvantagesList.vue";
import { ref } from "vue";

const contentList = [
  {
    id: 1,
    content: "Оценка квалификации IT-специалиста с помощью тестового задания",
  },
  {
    id: 2,
    content:
      "Услуги наставника, который доступно объяснит информацию по разработке и продвижению IT-проекта",
  },
  {
    id: 3,
    content: "Выбор IT-специалиста или IT-команды по рейтингу и отраслям",
  },
  {
    id: 4,
    content:
      "Возможность наблюдать за работой над IT-проектом с помощью сервиса для управления задачами",
  },
];
</script>

<style scoped lang="scss">
$finalHeight: 250px;
$finalWidth: 3 * $finalHeight;
$scrollBarHeight: 1px;

::-webkit-scrollbar {
  width: $scrollBarHeight;
  height: $scrollBarHeight;
}

::-webkit-scrollbar-button {
  width: $scrollBarHeight;
  height: $scrollBarHeight;
}

body {
  background: #111;
}

div {
  box-sizing: border-box;
}

.horizontal-scroll-wrapper {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: calc(#{$finalHeight} + #{$scrollBarHeight});
  max-height: $finalWidth;
  margin: 0;
  padding-top: $scrollBarHeight;
  background: #abc;
  overflow-y: auto;
  overflow-x: hidden;
  transform: rotate(-90deg) translateY(-$finalHeight);
  transform-origin: right top;
}

.squares {
  padding: $finalHeight 0 0 0;
  & > div {
    width: $finalHeight;
    height: $finalHeight;
    margin: 10px 0;
  }
}
</style>
