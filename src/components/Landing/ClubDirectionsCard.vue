<template>
  <q-card class="card column justify-between q-pa-lg">
    <header>
      <div class="card-cap" />
      <div class="q-my-md text-h3">{{ title }}</div>
    </header>

    <main class="text-body2">
      <div v-for="contentItem in content" :key="contentItem">
        {{ contentItem }}
      </div>
    </main>

    <footer>
      <q-btn class="card-button" no-caps label="Перейти" />
    </footer>
  </q-card>
</template>

<script setup>
const { title, content } = defineProps({
  title: String,
  content: Array,
});
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  min-height: 316px;
  width: 300px;
  box-sizing: border-box;

  background: rgba(51, 19, 99, 0.5);
  backdrop-filter: blur(2px);

  border-radius: 12px;
}

.card-cap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  height: 14px;

  background: linear-gradient(101.75deg, #4c1d95 4.25%, #881d95 96.95%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px 12px 0px 0px;
}

.card-button {
  background: linear-gradient(135deg, #c800c8 0%, #9600ff 100%, #9600ff 100%);
}
</style>
