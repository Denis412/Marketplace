<template>
  <section class="flex items-center">
    <q-avatar class="medium-avatar">
      <q-img src="/src/assets/images/Ellipse55.svg" />
    </q-avatar>

    <div class="q-ml-md">
      <div class="text-body2">
        {{ specialist.first_name }} {{ specialist.last_name }}
      </div>

      <div class="text-caption1 q-mt-sm">
        {{ specialist.speciality }}
      </div>
    </div>
  </section>
</template>

<script setup>
const { specialist } = defineProps({
  specialist: Object,
});
</script>

<style scoped lang="scss"></style>
