<template>
  <section class="c-mb-36">
    <!-- получить фильтрованный массив, убрать filter -->
    <q-list
      v-for="elem in list.filter((elem) => !elem.status).splice(0, 3)"
      :key="elem.id"
    >
      <q-item class="flex justify-between c-notification-item">
        <q-btn
          @click="elem.status = !elem.status"
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