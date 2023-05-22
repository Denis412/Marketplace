<template>
  <section class="c-mb-36">
    <q-list v-for="(elem, index) in list.slice(0, 3)" :key="elem.id">
      <q-item class="flex justify-between c-notification-item">
        <q-btn
          @click="list.splice(index, 1)"
          round
          flat
          icon="img:/assets/icons/Eye/eye-violet6.svg"
        />
        <q-item-section>{{ elem.sendler }}</q-item-section>
        <q-item-section>{{ elem.message }}</q-item-section>
        <q-item-section class="item-light">{{ elem.data }}</q-item-section>
      </q-item>
    </q-list>
  </section>
</template>

<script setup>
const { list } = defineProps({
  list: Object,
});
</script>

<style lang="scss" scoped>
</style>