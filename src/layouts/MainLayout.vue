<template>
  <q-layout view="hHh LpR lFf">
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
import MainHeader from "src/components/MainHeader.vue";
import ClubMainFooter from "src/components/ClubMainFooter.vue";
</script>

<style lang="scss"></style>
