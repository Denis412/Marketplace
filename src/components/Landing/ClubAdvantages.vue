<template>
  <section class="text-center section-bottom section-mb">
    <h3 class="text-h3 c-mb-64">НАШИ ПРЕИМУЩЕСТВА</h3>
    <div class="card" ref="scroller" @wheel.prevent="onWheel">
      <c-advantages-item
        v-for="item in contentList"
        :key="item.id"
        :item="item"
        class="card--content"
      />
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";
import CAdvantagesItem from "./ClubAdvantagesItem.vue";

const { contentList } = defineProps({
  contentList: Array,
});

console.log(contentList);
const scroller = ref(null);

const onWheel = (e) => {
  scroller.value.scrollLeft += e.deltaY;
};
</script>

<style scoped lang="scss">
.card {
  min-width: 100%;
  min-height: 200px;
  overflow-x: auto;
  display: flex;
}

.card::-webkit-scrollbar {
  display: none;
}
</style>
