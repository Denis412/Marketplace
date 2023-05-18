<template>
  <div class="item">
    <q-page class="qPage">
      <router-link
        :to="{ name: 'order-info', params: { id: orderId } }"
        class="link-style"
      >
        <q-card class="oItem">
          <q-card-section class="oNum">
            {{ order?.id }}
          </q-card-section>

          <q-card-section class="oName">
            {{ order?.name }}
          </q-card-section>

          <q-card-section class="oState">
            <div
              class="oStateIndicator"
              :style="{ backgroundColor: item?.color }"
            ></div>
            {{ order?.status }}
          </q-card-section>

          <q-card-section class="oDateUpdate">
            {{ order?.updated_at }}
          </q-card-section>

          <q-card-section class="oResponse">
            <img src="/assets/icons/orderIcons/deal.png" alt="img" />
          </q-card-section>

          <q-card-section class="oDeal">
            <img src="/assets/icons/orderIcons/wait.png" alt="img" />
          </q-card-section>

          <q-card-section class="oEdit">
            <router-link :to="{ name: 'order-edit', params: { id: orderId } }">
              <img src="../assets/icons/orderIcons/tripleDot.png" alt="img" />
            </router-link>
          </q-card-section>
        </q-card>
      </router-link>
    </q-page>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const { order } = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

// массив чисто для цветов, кот. я потом уберу
const item = ref([
  {
    id: "4177279091517509819",
    number: "1260",
    name: "Лендинг чайного магазина",
    state: "Поиск исполнителя",
    date: "24.05.2023",
    color: "#FF9646",
  },
  {
    id: "4448913352824608273",
    number: "1257",
    name: "Создание платформы для начинающих мастеров",
    state: "Есть кандидат",
    date: "20.05.2023",
    color: "#521E96",
  },
  {
    id: "5232639843776863759",
    number: "1255",
    name: "Поддержка программного обеспечения фитнесс центра ",
    state: "Выполняется",
    date: "19.05.2023",
    color: "#0019FF",
  },
  {
    id: "3846408024338198032",
    number: "1250",
    name: "Обеспечение сохранности и безопасности данных агенства недвижимости",
    state: "Завершен",
    date: "18.05.2023",
    color: "#0A821E",
  },
  {
    id: "1153382417057413174",
    number: "1249",
    name: "Оптимизация ИТ-инфраструктуры для банка «Яблоко банк»",
    state: "Отменен заказчиком",
    date: "17.05.2023",
    color: "#DC283C",
  },
  {
    id: "1876099520891424160",
    number: "1247",
    name: "Миграция на новые годные ИТ-решения нашей строительной компании «Кирпич»",
    state: "Черновик",
    date: "16.05.2023",
    color: "#C3C3C5",
  },
]);
const orderId = computed(() => {
  return order.id ? order.id : null;
});
</script>

<style scoped>
.item {
  padding: 10px;
}
.link-style {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
.qPage {
  min-height: 70px !important;
}

.oItem {
  width: 1109px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

.oNum,
.oName,
.oState,
.oDateUpdate,
.oResponse,
.oDeal,
.oEdit {
  padding: 20px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
}

.oName {
  max-width: 165px;
}

.oStateIndicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
}
</style>
