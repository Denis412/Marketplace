<template>
  <div class="item">
    <q-page class="qPage">
      <q-card class="oItem row q-py-md flex">
        <q-card-section class="col-3 text-center">
          <div class="flex items-center">
            <img :src="cur_status.icon" class="q-mr-sm q-ml-xl" />
            <span :style="'color:' + cur_status.color">{{
              cur_status.label
            }}</span>
          </div>
        </q-card-section>

        <q-card-section class="oName col-3 text-center">
          {{ order?.name }}
        </q-card-section>

        <q-card-section class="oDateUpdate col-3 text-center">
          {{ order?.updated_at.slice(0, 10) }}
        </q-card-section>

        <q-card-section class="oResponse col-2 text-center">
          <div v-if="!order.deal" class="flex items-center">
            <img
              src="/assets/icons/orders/document_orders.svg"
              class="q-mr-sm"
            />
            <span>Сделка</span>
          </div>
        </q-card-section>
        <router-link
          v-if="cur_status.editable"
          :to="{ name: 'order-info', params: { id: orderId } }"
          class="link-style"
        >
          <q-card-section class="oEdit col-1 text-center">
            <q-icon class="my-icon" name="more_vert"></q-icon> </q-card-section
        ></router-link>
      </q-card>
    </q-page>
  </div>
</template>

<script setup>
import { statuses } from "src/use/order";
import { computed } from "vue";

const { order } = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const orderId = computed(() => {
  return order.id ? order.id : null;
});
let cur_status;
statuses.forEach((element) => {
  if (element.id == order.status) {
    cur_status = element;
  }
});
</script>

<style scoped>
.item {
  padding: 10px;
  padding-left: 13px;
  padding-right: 13px;
}
.link-style {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
.qPage {
  min-height: 70px !important;
}
.my-icon {
  font-size: 20px;
  color: #581c87;
}

.oNum,
.oName,
.oState,
.oDateUpdate,
.oResponse,
.oDeal,
.oEdit {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  hyphens: auto;
  word-break: break-all;
}
.oStateIndicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
}
</style>
