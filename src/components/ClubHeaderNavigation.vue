<template>
  <section class="text-caption1 flex">
    <q-btn
      flat
      no-caps
      :ripple="false"
      v-for="item in navigation_items"
      :key="item.label"
      :icon="item.icon"
      :disable="item.name === 'my-space' || item.name === 'orders'"
      :label="item.label"
      :class="{ 'active-item': selectedPage === item.name }"
      @click="redirectPage(item.name)"
    />
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const selectedPage = ref("teams");
const navigation_items = ref([
  {
    label: "Мой кабинет",
    name: "my-space",
    icon: "img:/assets/icons/my-space/my-space-white.svg",
    active_icon: "",
  },
  {
    label: "Магазин",
    name: "orders",
    icon: "img:/assets/icons/shop/shop-white.svg",
    active_icon: "",
  },
  {
    label: "Команды",
    name: "my-teams",
    icon: "img:/assets/icons/teams/teams-white.svg",
    active_icon: "",
  },
  {
    label: "Мои проекты",
    name: "my-projects",
    icon: "img:/assets/icons/project/project-white.svg",
    active_icon: "",
  },
]);

const redirectPage = (page_name) => {
  selectedPage.value = page_name;

  console.log(selectedPage.value);

  router.push({
    name: page_name,
  });
};
</script>

<style scoped lang="scss">
.active-item {
  color: white;

  text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.25), 0px 0px 4px #c800c8, 0px 0px 8px #c800c8,
    0px 0px 11px #c800c8, 0px 0px 18px #c800c8;

  transition: 0.3s;
}
</style>
