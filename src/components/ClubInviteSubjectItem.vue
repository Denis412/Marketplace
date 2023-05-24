<template>
  <q-item :class="{ 'bg-white': isSelect }">
    <c-specialist-item :specialist="subject" class="bg-transparent" />
    <q-checkbox v-model="selectedSubjects" @update:model-value="checkSelect" :val="subject" />
  </q-item>
</template>

<script setup>
import { inject, ref, watch } from "vue";
import CSpecialistItem from "src/components/ClubSpecialistItem.vue";

const { subject } = defineProps({
  subject: Object,
});

const selectedSubjects = inject("selectedSubjects");

const isSelect = ref(false);

const checkSelect = () => {
  const ss = selectedSubjects.value.find((s) => s.id === subject.id);

  isSelect.value = ss !== undefined && ss !== null;
};

watch(selectedSubjects, (value) => {
  checkSelect();
});
</script>

<style scoped lang="scss"></style>
