<template>
  <q-card class="card q-pa-lg column justify-between">
    <div class="column justify-start">
      <header>
        <div class="text-h4 flex justify-start direction_card_header c-mb-12 z-max">
          {{ title }}
        </div>
        <hr class="line q-mb-lg" />
      </header>

      <main class="text-body2">
        <ul class="q-ml-sm tabs">
          <li class="q-pb-sm" v-for="contentItem in content" :key="contentItem">
            <span class="content">{{ contentItem }}</span>
          </li>
        </ul>
      </main>
    </div>
    <footer>
      <q-btn class="text-body1 card-button q-pa-sm" no-caps :to="to" :label="btnContent" />
    </footer>
  </q-card>
</template>

<script setup>
const { to, btnContent, title, content } = defineProps({
  to: String,
  btnContent: String,
  title: String,
  content: Array,
});
</script>

<style lang="scss" scoped>
.tabs {
  padding-left: 0;
  text-align: left;
}

li {
  color: #c800c8;
}

li span {
  color: white;
}

.content {
  color: #d6c1dd;
}
.line {
  width: 234px;
  height: 1px;
  background-color: white;
}
.card {
  border: 4px solid transparent;
  min-height: 390px;
  width: 352px;
  box-sizing: border-box;

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

.card-button {
  width: 100%;
  border-radius: 8px;
  padding-top: 14px;
  padding-bottom: 14px;
  background: linear-gradient(101.75deg, #4c1d95 4.25%, #881d95 96.95%);
}

.direction_card_header {
  color: #ede5f0;
}
</style>
