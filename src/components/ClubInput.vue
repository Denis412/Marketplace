<template>
  <q-input
    class="c-input-outline"
    outlined
    v-model="value"
    @update:model-value="emitChange"
    :type="calcType"
    :autogrow="autogrow"
    :placeholder="placeholder"
    :rules="rules"
  >
    <template v-slot:append>
      <q-icon
        v-if="visibility"
        class="cursor-pointer"
        :name="iconName"
        @click="toggleShowText"
      />

      <slot name="icon"></slot>
    </template>
  </q-input>
</template>

<script setup>
import { computed, ref } from "vue";
import capitalizeWord from "src/utils/capitalizeWord";

const {
  type,
  placeholder,
  visibility,
  autogrow,
  rules,
  modelValue,
  modelModifiers,
  countInput,
} = defineProps({
  type: String,
  placeholder: String,
  visibility: Boolean,
  autogrow: Boolean,
  countInput: String,
  rules: Array,
  modelValue: String,
  modelModifiers: {
    default: () => ({}),
  },
});
const emit = defineEmits(["update:modelValue"]);

const showText = ref(visibility);
const value = ref("");
const calcType = ref(type);

const iconName = computed(() => {
  let name = "";

  if (visibility) {
    name = showText.value
      ? "img:/src/assets/icons/eye/eye-grey.svg"
      : "img:/src/assets/icons/eye/eye-hidden-grey.svg";
  }

  return name;
});

const toggleShowText = () => {
  showText.value = !showText.value;

  calcType.value = showText.value ? "password" : "text";
};

const emitChange = (targetValue) => {
  let text = targetValue;
  console.log(targetValue);

  if (modelModifiers.capitalize) text = capitalizeWord(text);

  if (modelModifiers.capitalizeAll) {
    let words = text.split(" ");

    text =
      words.length > 1
        ? words.map((word) => capitalizeWord(word.trim())).join(" ")
        : capitalizeWord(words[0]);
  }

  if (modelModifiers.numberCode) {
    text = text.replace(/[^0-9]/g, "");

    value.value = text;
    emit("update:modelValue", text, countInput);

    return;
  }

  value.value = text;
  emit("update:modelValue", text);
};
</script>

<style scoped lang="scss"></style>
