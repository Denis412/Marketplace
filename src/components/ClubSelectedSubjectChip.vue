<template>
  <q-card class="chip text-caption1">
    {{ subject.fullname.first_name }} {{ subject.fullname.last_name }}

    <q-icon
      name="img:/assets/icons/close/close-black.svg"
      class="cursor-pointer text-h6 q-ml-sm"
      @click="deleteSubject(subject.id)"
    />
  </q-card>
</template>

<script setup>
import { inject } from "vue";

const { subject } = defineProps({
  subject: Object,
});

const selectedSubjects = inject("selectedSubjects");

const deleteSubject = (subject_id) => {
  const subjectIndex = selectedSubjects.value.findIndex((subject) => subject.id === subject_id);

  selectedSubjects.value = [
    ...selectedSubjects.value.slice(0, subjectIndex),
    ...selectedSubjects.value.slice(subjectIndex + 1),
  ];
};
</script>

<style scoped lang="scss">
.chip {
  padding: 10px 16px;

  width: max-content;
  height: min-content;
}
</style>
