<template>
  <q-list>
    <c-faq-item v-for="item in questions" :key="item.id" v-bind="item" class="q-mb-md q-pb-sm" />
  </q-list>
</template>
<script setup>
import CFaqItem from "./ClubFAQItem.vue";

const { questions } = defineProps({
  questions: Object,
});
</script>
