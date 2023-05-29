<template>
  <div class="c-mt-24" v-if="pages">
    <q-tree
      :nodes="pages"
      node-key="id"
      no-connectors
      v-model:selected="selected"
      @update:selected="redirect"
      no-selection-unset
      class="c-tree"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const pages = ref([
    {
        id: 1,
        label: "Мои заказы",
        icon: "img:/assets/icons/tree/default-tree-icon.svg"
    }
])
</script>

<style lang="scss" scoped></style>
