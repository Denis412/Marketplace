<template>
  <q-drawer show-if-above bordered :side="side">
    <q-list> </q-list>
  </q-drawer>
</template>

<script setup>
const { side } = defineProps({
  side: String,
});
</script>

<style scoped lang="scss"></style>
