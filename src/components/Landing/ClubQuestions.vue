<template>
  <section class="questions container">
    <div class="text-h3">Часто задаваемые вопросы</div>
    <dropdown
      v-for="item in dropdown"
      :key="item.title"
      :title="item.title"
      :content="item.content"
    />
  </section>
</template>

<script setup>
import { ref } from "vue";
import Dropdown from "./ClubDropdown.vue";

const dropdown = ref([
  {
    title: "Какие требования к участникам Клуба?",
    content: "placeholder",
  },
  {
    title: "Что внутри 1Т Клуба? Какие задачи я смогу решать?",
    content: "placeholder",
  },
  {
    title: "Как вступить в команду команду?",
    content: "placeholder",
  },
  {
    title: "Как оформить заказ в 1Т Клубе?",
    content: "placeholder",
  },
]);
</script>

<style lang="scss" scoped>
.questions {
  margin-top: 124px;
}

.title {
  font-weight: 500;
  font-size: 32px;
  line-height: 39px;
}
</style>
