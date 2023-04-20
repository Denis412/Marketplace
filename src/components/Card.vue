<template>
  <q-card
    class="card flex column justify-between"
    style="max-width: 300px; padding: 32px"
  >
    <header>
      <div class="card-cap" />
      <div class="q-my-md card-title">{{ title }}</div>
    </header>

    <main class="card-content text-center">
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
  max-width: 300px;
  width: 300px;

  background: rgba(51, 19, 99, 0.5);
  backdrop-filter: blur(2px);

  border-radius: 12px;

  &:not(&:first-child) {
    margin-left: 110px;
  }
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

.card-title {
  font-weight: 500;
  font-size: 2rem;
  line-height: 36px;
}

.card-content {
  font-weight: 400;
  line-height: 36px;
}

.card-button {
  background: linear-gradient(135deg, #c800c8 0%, #9600ff 100%, #9600ff 100%);
}
</style>
