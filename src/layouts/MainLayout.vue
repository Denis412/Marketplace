<template>
  <q-layout view="hHh LpR lff">
    <c-main-header />

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
import CMainHeader from "components/Landing/ClubMainHeader.vue";
import CMainFooter from "components/Landing/ClubMainFooter.vue";
</script>

<style lang="scss"></style>
