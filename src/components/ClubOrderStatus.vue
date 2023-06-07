<template>
  <section v-if="loadingStatus">...Загрузка</section>
  <section v-else class="q-ml-sm flex">
    <q-icon
      class="q-ml-xs"
      style="width: 18px; height: 18px"
      :name="`img:/assets/icons/orderIcons/ordersStatus/${status.order}.svg`"
    >
    </q-icon>
    <h6 :style="`color: ${status.color}`" class="text-h6 q-mx-sm q-mb-sm">
      {{ status.label }}
    </h6>
  </section>
</template>

<script setup>
import { ref, watch, onActivated, onMounted } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { getStatus } from "src/graphql/order/queries";

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});

const {
  result: getStatuses,
  loading: loadingStatus,
  refetch,
} = useQuery(
  getStatus,
  {
    id: process.env.PROPERTY_STATUS_ID,
  },
  {
    fetchPolicy: "no-cache",
  }
);

onMounted(() => {
  refetch();
});
onActivated(() => {
  refetch();
});

const status = ref();

watch(loadingStatus, () => {
  status.value = getStatuses.value.property.meta.options.find((el) => el.id === props.status);
});
</script>
