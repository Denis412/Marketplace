<template>
  <section class="text-center section-bottom section-mb">
    <h3 class="text-h3 c-mb-64">НАШИ ПРЕИМУЩЕСТВА</h3>
    <div class="card" ref="scroller" @wheel.prevent="onWheel">
      <c-advantages-item
        v-for="item in contentList"
        :key="item.id"
        :item="item"
        class="card--content"
      />
    </div>
  </section>
</template>
<script setup>
import CAdvantagesItem from "./ClubAdvantagesItem.vue";
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

const scroller = ref(null);

const onWheel = (e) => {
  scroller.value.scrollLeft += e.deltaY;
};
</script>

<style scoped lang="scss">
.card {
  min-width: 100%;
  min-height: 200px;
  overflow-x: auto;
  display: flex;
}

.card::-webkit-scrollbar {
  display: none;
}
</style>
