<template>
  <q-footer class="bg-dark-purple px-160">
    <div class="flex q-pt-lg">
      <section></section>

      <section class="q-gutter-y-lg">
        <div class="text-16 q-mb-sm">Навигация</div>

        <div v-for="n in 3" :key="n">Какой-то раздел</div>
      </section>

      <section class="q-gutter-y-lg" style="margin-left: 124px">
        <div class="text-16 q-mb-sm">Контакты</div>

        <div v-for="contact in contacts" :key="contact.id" class="flex">
          <q-img :src="contact.imageUrl" style="max-width: 20px" />

          <div class="text-16 q-ml-xs">
            {{ contact.text }}
          </div>
        </div>
      </section>

      <section></section>
    </div>
  </q-footer>
</template>

<script setup>
import { ref } from "vue";

const contacts = ref([
  { id: 1, imageUrl: "src/assets/icons/Intersect.svg", text: "Text" },
  { id: 2, imageUrl: "src/assets/icons/Mail.svg", text: "Text@Text.ru" },
  { id: 3, imageUrl: "src/assets/icons/Phone.svg", text: "+7 (999) 999 99 99" },
]);
</script>

<style scoped lang="scss"></style>
