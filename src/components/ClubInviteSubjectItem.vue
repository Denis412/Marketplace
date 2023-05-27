<template>
  <q-item :class="{ 'bg-sh': isSelect }">
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

<style scoped lang="scss">
.bg-sh {
  box-shadow: 0px 25px 10px rgba(0, 0, 0, 0.02), 0px 14px 8px rgba(0, 0, 0, 0.06),
    0px 6px 6px rgba(0, 0, 0, 0.1), 0px 2px 3px rgba(0, 0, 0, 0.12), 0px 0px 0px rgba(0, 0, 0, 0.12);
}
</style>
