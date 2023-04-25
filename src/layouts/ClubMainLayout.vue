<template>
  <q-layout view="hHh LpR lff">
    <c-main-header />
    <c-main-drawer side="left" />

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>

    <!-- <c-main-footer /> -->
  </q-layout>
</template>

<script setup>
import CMainHeader from "src/components/ClubMainHeader.vue";
import CMainDrawer from "src/components/ClubMainDrawer.vue";
// import CMainFooter from "src/components/Landing/ClubMainFooter.vue";
</script>

<style lang="scss"></style>
