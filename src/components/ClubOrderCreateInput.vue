<template>
<label :for="name" class="text-subtitle3 input-title input-mt">
  {{ title }}
</label>
<q-input :type="type" class="input c-mt-24" :name="name" :placeholder="placeholder" outlined/>

</template>

<script setup>
const { title, name, placeholder, type } = defineProps({
  title: String,
  name: String,
  placeholder: String,
  type: String
})

</script>

<style lang="scss" scoped>
.input-title {
  &::before {
    content: '';
    display: block;
    width: 11px;
    height: 11px;
    border-radius: 100px;
    background: #581C87;
    transform: translate(-21px, 20px);
  }
}

.input {
  border-radius: 8px;
}

.input-mt {
  margin-top: 80px;
  display: block;
}
</style>
