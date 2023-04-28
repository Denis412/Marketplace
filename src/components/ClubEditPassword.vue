<template>
  <c-confirmation-code-dialog
    v-model="showConfirmCodeDialog"
    :timer="timer"
    :auth-info="authInfo"
  />

  <c-edit-password-dialog :auth-info="authInfo" />
</template>

<script setup>
import CConfirmationCodeDialog from "src/components/ClubConfirmationCodeDialog.vue";
import CEditPasswordDialog from "src/components/ClubEditPasswordDialog.vue";
import { useTimer } from "src/use/timer";

const { authInfo } = defineProps({
  authInfo: Object,
});

const timer = useTimer(90);

const showConfirmCodeDialog = ref(true);
</script>

<style scoped lang="scss"></style>
