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
import { ref, watch, onActivated, onMounted } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { getOrderById } from "src/graphql/order/queries";
import { useRoute } from "vue-router";
import COrderInformation from "src/components/ClubOrderInformation.vue";

const route = useRoute();
const {
  result: getOrder,
  loading: loadingOrder,
  refetch,
} = useQuery(getOrderById, route.params, {
  fetchPolicy: "no-cache",
});

onMounted(() => {
  refetch();
});
onActivated(() => {
  refetch();
});

const order = ref({});

console.log(getOrder.value);

watch(getOrder, () => {
  Object.assign(order.value, getOrder.value.get_order);
});
</script>
