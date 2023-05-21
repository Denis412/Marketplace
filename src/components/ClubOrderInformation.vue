<template>
  <section>
    <section class="q-mx-auto q-mt-md wrapper-page-order-info">
      <section class="flex items-end">
        <h4 class="text-h4 q-mb-sm">просмотр заказа {{ props.order.id }}</h4>

        <section class="q-ml-sm flex items-baseline">
          <div
            class="color-type-status"
            :style="`background-color: ${colorStatus}`"
          ></div>
          <h6 class="text-h6 q-mx-sm q-mb-sm">Есть кандидат</h6>
        </section>
      </section>

      <section>
        <p class="text-from-order-info q-mb-xl">{{ props.order.name }}</p>
      </section>

      <section>
        <h4 class="text-h4">Отклик</h4>

        <q-item-section class="block-control-response">
          <section class="q-mt-lg q-mb-md flex justify-start no-wrap">
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
              <h5 class="q-mb-md text-h5 text-weight-medium">
                Lorem ipsum dolor sit.
              </h5>
              <h6 class="q-mb-xl text-h6 text-weight-regular">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Numquam, incidunt similique quisquam esse quaerat quibusdam.
              </h6>
              <h6 class="text-h6 text-weight-regular">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem iusto quos blanditiis repellendus praesentium
                fuga?
              </h6>
            </div>
          </section>

          <section class="flex items-center">
            <div class="q-ml-xl">11.11.2011</div>

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
          </section>
        </q-item-section>
      </section>

      <section>
        <h5 class="q-mt-md q-mb-xs text-h5">Заказчик</h5>
        <!-- <div>Тут будут ссылки на заказчиков =)</div>   -->
        <p class="text-content-component">
          {{ props.order.customer }}
        </p>
      </section>

      <section class="q-mt-lg">
        <h5 class="q-mt-sm q-mb-sm text-h5">Что требуется</h5>
        <div class="flex justify-start">
          <p
            v-for="todo in props.order.todos"
            class="q-pa-sm q-mr-sm"
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
      </section>

      <section class="q-mt-lg">
        <h5 class="q-mt-sm q-mb-sm text-h5">Функции, блоки, разделы сайта</h5>

        <section class="flex justify-start">
          <div>
            <div
              v-for="todo in props.order.todos"
              class="text-content-component-todo"
            >
              {{ todo }}
            </div>
            <div
              class="text-content-component"
              v-for="fun in props.order.functions"
            >
              {{ fun }}
            </div>
          </div>
        </section>
      </section>

      <section class="q-mt-lg">
        <div class="q-mt-sm q-mb-sm flex justify-start items-center">
          <h5 class="text-h5" style="margin: 0">Описание заказа</h5>

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
      </section>

      <section class="q-mt-lg">
        <h5 class="q-mt-sm q-mb-sm text-h5">Файлы и документы</h5>

        {{ props.order.files }}
      </section>

      <section class="q-mt-lg">
        <h5 class="q-mt-sm q-mb-sm text-h5">Желаемая стоимость</h5>

        <p class="text-content-component">
          от {{ props.order.price_start }} ₽ до {{ props.order.price_end }} ₽
        </p>
      </section>

      <section class="q-mt-lg">
        <h5 class="q-mt-sm q-mb-sm text-h5">Желаемый срок готовности</h5>

        <div class="text-content-component">
          {{ props.order.date_complete }}
        </div>
      </section>
    </section>
  </section>
</template>

<script setup>
import { ref, defineProps } from "vue";
import CButton from "../components/ClubButton.vue";
import personWhite from "/assets/icons/person/person-white.svg";

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

console.log(props.order);

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
