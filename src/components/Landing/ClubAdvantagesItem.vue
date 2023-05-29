<template>
  <div :style="id == 1 ? 'margin-left: 100px' : ''">
    {{ content }}
  </div>
</template>
<script setup>
const { id, content } = defineProps({
  id: Number,
  content: String,
});
</script>
<style scoped lang="scss"></style>
