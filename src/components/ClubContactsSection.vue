<template>
  <section class="q-mt-xl">
    <header class="text-subtitle2">{{ title }}</header>

    <main v-if="!Array.isArray(textContent)" class="q-mt-md" :class="classes">
      <q-img
        v-if="imageUrl"
        class="q-mr-lg standart-size-img"
        :src="imageUrl"
      />

      <div class="text-body2">{{ textContent }}</div>
    </main>

    <main v-else class="q-mt-md">
      <q-img
        v-if="imageUrl"
        class="q-mr-lg standart-size-img"
        :src="imageUrl"
      />

      <div v-for="text in textContent" :key="text" class="text-body2 q-mt-md">
        {{ text }}
      </div>
    </main>
  </section>
</template>

<script setup>
import { ref } from "vue";

const { title, row, imageUrl, textContent } = defineProps({
  title: String,
  row: Boolean,
  imageUrl: String,
  textContent: [String, Array],
});

const classes = ref({
  flex: row,
  "items-center": row,
});
</script>

<style scoped lang="scss">
.standart-size-img {
  width: 48px;
}
</style>
