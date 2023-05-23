<template>
  <div>
    <div v-if="!loadingOrder" class="orderHeadingOuter">
      <div>
        <h3 class="orderHeadTitle">МОИ ЗАКАЗЫ</h3>
        <div class="addOrderButton">
          <a href="#"
            ><img src="/assets/icons/orderIcons/buttons.png" alt="img"
          /></a>
        </div>
      </div>
    </div>

    <q-card class="no-shadow">
      <q-card-section class="row">
        <div class="col-12 border-bottom">
          <div class="row">
            <div class="col-3 text-subtitle3 text-center">Статус</div>
            <div class="col-3 text-subtitle3 text-center">Название заказа</div>
            <div class="col-3 text-subtitle3 text-center">Дата обновления</div>
            <div class="col-2"></div>
            <div class="col-1"></div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <c-orders-item
      class="orderItemLightPink"
      v-for="order in orders"
      :order="order"
      :key="order?.id"
    />

    <div v-if="loadingOrder">Загрузка...</div>
  </div>
</template>

<script setup>
import COrdersItem from "src/components/ClubOrderItem.vue";
import { onActivated, onMounted, ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { getOrders } from "src/graphql/order/queries";

const {
  result: ordersResult,
  loading: loadingOrder,
  refetch,
} = useQuery(getOrders);
const orders = ref([]);

watch(ordersResult, () => {
  orders.value = ordersResult.value?.paginate_order?.data;
  console.log(orders.value);
});

onMounted(() => {
  refetch();
});
onActivated(() => {
  refetch();
});
</script>

<style>
.orderItemLightPink .oItem {
  background-color: #eee8f3;
  border-radius: 5px;
  box-shadow: none;
}

.orderHeadTitle {
  padding: 70px 40px 40px 40px;
  font-family: "Furore";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 40px;
  letter-spacing: 0.05em;
}
.addOrderButton {
  padding: 0 40px 60px 40px;
}
.orderHeadingOuter {
  display: flex;
  flex-direction: row;
}
.orderIconsCartOuter {
  padding: 40px 0 0 210px;
}
.orderIconsCart {
  max-width: 260px;
  max-height: 160px;
}
.cOrderItemHeading {
  max-width: 1109px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
}
</style>
