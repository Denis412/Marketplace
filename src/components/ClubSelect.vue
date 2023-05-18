<template>
  <q-select
    no-caps
    borderless
    class="club-dropdown"
    dropdown-icon="img:/assets/icons/arrow/arrow-down-grey.svg"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> Ничего не найдено </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup></script>

<style scoped lang="scss"></style>
