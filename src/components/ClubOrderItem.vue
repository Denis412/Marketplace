<template>
  <div class="item">
    <q-page class="qPage">
      <router-link
        :to="{ name: 'order-info', params: { id: orderId } }"
        class="link-style"
      >
        <q-card class="oItem row q-py-md">
          <q-card-section class="oName col-3 text-center">
            Статус
          </q-card-section>

          <q-card-section class="oName col-3 text-center">
            {{ order?.name }}
          </q-card-section>

          <q-card-section class="oDateUpdate col-3 text-center">
            {{ order?.updated_at.slice(0, 10) }}
          </q-card-section>

          <q-card-section class="oResponse col-2 text-center">
            Иконка
          </q-card-section>

          <q-card-section class="oEdit col-1 text-center">
            <q-icon class="my-icon" name="more_vert"></q-icon>
          </q-card-section>
        </q-card>
      </router-link>
    </q-page>
  </div>
</template>

<script setup>
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
