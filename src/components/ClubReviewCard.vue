<template>
  <q-card class="card">
    <div class="flex items-center">
      <q-img class="avatar" :src="avatarUrl" alt="avatar" />

      <div class="title-block" >
        <div class="font-size-24">{{ fullname }}</div>

        <div class="card-job-title">
          {{ jobTitle }}
        </div>
      </div>
    </div>

    <div class="comment-content">
      {{ content }}
    </div>

    <div class="stars-area">
      <q-icon
        v-for="n in 5"
        class="star"
        name="star"
        :key="n"
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
  margin: 0 0 32px 30px;
  border-radius: 33px;

  &:first-child {
    margin: 0 0 30px 0;
  }

  &-job-title {
    background: linear-gradient(101.75deg, #881d95 4.25%, #881d95 96.95%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    margin-top: 8px;
  }
}

.avatar {
  width: 90px
}

.title-block {
  margin-left: 50px
}

.comment-content {
  margin-top: 32px;
  overflow-y: auto;
}

.star {
  font-size: 22px;
}

.stars-area {
  margin-top: 24px
}
</style>
