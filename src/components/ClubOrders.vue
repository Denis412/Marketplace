<template>
  <div>
    <div class="orderHeadingOuter">
      <div>
        <h3 class="orderHeadTitle">МОИ ЗАКАЗЫ</h3>

        <div class="addOrderButton">
          <a href="#"><img src="../assets/icons/orderIcons/buttons.png" alt="img"></a>
        </div>

      </div>

      <div class="orderIconsCartOuter">
        <img class="orderIconsCart" src="../assets/icons/orderIcons/orderIconsCart.png" alt="">
      </div>
    </div>
    <div class="cOrderItemHeading">
      <p class="orderNumP">Номер заказа</p>
      <p class="orderNameP">Название заказа</p>
      <p class="orderStateP">Статус</p>
      <p class="orderDateP">Дата обновления</p>
      <p class="orderRespP">Отклик</p>
      <p class="orderDealP">Сделка</p>
      <p class="orderEditP">Редактирование</p>
    </div>

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
import {ref} from "vue";

const items = ref([
  { number: "1260", name: "Лендинг чайного магазина", state: "Поиск исполнителя", date: "24.05.2023", color: "#FF9646" },
  { number: "1257", name: "Создание платформы для начинающих мастеров", state: "Есть кандидат", date: "20.05.2023", color: "#521E96" },
  { number: "1255", name: "Поддержка программного обеспечения фитнесс центра ", state: "Выполняется", date: "19.05.2023", color: "#0019FF" },
  { number: "1250", name: "Обеспечение сохранности и безопасности данных агенства недвижимости", state: "Завершен", date: "18.05.2023", color: "#0A821E" },
  { number: "1249", name: "Оптимизация ИТ-инфраструктуры для банка «Яблоко банк»", state: "Отменен заказчиком", date: "17.05.2023", color: "#DC283C" },
  { number: "1247", name: "Миграция на новые годные ИТ-решения нашей строительной компании «Кирпич»", state: "Черновик", date: "16.05.2023", color: "#C3C3C5" },
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
.orderHeadTitle{
  padding: 70px 40px 40px 40px;
  /*width: 246px;*/
  /*height: 40px;*/
  font-family: 'Furore';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 40px;
  letter-spacing: 0.05em;
}
.addOrderButton{
  padding: 0 40px 60px 40px;
}
.orderHeadingOuter{
  display: flex;
  flex-direction: row;
}
.orderIconsCartOuter{
  padding: 40px 0 0 210px;
}
.orderIconsCart{
  max-width: 260px;
  max-height: 160px;
}
.cOrderItemHeading{
  max-width: 1109px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
}
.orderNumP{
  padding: 0 0 0 10px;
}
.orderNameP{
  padding: 0 0 0 80px;
}
.orderStateP{
  padding: 0 0 0 150px;
}
.orderDateP{
  padding: 0 0 0 150px;
}
.orderRespP{
  padding: 0 0 0 150px;
}
.orderDealP{
  padding: 0 10px 0 70px;
}
.orderEditP{
  padding: 0 20px 0 0;
}
</style>
