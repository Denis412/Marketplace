<template>
  <div>
    <c-orders-item
      v-for="(item, index) in items"
      :item="item"
      :key="item.id"
      :class="{ 'orderItemColorPink': index % 2 !== 0, 'orderItemLightPink': index === 0, 'theVeryFirstLightPink': index % 2 === 0 && index !== 0 }"
    />
  </div>
</template>

<script setup>
import COrdersItem from 'src/components/ClubOrderItem.vue'
import { ref } from "vue";

const items = ref([
  { id: "4177279091517509819", number: "1260", name: "Лендинг чайного магазина", state: "Поиск исполнителя", date: "24.05.2023", color: "#FF9646" },
  { id: "4448913352824608273", number: "1257", name: "Создание платформы для начинающих мастеров", state: "Есть кандидат", date: "20.05.2023", color: "#521E96" },
  { id: "5232639843776863759", number: "1255", name: "Поддержка программного обеспечения фитнесс центра ", state: "Выполняется", date: "19.05.2023", color: "#0019FF" },
  { id: "3846408024338198032", number: "1250", name: "Обеспечение сохранности и безопасности данных агенства недвижимости", state: "Завершен", date: "18.05.2023", color: "#0A821E" },
  { id: "1153382417057413174", number: "1249", name: "Оптимизация ИТ-инфраструктуры для банка «Яблоко банк»", state: "Отменен заказчиком", date: "17.05.2023", color: "#DC283C" },
  { id: "1876099520891424160", number: "1247", name: "Миграция на новые годные ИТ-решения нашей строительной компании «Кирпич»", state: "Черновик", date: "16.05.2023", color: "#C3C3C5" },
]);
</script>

<style>
.orderItemColorPink .oItem {
  background-color: #C0A2ED;
}

.orderItemLightPink .oItem {
  background-color: #DFD1F6;
}

.theVeryFirstLightPink .oItem {
  background-color: #DFD1F6;
}
</style>
