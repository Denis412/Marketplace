<template>
  <section v-if="filteredApplications?.incoming.length" class="c-mb-32">
    <h4 class="text-h4 c-mb-16">Входящие заявки</h4>

    <c-applications-list
      :applications="filteredApplications?.incoming"
      incoming
    />
  </section>

  <section v-if="filteredApplications?.outgoing.length" class="c-mb-32">
    <h4 class="text-h4 c-mb-16">Исходящие заявки</h4>

    <c-applications-list :applications="filteredApplications?.outgoing" />
  </section>
</template>

<script setup>
import { computed, inject } from "vue";
import CApplicationsList from "./ClubApplicationsList.vue";
import { useApplications } from "src/use/applications";
import userApi from "src/sdk/user";

const currentUser = inject("currentUser");

const { result: subjectData } = userApi.queryGetSubjectById(
  currentUser.value?.subject_id
);

const currentSubject = computed(() => subjectData.value?.get_subject);

const { filteredApplications } = useApplications(currentSubject);
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
