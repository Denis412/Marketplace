<template>
  <section class="q-ml-sm flex">
    <q-icon
      class="q-ml-xs"
      style="width: 18px; height: 18px"
      :name="`img:${status.icon}`"
    >
    </q-icon>
    <h6 :style="`color: ${status.color}`" class="text-h6 q-mx-sm q-mb-sm">
      {{ status.label }}
    </h6>
  </section>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});

const status = ref({
  icon: "",
  label: "",
  color: "",
});

console.log(props.status);

switch (props.status) {
  case "2363916507227203881":
    status.value.icon = "/assets/icons/orderIcons/ordersStatus/status_0.svg";
    status.value.label = "Поиск исполнителя";
    status.value.color = "#C2410C";
    break;
  case "3814249250560291482":
    status.value.icon = "/assets/icons/orderIcons/ordersStatus/status_1.svg";
    status.value.label = "Есть кандидат";
    status.value.color = "#166534";
    break;
  case "4837591619999500045":
    status.value.icon = "/assets/icons/orderIcons/ordersStatus/status_2.svg";
    status.value.label = "Заключается сделака";
    status.value.color = "#C2410C";
    break;
  case "3133592897321301481":
    status.value.icon = "/assets/icons/orderIcons/ordersStatus/status_3.svg";
    status.value.label = "Выполняется";
    status.value.color = "#C2410C";
    break;
  case "7494949799001030133":
    status.value.icon = "/assets/icons/orderIcons/ordersStatus/status_4.svg";
    status.value.label = "Завершен";
    status.value.color = "#166534";
    break;
  case "2375299492231411693":
    status.value.icon = "/assets/icons/orderIcons/ordersStatus/status_5.svg";
    status.value.label = "Оспаривается";
    status.value.color = "#C2410C";
    break;
  case "1725305287553643069":
    status.value.icon = "/assets/icons/orderIcons/ordersStatus/status_6_7.svg";
    status.value.label = "Отменен заказчиком";
    status.value.color = "#B91C1C";
    break;
  case "6243889424355631278":
    status.value.icon = "/assets/icons/orderIcons/ordersStatus/status_6_7.svg";
    status.value.label = "Отменен исполнителем";
    status.value.color = "#B91C1C";
    break;
  case "1744362893253691369":
    status.value.icon = "/assets/icons/orderIcons/ordersStatus/status_8.svg";
    status.value.label = "Черновик";
    status.value.color = "#1D4ED8";
    break;
}
</script>
