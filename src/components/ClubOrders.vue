<template>
  <div>
    <c-orders-item
      v-for="item in items"
      :item="item"
      :key="item.id"
    />
  </div>
</template>

<script setup>
import COrdersItem from 'src/components/ClubOrderItem.vue'
import {ref} from "vue";

const items = ref([
  { number: "1260", name: "Лендинг чайного магазина", state: "Поиск исполнителя", date: "24.05.2023" },
  { number: "1257", name: "Создание платформы для начинающих мастеров", state: "Есть кандидат", date: "20.05.2023" },
  { number: "1255", name: "Поддержка программного обеспечения фитнесс центра ", state: "Выполняется", date: "19.05.2023" },
  { number: "1250", name: "Обеспечение сохранности и безопасности данных агенства недвижимости", state: "Завершен", date: "18.05.2023" },
  { number: "1249", name: "Оптимизация ИТ-инфраструктуры для банка «Яблоко банк»", state: "Отменен заказчиком", date: "17.05.2023" },
  { number: "1247", name: "Миграция на новые годные ИТ-решения нашей строительной компании «Кирпич»", state: "Черновик", date: "16.05.2023" },
]);

</script>
<style scoped>
</style>
