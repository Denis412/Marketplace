<template>
  <section>
    <section class="wrapper-page-order-info">
      <section class="flex items-baseline c-mb-24">
        <h4 class="c-f-f-f c-f-w-400 c-f-s-32 c-f-h-40 c-mr-32">
          просмотр заказа {{ props.order.id }}
        </h4>

        <c-order-status :status="props.order.status" />
      </section>

      <section class="c-mb-24">
        <p class="c-f-f-p c-f-w-400 c-f-s-20 c-f-h-28 c-mb-24">
          {{ props.order.name }}
        </p>
      </section>

      <section class="q-mb-xl flex justify-start items-baseline c-mb-68">
        <h5 class="q-mb-xs q-mr-sm c-f-f-p c-f-w-400 c-f-s-20 c-f-h-28">
          Заказчик
        </h5>
        <p class="c-f-f-m c-f-w-400 c-f-s-16 c-f-h-24" style="color: #581c87">
          {{ props.order.customer }}
        </p>
      </section>

      <section class="c-mb-64">
        <h4 class="c-f-f-p c-f-w-400 c-f-s-32 c-f-h-40 c-mb-24">Отклик</h4>

        <q-item-section
          class="block-control-response flex column justify-around"
        >
          <section class="flex justify-start no-wrap">
            <div
              class="image-block-control-response c-ml-32 c-mt-32 c-mr-24 flex items-center justify-center"
            >
              <q-icon
                size="45px"
                name="img:/assets/icons/person/person-white.svg"
                alt="person-white"
              />
            </div>

            <div class="flex column wrap content-block-control-response">
              <h4
                class="c-mt-40 c-mb-12 c-f-f-p c-f-w-700 c-f-s-28 c-f-h-32"
                style="color: #4b1873"
              >
                Lorem ipsum dolor sit.
              </h4>
              <h6
                class="c-mb-16 c-f-f-m c-f-w-400 c-f-s-16 c-f-h-24 c-c-grey-2"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Numquam, incidunt similique quisquam esse quaerat quibusdam.
              </h6>
              <h6
                class="c-f-f-m c-f-w-400 c-f-s-12 c-f-h-16"
                style="color: #581c87"
              >
                Ознакомьтесь с командой-кандидатом, утвердите или откажитесь от
                неё, чтобы ИИ нашёл вам другого исполнителя.
              </h6>
            </div>
          </section>

          <section class="flex items-end c-mb-32">
            <div class="c-ml-32 c-f-f-m c-f-w-400 c-f-s-16 c-f-h-24 c-c-grey-2">
              11.11.2011
            </div>

            <c-button
              class="c-ml-32"
              :label="'Перейти к профилю'"
              :textColor="'white'"
              :background="true"
            />

            <c-button
              class="c-ml-32"
              :label="'Утвердить исполнителя'"
              :textColor="'white'"
              :background="true"
            />

            <c-button
              class="c-ml-32"
              :label="'Отказаться'"
              :textColor="'white'"
              :background="true"
            />
          </section>
        </q-item-section>
      </section>

      <section class="c-mb-64">
        <h5 class="c-mb-24 c-f-f-p c-f-w-400 c-f-s-20 c-f-h-28 c-c-grey-1">
          Что требуется сделать
        </h5>
        <div class="flex justify-start">
          <div class="flex wrap">
            <div
              v-for="todo in props.order.type.id"
              class="flex column justify-start c-mr-24"
            >
              <p
                class="text-content-component-todo c-f-f-m c-f-w-500 c-f-s-14 c-f-h-20 c-mb-24"
              >
                {{ todo }}
              </p>
              <div
                class="text-content-component c-mb-12"
                v-for="fun in props.order.type.id"
              >
                <ul>
                  <li
                    class="q-ml-md c-f-f-m c-f-w-500 c-f-s-14 c-f-h-20 c-c-grey-2 c-mb-12"
                  >
                    {{ fun }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="c-mb-64">
        <div class="flex justify-start items-baseline c-mb-16">
          <h5 class="c-f-f-p c-f-w-400 c-f-s-20 c-f-h-28 c-c-grey-1 c-mr-32">
            Описание заказа
          </h5>

          <div
            v-if="order.consultation"
            class="flex justify-start items-center"
          >
            <p
              class="c-f-f-m c-f-w-400 c-f-s-12 c-f-h-16"
              style="margin: 0; color: #581c87"
            >
              Мне нужна консультация
            </p>
          </div>
        </div>

        <p
          class="c-f-f-m c-f-w-400 c-f-s-16 c-f-h-24 c-c-grey-2 style-information-block"
        >
          {{ order.description }}
        </p>
      </section>

      <section class="c-mb-64">
        <h5 class="c-mb-32 c-f-f-p c-f-w-400 c-f-s-20 c-f-h-28 c-c-grey-1">
          Файлы и документы
        </h5>
        <div
          v-if="props.order.files === null"
          class="c-f-f-m c-f-w-400 c-f-s-16 c-f-h-24 c-c-grey-2"
        >
          Файлов нет
        </div>
        <div v-else>{{ props.order.files }}</div>
      </section>

      <section class="flex justify-start items-baseline">
        <div class="c-mr-172">
          <h5 class="c-mb-24 c-f-f-p c-f-w-400 c-f-s-20 c-f-h-28 c-c-grey-1">
            Желаемая стоимость
          </h5>
          <div class="flex">
            <p
              class="c-f-f-m c-f-w-500 c-f-s-16 c-f-h-20 c-c-grey-2 c-mr-76 flex items-center"
            >
              от {{ props.order.price_start }}
              <q-icon
                class="q-ml-sm"
                size="20px"
                name="img:/assets/icons/orderIcons/ruble.svg"
              ></q-icon>
            </p>
            <p
              class="c-f-f-m c-f-w-500 c-f-s-16 c-f-h-20 c-c-grey-2 flex items-center"
            >
              до {{ props.order.price_end }}
              <q-icon
                class="q-ml-sm"
                size="20px"
                name="img:/assets/icons/orderIcons/ruble.svg"
              ></q-icon>
            </p>
          </div>
        </div>

        <div>
          <h5 class="c-mb-24 c-f-f-p c-f-w-400 c-f-s-20 c-f-h-28 c-c-grey-1">
            Желаемый срок готовности
          </h5>

          <div class="c-f-f-m c-f-w-500 c-f-s-16 c-f-h-20 c-c-grey-2">
            {{ props.order.date_complete }}
          </div>
        </div>
      </section>
    </section>
  </section>
</template>

<script setup>
import { defineProps } from "vue";
import CButton from "../components/ClubButton.vue";
import COrderStatus from "../components/ClubOrderStatus.vue";

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.style-information-block {
  border: 2px solid #d4d4d8;
  border-radius: 10px;
  padding: 6px 7px 6px 7px;
}
.wrapper-page-order-info {
  max-width: 1024px;
  padding: 64px 0 200px 32px;
}
.color-type-status {
  width: 12px;
  height: 12px;
  border-radius: 25px;
}
.block-control-response {
  max-width: 820px;
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

.text-content-component-todo {
  border-radius: 100px;
  color: white;
  background: linear-gradient(101.75deg, #4c1d95 4.25%, #881d95 96.95%);
  padding: 10px 16px 10px 16px;
}

.c-f-f {
  &-m {
    font-family: "Montserrat";
    font-style: normal;
  }

  &-p {
    font-family: "Play";
    font-style: normal;
  }

  &-f {
    font-family: "Furore";
    font-style: normal;
  }
}

.c-f-w {
  &-700 {
    font-weight: 700;
  }
  &-500 {
    font-weight: 500;
  }
  &-400 {
    font-weight: 400;
  }
}
.c-f-s {
  &-12 {
    font-size: 12px;
  }
  &-14 {
    font-size: 14px;
  }
  &-16 {
    font-size: 16px;
  }
  &-20 {
    font-size: 20px;
  }
  &-28 {
    font-size: 28px;
  }
  &-32 {
    font-size: 32px;
  }
}
.c-f-h {
  &-16 {
    line-height: 16px;
  }
  &-20 {
    line-height: 20px;
  }
  &-24 {
    line-height: 24px;
  }
  &-28 {
    line-height: 28px;
  }
  &-32 {
    line-height: 32px;
  }
  &-40 {
    line-height: 40px;
  }
}

.c-c {
  &-grey-1 {
    color: #27272a;
  }
  &-grey-2 {
    color: #3f3f46;
  }
}

.c {
  &-mt {
    &-32 {
      margin-top: 32px;
    }
    &-40 {
      margin-top: 40px;
    }
    &-64 {
      margin-top: 64px;
    }
  }
  &-mb {
    &-24 {
      margin-bottom: 24px;
    }
    &-26 {
      margin-bottom: 26px;
    }
    &-32 {
      margin-bottom: 32px;
    }
    &-12 {
      margin-bottom: 12px;
    }
    &-16 {
      margin-bottom: 16px;
    }
    &-68 {
      margin-bottom: 68px;
    }
    &-64 {
      margin-bottom: 64px;
    }
  }
  &-ml {
    &-32 {
      margin-left: 32px;
    }
  }
  &-mr {
    &-32 {
      margin-right: 32px;
    }
    &-24 {
      margin-right: 24px;
    }
    &-76 {
      margin-right: 76px;
    }
    &-172 {
      margin-right: 172px;
    }
  }
}
</style>
