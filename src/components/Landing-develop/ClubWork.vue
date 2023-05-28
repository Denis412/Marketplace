<template>
  <section class="section-mb">
    <h2 class="text-h2 text-center c-mb-90">Cтажировка В СФЕРЕ IT</h2>
    <q-list class="work-list relative-position">
      <q-item v-for="item in workList" :key="item.id" class="work-item">
        <q-item-section class="work-item-counter flex-center">
          <h2 class="text-h2">{{ item.id }}</h2>
        </q-item-section>

        <q-item-section class="c-ml-64"
          ><p class="section text-subtitle2">{{ item.description }}</p>
        </q-item-section>
      </q-item>
    </q-list>
  </section>
</template>

<script setup>
import { ref } from "vue";

const workList = [
  {
    id: 1,
    description: "Проходите  IT-стажировку после или во время обучения",
  },
  {
    id: 2,
    description: "Стартуйте в крупной компании, получайте первый опыт в IT и зарабатывайте",
  },
  {
    id: 3,
    description: "Пополняйте портфолио кейсами от известных компаний",
  },
];
</script>

<style lang="scss" scoped>
.work- {
  &list {
    max-width: 928px;
    margin: 0 auto;

    &::before {
      content: "";
      position: absolute;
      width: 1px;
      left: 50px;
      height: 100%;
      border-left: 2px dashed rgba(76, 29, 149, 1);
    }
  }

  &item {
    margin-bottom: 140px;
    padding: 0;

    &-counter {
      width: 100px;
      height: 100px;
      background: linear-gradient(101.75deg, #4c1d95 4.25%, #881d95 96.95%);
      border-radius: 100px;
      flex: none;
    }
  }
}

.section {
  margin: 0;
}

.section-mb{
  margin-bottom: 170px;
}
</style>
