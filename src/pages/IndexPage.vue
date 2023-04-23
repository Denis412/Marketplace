<template>
  <q-page class="flex flex-center column">
    <q-form @submit="sub" class="flex column items-center">
      <c-input
        type="password"
        visibility
        placeholder="Введите пароль"
        :rules="[required, minLength(8), passwordValid]"
        v-model.capitalize="v"
      />

      <c-button
        background
        type="submit"
        label="Смотреть резюме"
        icon-right="img:src/assets/icons/Plus/plus.svg"
      />
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import CInput from "src/components/ClubInput.vue";
import CButton from "src/components/ClubButton.vue";
import { useValidators } from "src/use/validators";

const { passwordValid, minLength, required } = useValidators();

const sub = () => {
  console.log("gshg");
};

const v = ref("f");
</script>

<style lang="scss" scoped></style>
