<template>
  <label :for="name" class="text-subtitle3 input-title input-mt">
    {{ title }}
  </label>

  <q-input
  v-model="inputValue"
  @update:model-value="change"
  :type="type"
  class="input c-mt-24"
  :name="name"
  :placeholder="placeholder"
  outlined
  :rules="[required, maxLength(length)]"
  :readonly="readonly"
  />
</template>

<script setup>
import { ref } from "vue";
import { useValidators } from "src/use/validators";

const { title, name, placeholder, type, length, readonly, value } = defineProps({
  title: String,
  name: String,
  placeholder: String,
  type: String,
  length: Number,
  readonly: Boolean,
  value: String
})

const emit = defineEmits(["change"])

const inputValue = ref(value);

const change = () => {
  emit("change", inputValue.value);
}

const { required, maxLength } = useValidators();
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
