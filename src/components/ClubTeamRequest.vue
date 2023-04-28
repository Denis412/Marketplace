<template>
  <div class="club-mb-32">
    <h4 class="text-h4 club-mb-16">{{ title }}</h4>

    <div class="c-team-requests flex justify-center">
      <!-- пусто, будет v-if -->
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
const { title } = defineProps({
  title: String,
});
</script>

<style lang='scss' scoped>
.c-team {
  &-emptyImg {
    width: 205px;
  }
  &-requests {
    width: 100%;
    border: 1px dashed #5c309f;
  }
  &-ml-78 {
    margin-left: 78px;
  }
}
</style>