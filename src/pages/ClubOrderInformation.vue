<template>
  <q-page>
    <div v-if="loadingOrder">
      <p>Загрузка...</p>
    </div>
    <div v-else class="q-mx-auto q-mt-md wrapper-page-order-info">
      <div class="flex items-end">
        <div>
          <p class="text-h4 q-mb-sm">просмотр заказа {{ order.id }}</p>
        </div>
        <div class="q-ml-sm flex items-baseline">
          <div
            class="color-type-status"
            :style="`background-color: ${colorStatus}`"
          ></div>
          <p class="text-h6 q-mx-sm q-mb-sm">Есть кандидат</p>
        </div>
      </div>

      <div>
        <p class="text-from-order-info q-mb-xl">{{ order.name }}</p>
      </div>

      <div>
        <p class="text-h4">Отклик</p>

        <div class="block-control-response">
          <div class="q-mt-lg q-mb-md flex justify-start no-wrap">
            <div
              class="image-block-control-response q-ml-xl q-mr-md flex center justify-center"
            >
              <img
                src="src/assets/icons/person/person-white.svg"
                alt="person-white"
              />
            </div>

            <div class="flex column wrap content-block-control-response">
              <p class="q-mb-md text-h5 text-weight-medium">
                Lorem ipsum dolor sit.
              </p>
              <p class="q-mb-xl text-h6 text-weight-regular">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Numquam, incidunt similique quisquam esse quaerat quibusdam.
              </p>
              <p class="text-h6 text-weight-regular">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem iusto quos blanditiis repellendus praesentium
                fuga?
              </p>
            </div>
          </div>

          <div class="flex items-center">
            <div class="q-ml-xl">{{ dateOrderResponse }}</div>

            <c-button
              class="q-ml-xl"
              :label="'Перейти к профилю'"
              :textColor="'white'"
              :background="'linear-gradient(101.75deg, #4C1D95 4.25%, #881D95 96.95%);'"
            />

            <c-button
              class="q-ml-md"
              :label="'Утвердить исполнителя'"
              :textColor="'white'"
              :background="'linear-gradient(101.75deg, #4C1D95 4.25%, #881D95 96.95%);'"
            />

            <c-button
              class="q-ml-md"
              :label="'Отказаться'"
              :textColor="'white'"
              :background="'linear-gradient(101.75deg, #4C1D95 4.25%, #881D95 96.95%);'"
            />
          </div>
        </div>
      </div>

      <div>
        <p class="q-mt-md q-mb-xs text-h5">Заказчик</p>
        <!-- <div>Тут будут ссылки на заказчиков =)</div>   -->
        <p class="text-content-component">
          {{ order.customer }}
        </p>
      </div>

      <div class="q-mt-lg">
        <p class="q-mt-sm q-mb-sm text-h5">Что требуется</p>
        <div class="flex justify-start">
          <p
            v-for="todo in order.todos"
            class="q-pa-sm"
            style="
              border-radius: 25px;
              color: white;
              background: linear-gradient(
                101.75deg,
                #4c1d95 4.25%,
                #881d95 96.95%
              );
            "
          >
            {{ todo }}
          </p>
        </div>
      </div>

      <div class="q-mt-lg">
        <p class="q-mt-sm q-mb-sm text-h5">Функции, блоки, разделы сайта</p>

        <div class="flex justify-start">
          <div>
            <div
              v-for="todo in order.todos"
              class="text-content-component-todo"
            >
              {{ todo }}
            </div>
            <div class="text-content-component" v-for="fun in order.functions">
              {{ fun }}
            </div>
          </div>
        </div>
      </div>

      <div class="q-mt-lg">
        <div class="q-mt-sm q-mb-sm flex justify-start items-center">
          <p class="text-h5" style="margin: 0">Описание заказа</p>

          <div
            v-if="order.consultation"
            class="flex justify-start items-center"
          >
            <p class="text-content-component-cons">Мне нужна консультация</p>
          </div>
        </div>

        <p class="text-content-component">
          {{ order.description }}
        </p>
      </div>

      <div class="q-mt-lg">
        <p class="q-mt-sm q-mb-sm text-h5">Файлы и документы</p>

        {{ order.files }}
      </div>

      <div class="q-mt-lg">
        <p class="q-mt-sm q-mb-sm text-h5">Желаемая стоимость</p>

        <p class="text-content-component">
          от {{ order.price_start }} ₽ до {{ order.price_end }} ₽
        </p>
      </div>

      <div class="q-mt-lg">
        <p class="q-mt-sm q-mb-sm text-h5">Желаемый срок готовности</p>

        <div class="text-content-component">{{ order.date_complete }}</div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch } from "vue";
import CButton from "../components/ClubButton.vue";
import { useQuery } from "@vue/apollo-composable";
import { getOrderById } from "src/graphql/order/queries";
import { useRoute } from "vue-router";

const route = useRoute();
const { result: getOrder, loading: loadingOrder } = useQuery(
  getOrderById,
  route.params
);

const order = ref({});

watch(loadingOrder, () => {
  Object.assign(order.value, getOrder.value.get_order);
});

console.log(getOrder);
console.log(route.params);

const colorStatus = ref("#9236DA");
</script>

<style scoped lang="scss">
.wrapper-page-order-info {
  max-width: 846px;
  padding-bottom: 171px;
}
.color-type-status {
  width: 12px;
  height: 12px;
  border-radius: 25px;
}
.text-from-order-info {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
}
.block-control-response {
  border: 1px solid #4f1e96;
  box-shadow: 0px 38px 15px rgba(0, 0, 0, 0.01),
    0px 21px 13px rgba(0, 0, 0, 0.03), 0px 10px 10px rgba(0, 0, 0, 0.04),
    0px 2px 5px rgba(0, 0, 0, 0.05), 0px 0px 0px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  min-height: 289px;
}
.image-block-control-response {
  min-width: 108px;
  height: 108px;
  background: #581c87;
  border-radius: 100px;
}
.content-block-control-response {
  max-width: 612px;
}
.text-content-component {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  margin: 0;
  color: #000000;
}
.text-content-component-todo {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 130%;
  color: #000000;
  margin: 24px 0 24px 0;
}
.text-content-component-cons {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  padding-left: 32px;
  margin: 0;
  color: #77479d;
}
</style>
