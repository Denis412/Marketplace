<template>
  <q-btn-dropdown
    no-caps
    flat
    dropdown-icon="img:/assets/icons/arrow/arrow-down-black.svg"
    class="c-dropdown-button text-caption1 bg-white"
    content-class="c-dropdown-content"
  >
    <q-list separator style="margin-top: 1px">
      <q-item
        clickable
        v-close-popup
        class="bg-white text-caption1"
        v-for="item in list"
        :key="item.id"
      >
        <q-item-section>
          <q-item-label>{{ item.name ?? items.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup>
const { list } = defineProps({
  list: Array,
});
</script>

<style scoped lang="scss"></style>
