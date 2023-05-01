<template>
  <q-item class="flex items-center bg-grey-12 col-5 rounded-borders-10">
    <q-avatar class="medium-avatar">
      <q-img src="/src/assets/images/Ellipse55.svg" />
    </q-avatar>

    <div class="q-ml-md">
      <div class="text-body2 text-violet-6">
        {{ specialist.first_name }} {{ specialist.last_name }}
      </div>

      <div class="text-caption1 q-mt-sm text-violet-6">
        {{ specialist.speciality }}
      </div>
    </div>
  </q-item>
</template>

<script setup>
const { specialist } = defineProps({
  specialist: Object,
});
</script>

<style scoped lang="scss"></style>
