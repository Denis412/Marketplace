<template>
  <q-btn-dropdown
  flat
  class="dropdown"
  align="between"
  color="#260F4A"
  :label="title"
  dropdown-icon="expand_more"
  >
    <div>
      {{ content }}
    </div>
  </q-btn-dropdown>
</template>

<script setup>
import { defineProps } from "vue";

const { title, content } = defineProps({
  title: String,
  content: String,
})
</script>

<style lang="scss" scoped>
.dropdown {
  margin-top: 8px;
  width: 100%;
  height: 90px;
  border-radius: 16px;
  text-transform: none;
  font-size: 32px;
  line-height: 39px;
  letter-spacing: -0.03em;
}

.q-btn__content {
  justify-content: space-between !important;

}
</style>
