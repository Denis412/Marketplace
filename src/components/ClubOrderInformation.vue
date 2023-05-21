<template>
  <section>
    <section class="q-mx-auto q-mt-md wrapper-page-order-info">
      <section class="flex items-baseline">
        <h4 class="text-h4 q-mb-md q-mr-sm">
          просмотр заказа {{ props.order.id }}
        </h4>

        <c-order-status :status="order_test" />
      </section>

      <section>
        <h5 class="text-section-header q-mb-md">{{ props.order.name }}</h5>
      </section>

      <section class="q-mb-xl flex justify-start items-baseline">
        <h5 class="q-mb-xs q-mr-sm text-section-header">Заказчик</h5>
        <p class="text-content-component-costumer">
          {{ props.order.customer }}
        </p>
      </section>

      <section>
        <h4 class="block-control-response-header">Отклик</h4>

        <q-item-section
          class="block-control-response flex column justify-around"
        >
          <section class="q-mt-lg q-mb-lg flex justify-start no-wrap">
            <div
              class="image-block-control-response q-ml-xl q-mr-md flex items-center justify-center"
            >
              <q-icon
                size="45px"
                name="img:/assets/icons/person/person-white.svg"
                alt="person-white"
              />
            </div>

            <div class="flex column wrap content-block-control-response">
              <h4
                class="q-mb-md content-block-control-response-header-text text-weight-medium"
              >
                Lorem ipsum dolor sit.
              </h4>
              <h6
                class="q-mb-md content-block-control-response-first text-weight-regular"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Numquam, incidunt similique quisquam esse quaerat quibusdam.
              </h6>
              <h6
                class="content-block-control-response-last text-weight-regular"
              >
                Ознакомьтесь с командой-кандидатом, утвердите или откажитесь от
                неё, чтобы ИИ нашёл вам другого исполнителя.
              </h6>
            </div>
          </section>

          <section class="flex items-center q-mb-md">
            <div class="q-ml-xl date-response">11.11.2011</div>

            <c-button
              class="q-ml-xl"
              :label="'Перейти к профилю'"
              :textColor="'white'"
              :background="true"
            />

            <c-button
              class="q-ml-md"
              :label="'Утвердить исполнителя'"
              :textColor="'white'"
              :background="true"
            />

            <c-button
              class="q-ml-md"
              :label="'Отказаться'"
              :textColor="'white'"
              :background="true"
            />
          </section>
        </q-item-section>
      </section>

      <section class="q-mt-xl">
        <h5 class="q-mt-sm text-section-header">Что требуется сделать</h5>
        <div class="flex justify-start">
          <div class="flex wrap q-mt-lg">
            <div
              v-for="todo in props.order.todos"
              class="flex column justify-start q-mr-md"
            >
              <p class="text-content-component-todo q-mb-lg">
                {{ todo }}
              </p>
              <div
                class="text-content-component"
                v-for="fun in props.order.functions"
              >
                <ul>
                  <li class="q-ml-md q-mb-md">
                    {{ fun }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="q-mt-xl">
        <div class="q-mt-sm q-mb-sm flex justify-start items-center">
          <h5 class="text-section-header" style="margin: 0">Описание заказа</h5>

          <div
            v-if="order.consultation"
            class="flex justify-start items-center"
          >
            <p class="text-content-component-cons">Мне нужна консультация</p>
          </div>
        </div>

        <p class="text-content-component style-information-block">
          {{ order.description }}
        </p>
      </section>

      <section class="q-mt-xl">
        <h5 class="q-mt-sm q-mb-lg text-section-header">Файлы и документы</h5>

        {{ props.order.files }}
      </section>

      <section class="flex justify-start items-baseline">
        <div class="q-mt-xl" style="margin-right: 224px">
          <h5 class="q-mt-sm q-mb-lg text-section-header">
            Желаемая стоимость
          </h5>
          <div class="flex">
            <p
              class="text-content-component-cost-and-date q-mr-xl flex items-center"
            >
              от {{ props.order.price_start }}
              <q-icon
                class="q-ml-sm"
                size="20px"
                name="img:/assets/icons/orderIcons/ruble.svg"
              ></q-icon>
            </p>
            <p class="text-content-component-cost-and-date flex items-center">
              до {{ props.order.price_end }}
              <q-icon
                class="q-ml-sm"
                size="20px"
                name="img:/assets/icons/orderIcons/ruble.svg"
              ></q-icon>
            </p>
          </div>
        </div>

        <div class="q-mt-xl">
          <h5 class="q-mt-sm q-mb-lg text-section-header">
            Желаемый срок готовности
          </h5>

          <div class="text-content-component-cost-and-date">
            {{ props.order.date_complete }}
          </div>
        </div>
      </section>
    </section>
  </section>
</template>

<script setup>
import { ref, defineProps } from "vue";
import CButton from "../components/ClubButton.vue";
import COrderStatus from "../components/ClubOrderStatus.vue";

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const order_test = ref({
  id: "7718095163914291112",
  label: "Поиск исполнителя",
  order: 0,
  color: "#FF9646",
});

console.log(props.order);

const colorStatus = ref("#9236DA");
</script>

<style scoped lang="scss">
.date-response {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: flex-end;
  color: #3f3f46;
}
.content-block-control-response-last {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #581c87;
}
.content-block-control-response-first {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #3f3f46;
}
.block-control-response-header {
  font-family: "Play";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 40px;
  color: #27272a;
}
.text-content-component-cost-and-date {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #3f3f46;
}
.style-information-block {
  border: 2px solid #d4d4d8;
  border-radius: 10px;
  padding: 6px 7px 6px 7px;
}
.text-section-header {
  font-family: "Play";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #27272a;
}
.content-block-control-response-header-text {
  font-family: "Play";
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 32px;
  color: #4b1873;
}
.wrapper-page-order-info {
  max-width: 846px;
  padding-bottom: 171px;
}
.color-type-status {
  width: 12px;
  height: 12px;
  border-radius: 25px;
}
.block-control-response {
  background: #ffffff;
  box-shadow: 0px 38px 15px rgba(0, 0, 0, 0.01),
    0px 21px 13px rgba(0, 0, 0, 0.03), 0px 10px 10px rgba(0, 0, 0, 0.04),
    0px 2px 5px rgba(0, 0, 0, 0.05), 0px 0px 0px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  min-height: 285px;
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
.text-content-component-costumer {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #581c87;
}
.text-content-component {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #3f3f46;
}
.text-content-component-todo {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  border-radius: 25px;
  color: white;
  background: linear-gradient(101.75deg, #4c1d95 4.25%, #881d95 96.95%);
  padding: 10px 16px 10px 16px;
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
