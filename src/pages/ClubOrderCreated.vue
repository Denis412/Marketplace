<template>
  <q-page class="c-pt-32 c-pt-32 container">
      <h3 class="text-h3 text-violet-6">
        Отлично! Ваш заказ размещен. Мы ищем исполнителя.
      </h3>
      <section class="relative-position">
        <img class="absolute-center human-img" src="/assets/images/order/human.svg" alt="">

        <div class="search row items-center">
          <div class="circles row">
            <div class="circle1"></div>

            <div class="circle2"></div>

            <div class="circle3"></div>
          </div>

          <div class="text-body2 text-violet-6">
            Поиск исполнителя...
          </div>
        </div>

        <c-button
        class="text-body1 c-mt-32"
        :label="'Мои заказы'"
        :background="true"
        @click="toOrders"
        />
      </section>

  </q-page>
</template>

<script setup>
import CButton from "src/components/ClubButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const toOrders = () => {
  router.push({ name: "orders" });
}
</script>

<style lang="scss" scoped>
.human-img {
  top: -85px !important;
  transform: translate(-50%, 0);
}

.search {
  margin-top: 85px;
  gap: 7px;
}

.circles {
  gap: 7px;

  & * {
    width: 15px;
    height: 15px;
    border-radius: 100px;
    background-color: black;
  }
}

.circle1 {
  background: #851E96;
}

.circle2 {
  background: #6E1E96;
}

.circle3 {
  background: #501E96;
}
</style>
