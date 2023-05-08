<template>
  <q-item class="flex items-center col-5 rounded-borders-10">
    <q-avatar class="medium-avatar cursor-pointer">
      <q-img
        :src="specialist.avatar || '/src/assets/images/default-avatar.svg'"
      />
    </q-avatar>

    <div class="q-ml-md">
      <div class="text-body2 text-violet-6">
        {{ specialist.fullname.first_name }} {{ specialist.fullname.last_name }}
      </div>

      <div class="text-caption1 q-mt-sm text-violet-6">
        {{ specialist.speciality?.name }}
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
