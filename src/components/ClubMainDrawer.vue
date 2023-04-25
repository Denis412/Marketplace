<template>
  <q-drawer
  show-if-above
  bordered
  :side="side"
  :mini="miniState"
  v-model="drawer"
  :width="256"
  >
    <q-list>
      Contetn
    </q-list>
    <button
    ref="btn"
    class="bg-violet-6 drawer-btn absolute"
    @click="toggleDrawer()"
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

const drawer = ref(false);
const miniState = ref(false);
const btn = ref();

const toggleDrawer = () => {
  miniState.value = !miniState.value;
  btn.value.classList.toggle("rotate")
}
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
  transition: ease .6s all;
}

.rotate {
  transform: rotate(-180deg);
}

.overflow-initial {
  overflow: initial !important;
}
</style>
