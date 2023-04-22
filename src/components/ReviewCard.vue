<template>
  <q-card class="card">
    <div class="flex items-center">
      <q-img style="width: 90px" :src="avatarUrl" alt="avatar" />

      <div style="margin-left: 50px">
        <div class="text-subtitle1">{{ fullname }}</div>

        <div class="card-job-title text-body2 q-mt-sm">
          {{ jobTitle }}
        </div>
      </div>
    </div>

    <div class="club-mt-32 overflow-auto text-body1">
      {{ content }}
    </div>

    <div class="club-mt-24">
      <q-icon
        v-for="n in 5"
        name="star"
        :key="n"
        class="font-size-22"
        :style="{ color: n <= stars ? '#B936E7' : '#190A32' }"
      />
    </div>
  </q-card>
</template>

<script setup>
const { avatarUrl, fullname, jobTitle, content, stars } = defineProps({
  avatarUrl: String,
  fullname: String,
  jobTitle: String,
  content: String,
  stars: Number,
});
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 546px;
  height: 350px;
  background: #260f4a;
  padding: 40px;

  border-radius: 33px;

  &-job-title {
    background: linear-gradient(101.75deg, #881d95 4.25%, #881d95 96.95%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
}
</style>
