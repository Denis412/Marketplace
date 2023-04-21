<template>
  <section class="q-mt-xl">
    <header class="text-24">{{ title }}</header>

    <main
      v-if="!Array.isArray(textContent)"
      class="q-mt-md"
      :class="{ flex: row, 'items-center': row }"
    >
      <q-img
        v-if="imageUrl"
        class="q-mr-lg standart-size-img"
        :src="imageUrl"
      />

      <div class="text-16">{{ textContent }}</div>
    </main>

    <main v-else class="q-mt-md">
      <q-img
        v-if="imageUrl"
        class="q-mr-lg standart-size-img"
        :src="imageUrl"
      />

      <div v-for="text in textContent" :key="text" class="text-16 q-mt-md">
        {{ text }}
      </div>
    </main>
  </section>
</template>

<script setup>
const { title, row, imageUrl, textContent } = defineProps({
  title: String,
  row: Boolean,
  imageUrl: String,
  textContent: [String, Array],
});
</script>

<style scoped lang="scss">
.standart-size-img {
  width: 48px;
}
</style>
