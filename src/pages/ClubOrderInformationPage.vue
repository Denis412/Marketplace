<template>
  <q-page>
    <section v-if="loadingOrder">
      <p>Загрузка...</p>
    </section>

    <section v-else>
      <c-order-information :order="order" />
    </section>
  </q-page>
</template>

<script setup>
import { useRoute } from "vue-router";
import COrderInformation from "src/components/ClubOrderInformation.vue";
import OrderService from "src/sevices/OrderService";

const route = useRoute();

const { result: order, loading: loadingOrder } = OrderService.fetchOrderById(route.params.id, {
  fetchPolicy: "network-only",
});
</script>
