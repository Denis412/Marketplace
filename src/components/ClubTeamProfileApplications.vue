<template>
  <c-applications-list />

  <div class="c-team-requests flex justify-center">
    <div class="flex flex-center club-my-64">
      <q-img
        class="c-team-emptyImg"
        src="/assets/images/my-teams-page/not-applications.svg"
      />

      <div class="c-team-ml-78 flex items-center">
        <h6 class="text-body2">Здесь пока пусто</h6>
      </div>
    </div>
  </div>
</template>

<script setup>
import CApplicationsList from "./ClubApplicationsList.vue";
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
