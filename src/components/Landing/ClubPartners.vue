<template>
  <section class="section-margin text-center container">
    <div class="text-h3 q-mt-xl">С нами сотрудничают</div>
    <div class="items-wrap">
      <div class="items marquee reverce">
        <img class="item" v-for="partner in partners" :key="partner.id" :src="partner.imageUrl" />
      </div>
      <div aria-hidden="true" class="items marquee reverce">
        <img class="item" v-for="partner in partners" :key="partner.id" :src="partner.imageUrl" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const partners = ref([
  { id: 1, imageUrl: "/assets/images/landing/partners/logo-rso.svg" },
  { id: 2, imageUrl: "/assets/images/landing/partners/logo-rao.svg" },
  { id: 3, imageUrl: "/assets/images/landing/partners/logo-rosnou.svg" },
  { id: 4, imageUrl: "/assets/images/landing/partners/logo-obrsoyuz.svg" },
]);
</script>

<style lang="scss" scoped>
.items-wrap {
  position: relative;
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: 20px;
}
.items-wrap:before,
.items-wrap:after {
  content: "";
  height: 100%;
  top: 0;
  width: 10%;
  position: absolute;
  z-index: 1;
  pointer-events: none;
}
.items {
  flex-shrink: 0;
  display: flex;
  gap: 20px;
  counter-reset: item;
  justify-content: space-around;
  min-width: 100%;
}
.item {
  flex: 0 0 auto;
  width: 235px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-left: 100px;
  transition: all 0.1s ease-in-out;
}
.marquee {
  animation: scroll 20s linear infinite;
}
.reverce {
  animation-direction: reverse;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - 20px));
  }
}
</style>
