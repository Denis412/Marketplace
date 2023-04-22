<template>
  <q-btn-dropdown
    flat
    class="dropdown text-subtitle1 q-mt-sm"
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
const { title, content } = defineProps({
  title: String,
  content: String,
});
</script>

<style lang="scss" scoped>
.dropdown {
  width: 100%;
  height: 90px;
  text-transform: none;
  border-radius: 1rem;
  background: #260f4a;
}
</style>
