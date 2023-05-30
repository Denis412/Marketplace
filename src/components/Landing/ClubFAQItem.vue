<template>
  <q-expansion-item
    class="text-subtitle5 text-left"
    :label="label"
    :header-style="{ paddingLeft: 0 }"
    expand-icon-class="text-white"
  >
    <q-card class="text-body2">
      <q-card-section v-if="content.length > 1" class="q-pl-none">
        <ul>
          <li v-for="contentItem in content" :key="contentItem">{{ contentItem }}</li>
        </ul>
      </q-card-section>
      <q-card-section v-else class="q-pl-none">
        <div v-html="content[0]"></div>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>
<script setup>
const { label, content } = defineProps({
  label: String,
  content: Array,
});
</script>
<style scoped lang="scss">
.q-expansion-item {
  border-bottom: 2px solid #9043b4;
}
.q-card {
  background-color: transparent;
}
li {
  list-style-position: inside;
  list-style-type: none;
  &::before {
    content: "• ";
  }
}
</style>
