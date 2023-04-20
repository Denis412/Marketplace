<template>
  <q-page class="flex flex-center column">
    <!-- <t-club-input type="password" placeholder="Введите пароль" /> -->
    <q-form @submit="sub">
      <club-input
        type="password"
        visibility
        placeholder="Введите пароль"
        :rules="[required, minLength(8), passwordValid]"
        v-model="v"
      />

      <q-btn label="Submit" type="submit" />
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import ClubInput from "src/components/ClubInput.vue";
import { useValidators } from "src/use/validators";

const { passwordValid, minLength, required } = useValidators();

const sub = () => {
  console.log("gshg");
};

const v = ref("f");
</script>
