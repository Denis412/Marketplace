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
  </q-layout>
</template>

<script setup>
import MainHeader from "src/components/MainHeader.vue";
</script>

<style lang="scss"></style>
