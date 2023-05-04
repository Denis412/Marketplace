<template>
  <div class="club-mb-32">
    <h4 class="text-h4 club-mb-16">{{ title }}</h4>

    <div v-if="requests.length">
      <c-team-card
        v-for="request in requests"
        :key="request.id"
        :team="request"
      />
    </div>

    <div class="c-team-requests flex justify-center" v-else>
      <div class="flex flex-center club-my-64">
        <q-img
          class="c-team-emptyImg"
          src="/src/assets/teams/emptyRequest.png"
        />

        <div class="c-team-ml-78 flex items-center">
          <h6 class="text-body2">Здесь пока пусто</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CTeamCard from "src/components/ClubTeamCard.vue";

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
