<template>
  <div>
    <div v-if="!loadingOrder" class="orderHeadingOuter">
      <div>
        <h3 class="q-ml-xl q-mt-xl q-mb-md orderHeadTitle">МОИ ЗАКАЗЫ</h3>
        <c-button
          :background="true"
          label="Добавить заказ"
          class="q-ml-xl q-mb-xl"
          to="order-create"
        />
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
import CButton from "src/components/ClubButton.vue";
import COrdersItem from "src/components/ClubOrderItem.vue";
import { inject, onActivated, onMounted, ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { getOrders } from "src/graphql/order/queries";
import OrderService from "src/sevices/OrderService";

const currentUser = inject("currentUser");
const isModerator = inject("isModerator");

const { result: orders, loading: loadingOrder } = OrderService.fetchAllOrders({
  where: isModerator.value
    ? null
    : {
        column: "author_id",
        operator: "EQ",
        value: currentUser.value.subject_id,
      },
});
</script>

<style>
.orderItemLightPink .oItem {
  background-color: #eee8f3;
  border-radius: 5px;
  box-shadow: none;
}

.orderHeadTitle {
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
