<template>
  <q-layout view="hHh LpR lff">
    <c-landing-main-header />

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>

    <c-main-footer />
  </q-layout>
</template>

<script setup>
import CLandingMainHeader from "components/Landing/ClubLandingMainHeader.vue";
import CMainFooter from "components/Landing/ClubMainFooter.vue";
</script>

<style lang="scss"></style>
