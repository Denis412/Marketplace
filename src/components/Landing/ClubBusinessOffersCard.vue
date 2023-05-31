<template>
  <q-card class="card text-left">
    <div class="content">
      <div class="text-h4 card_header">{{ title }}</div>
      <div class="text-body2 text">
        <ul class="tabs">
          <li v-for="contentItem in content" :key="contentItem">
            <span>{{ contentItem }}</span>
          </li>
        </ul>
      </div>
    </div>
  </q-card>
</template>

<script setup>
const { title, content } = defineProps({
  title: String,
  content: Array,
});
</script>

<style lang="scss" scoped>
.content {
  max-width: 280x;
}
.tabs {
  margin-left: 32px;
  text-align: left;
}
li {
  width: 256px;
  position: relative;
  color: #d6c1dd;
  list-style: none;
  margin-bottom: 25px;
  &::before {
    content: url("/assets/icons/business/question.svg");
    position: absolute;
    top: 4px;
    left: -32px;
  }
  &:first-child {
    max-width: 230px;
  }
  &:last-child::before {
    content: url("/assets/icons/business/solution.svg");
    margin-bottom: 0;
  }
}
.card {
  border: 4px solid transparent;
  padding: 32px;
  min-height: 350px;
  width: 352px;
  background: linear-gradient(
    101.5deg,
    rgba(16, 5, 34, 0.1) 37.03%,
    rgba(255, 255, 255, 0.08) 80.19%,
    rgba(16, 5, 34, 0.1) 100%
  );
  backdrop-filter: blur(2px);
  border-radius: 12px;
  border-image-slice: 24;
  border-image-repeat: round;
  border-image-width: 24px;
  border-image-source: url("/assets/images/border.png");
}

.card_header {
  color: #ede5f0;
  padding-bottom: 16px;
  margin-bottom: 32px;
  border-bottom: 2px solid white;
}
</style>
