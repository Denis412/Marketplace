<template>
  <div class="row q-my-lg">
    <input readonly class="q-py-sm q-pt-sm col-6" :placeholder="path" />
    <input
      readonly
      class="q-py-sm col-6"
      style="direction: rtl"
      :placeholder="'Дата создания: ' + day + ' ' + month + ' ' + year"
    />
    <input
      autocomplete="off"
      class="text-h3 q-mb-sm col-12"
      id="id"
      placeholder="Придумайте название документа"
      v-model="props.titleDocument"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  titleDocument: String,
});

const monthNames = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];

const path = "Главная/Сайт с каталогом/Без названия"; //Placeholder
const date = new Date();
const day = date.getDate();
const month = monthNames[date.getMonth()];
const year = date.getFullYear();
</script>

<style lang="scss" scoped>
input {
  color: grey;
  outline: none;
  border: none;
}
</style>
