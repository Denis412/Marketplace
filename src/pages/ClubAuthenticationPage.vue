<template>
  <div class="fullscreen text-center flex row">
    <c-authentication />
    <c-registration />
  </div>
</template>
<script setup>
import CAuthentication from "src/components/ClubAuthentication.vue";
import CRegistration from "src/components/ClubRegistration.vue";
</script>
