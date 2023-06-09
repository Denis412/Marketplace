<template>
  <div class="c-mt-24" v-if="showPages">
    <q-tree
      :nodes="showPages"
      node-key="id"
      no-connectors
      v-model:selected="selected"
      @update:selected="redirect"
      no-selection-unset
      default-expand-all
      class="c-tree"
    />
  </div>
</template>

<script setup>
import { computed, ref, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import pageApi from "src/sdk/page";
import BaseService from "src/sevices/BaseService";
import OrderService from "src/sevices/OrderService";

const route = useRoute();
const router = useRouter();
const currentUser = inject("currentUser");

const selected = ref("Мои заказы");

const { result: rootOrderPage } = BaseService.fetchApiPaginate(
  pageApi.paginateRootPages,
  {
    where: {
      column: "title",
      operator: "EQ",
      value: "Заказы",
    },
  },
  { only_one: true }
);

const { result: orders } = OrderService.fetchAllOrders({
  where: {
    column: "author_id",
    operator: "EQ",
    value: currentUser.value.subject_id,
  },
});

const showPages = computed(() => {
  return [
    {
      id: rootOrderPage.value?.children.data[0].id,
      label: rootOrderPage.value?.children.data[0].title,
      icon: "img:/assets/icons/tree/default-tree-icon.svg",

      children: orders.value?.map((order) => ({
        id: order.id,
        label: order.name,
        icon: "img:/assets/icons/tree/default-tree-icon.svg",
      })),
    },
  ];
});

const redirect = () => {
  const name = selected.value === process.env.MY_ORDERS_PAGE_ID ? "orders" : "order-info";

  router.push({ name, params: name === "order-info" ? { id: selected.value } : "" });
};
</script>

<style lang="scss" scoped></style>
