<template>
  <q-list class="">
    <c-advantages-item v-for="item in contentList" :key="item.id" v-bind="item" />
  </q-list>
</template>
<script setup>
import CAdvantagesItem from "./ClubAdvantagesItem.vue";

const { contentList } = defineProps({
  contentList: Object,
});
</script>

<style scoped lang="scss">
// .list {
//   gap: 32px;
// }
</style>
<!-- flex row no-wrap overflow-hidden justify-start list  -->
