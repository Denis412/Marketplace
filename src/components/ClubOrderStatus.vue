<template>
  <section class="q-ml-sm flex">
    <q-icon
      class="q-ml-xs"
      style="width: 18px; height: 18px"
      :name="`img:${status.icon}`"
    >
    </q-icon>
    <h6 :style="`color: ${props.status.color}`" class="text-h6 q-mx-sm q-mb-sm">
      {{ status.label }}
    </h6>
  </section>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  status: {
    type: Object,
    required: true,
  },
});

const status = ref({
  icon: "",
  label: props.status.label,
});

console.log(props.status.order);

switch (props.status.order) {
  case 0:
    status.value.icon = "/assets/icons/orderIcons/ordersStatus/status_0.svg";
    break;
  case 1:
    status.value.icon = "/assets/icons/orderIcons/ordersStatus/status_1.svg";
    break;
  case 2:
    status.value.icon = "/assets/icons/orderIcons/ordersStatus/status_2.svg";
    break;
  case 3:
    status.value.icon = "/assets/icons/orderIcons/ordersStatus/status_3.svg";
    break;
  case 4:
    status.value.icon = "/assets/icons/orderIcons/ordersStatus/status_4.svg";
    break;
  case 5:
    status.value.icon = "/assets/icons/orderIcons/ordersStatus/status_5.svg";
    break;
  case 6:
    status.value.icon = "/assets/icons/orderIcons/ordersStatus/status_6_7.svg";
    break;
  case 7:
    status.value.icon = "/assets/icons/orderIcons/ordersStatus/status_6_7.svg";
    break;
  case 8:
    status.value.icon = "/assets/icons/orderIcons/ordersStatus/status_8.svg";
    break;
}
</script>
