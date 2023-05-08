<template>
  <section class="c-mb-32">
    <h4 class="text-h4 c-mb-16">Входящие заявки</h4>

    <c-applications-list
      :applications="filteredApplications?.incoming"
      incoming
    />
  </section>

  <section class="c-mb-32">
    <h4 class="text-h4 c-mb-16">Исходящие заявки</h4>

    <c-applications-list :applications="filteredApplications?.outgoing" />
  </section>
</template>

<script setup>
import { inject, provide } from "vue";
import CApplicationsList from "./ClubApplicationsList.vue";
import { useSubjectApplications } from "src/use/subjectApplications";

const currentUser = inject("currentUser");

const { applications, filteredApplications } = useSubjectApplications({
  subject_id: currentUser.subject_id,
});

provide("applications");
</script>

<style lang="scss" scoped>
.c-team {
  &-emptyImg {
    width: 205px;
  }
  &-requests {
    width: 100%;
    border: 1px dashed #5c309f;
    border-radius: 5px;
  }
  &-ml-78 {
    margin-left: 78px;
  }
}
</style>
