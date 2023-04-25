<template>
  <q-input
    class="club-input"
    outlined
    v-model="value"
    @update:modelValue="emitChange"
    :type="calcType"
    :autogrow="autogrow"
    :placeholder="placeholder"
    :rules="rules"
  >
    <template v-slot:append v-if="visibility">
      <q-img
        class="cursor-pointer club-input-append-icon"
        src="src/assets/icons/Eye/Eye.svg"
        @click="toggleShowText"
      />
    </template>
  </q-input>
</template>

<script setup>
import { ref } from "vue";
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

const toggleShowText = () => {
  showText.value = !showText.value;

  calcType.value = showText.value ? "password" : "text";
};

const emitChange = (targetValue) => {
  let text = targetValue;

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

<style scoped lang="scss">
.club-input-append-icon {
  width: 22px;
  height: 15px;
}
</style>
