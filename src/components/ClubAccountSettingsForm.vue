<template>
  <q-form @submit="$emit('submit-form', form)">
    <label for="last_name">
      <p class="text-body2 c-mt-32 q-mb-sm">Фамилия</p>

      <c-input
        id="last_name"
        class="w-100p"
        v-model="form.last_name"
        :placeholder="currentUser.last_name"
      />
    </label>

    <label for="first_name">
      <p class="text-body2 c-mt-32 q-mb-sm">Имя</p>

      <c-input
        id="first_name"
        class="w-100p"
        v-model="form.first_name"
        :placeholder="currentUser.first_name"
      />
    </label>

    <label for="middle_name">
      <p class="text-body2 c-mt-32 q-mb-sm">Отчество</p>

      <c-input
        id="middle_name"
        class="w-100p"
        v-model="form.middle_name"
        :placeholder="currentUser.middle_name"
      />
    </label>

    <label for="email">
      <p class="text-body2 c-mt-32 q-mb-sm">Адрес электронной почты</p>

      <c-input
        id="email"
        class="w-100p"
        :placeholder="currentUser.email"
        disable
      />
    </label>
  </q-form>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "src/stores/user";
import CInput from "./ClubInput.vue";

const emit = defineEmits(["form-submit"]);

const userStore = useUserStore();

const form = ref({
  last_name: "",
  first_name: "",
  middle_name: "",
});

const currentUser = computed(() => userStore.GET_CURRENT_USER);
</script>

<style scoped lang="scss"></style>
