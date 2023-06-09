<template>
  <div>
    <label :for="name" class="text-subtitle5 input-title input-mt c-mb-24">
      {{ title }}
    </label>

    <q-input
      v-model="inputValue"
      @update:model-value="change"
      :type="type"
      :class="className"
      :name="name"
      :placeholder="placeholder"
      outlined
      :rules="[required, maxLength(length)]"
      :readonly="readonly"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useValidators } from "src/use/validators";

const { title, name, placeholder, type, length, readonly, value, className } = defineProps({
  title: String,
  name: String,
  placeholder: String,
  type: String,
  length: Number,
  readonly: Boolean,
  value: String,
  className: String,
});

const emit = defineEmits(["change"]);

const inputValue = ref(value);

const change = () => {
  emit("change", inputValue.value);
};

const { required, maxLength } = useValidators();
</script>

<style lang="scss" scoped>
.input-title {
  margin-left: 21px;

  &::before {
    content: "";
    display: block;
    width: 11px;
    height: 11px;
    border-radius: 100px;
    background: #581c87;
    transform: translate(-21px, 20px);
  }
}

.input-mt {
  display: block;
}
</style>
