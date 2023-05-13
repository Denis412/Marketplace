<template>
  <div>

    <div v-if="!loadingOrder" class="orderHeadingOuter">
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

    <div class="cOrderItemHeading" >
      <p class="orderNumP">Номер заказа</p>
      <p class="orderNameP">Название заказа</p>
      <p class="orderStateP">Статус</p>
      <p class="orderDateP">Дата обновления</p>
      <p class="orderRespP">Отклик</p>
      <p class="orderDealP">Сделка</p>
      <p class="orderEditP">Редактирование</p>
    </div>
    <c-orders-item
      v-for="(order, index) in orders"
      :order="order"
      :key="order?.id"
      :class="{ 'orderItemColorPink': index % 2 !== 0, 'orderItemLightPink': index === 0, 'theVeryFirstLightPink': index % 2 === 0 && index !== 0 }"
    />
    <div v-if="loadingOrder">
      Загрузка...
    </div>
  </div>
</template>

<script setup>
import COrdersItem from 'src/components/ClubOrderItem.vue'
import { ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { getOrders } from 'src/graphql/order/queries'

const { result: ordersResult, loading: loadingOrder } = useQuery(getOrders)
const orders = ref([])

watch(ordersResult, () => {
  orders.value = ordersResult.value?.paginate_order?.data
})
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
