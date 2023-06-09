<template>
  <q-layout view="hHh LpR lff">
    <main-header />

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>

    <club-main-footer />
  </q-layout>
</template>

<script setup>
import MainHeader from "src/components/Landing/MainHeader.vue";
import ClubMainFooter from "src/components/Landing/ClubMainFooter.vue";
</script>

<style lang="scss"></style>
