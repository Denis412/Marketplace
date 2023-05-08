<template>
  <div class="club-mb-32">
    <div v-if="requests.length">
      <h4 class="text-h4 club-mb-16">{{ title }}</h4>
      <c-team-card-list :teams="requests" />
    </div>
  </div>
</template>

<script setup>
import CTeamCardList from "src/components/ClubTeamCardList.vue";

const { title, requests } = defineProps({
  title: String,
  requests: Object,
});
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
