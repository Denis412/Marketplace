<template>
  <q-drawer
  show-if-above
  bordered
  :side="side"
  v-model="drawer"
  :width="256"
  >
    <q-list> </q-list>
    <button
    class="bg-violet-6 drawer-btn absolute"
    @click="drawer = !drawer"
    >
      <img
      src="/src/assets/icons/DrawerArrow.svg"
      />
    </button>

  </q-drawer>
</template>

<script setup>
import { ref } from "vue";
const { side } = defineProps({
  side: String,
});

const drawer = ref(true);
</script>

<style scoped lang="scss">
.drawer-btn {
  width: 24px;
  height: 24px;
  box-shadow: 0px 1px 11px rgba(132, 132, 132, 0.25);
  border-radius: 5px;
  border: none;
  top: 8px;
  right: -12px;
}

.overflow-initial {
  overflow: initial !important;
}
</style>
