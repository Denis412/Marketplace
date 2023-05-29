<template>
  <q-header class="header bg-dark-purple px-160 z-max" elevated>
    <q-toolbar>
      <q-img class="logo-header" src="/assets/images/Logo-white.svg" alt="logo" />

      <span class="text-h5 c-pl-16">КЛУБ</span>

      <q-tabs class="main-tabs">
        <q-route-tab
          no-caps
          name="business"
          label="Для бизнеса"
          class="rounded-borders"
          to="business"
        />

        <q-route-tab no-caps name="work" label="Для работы" class="rounded-borders" to="work" />

        <q-route-tab
          no-caps
          name="development"
          label="Для развития"
          class="rounded-borders"
          to="selfdevelopment"
        />
      </q-tabs>

      <q-space />

      <div>
        <c-button
          to="/registration"
          class="text-button1 q-px-lg"
          background-square
          label="Вступить в 1T клуб"
        />
        <c-button
          to="/authentication"
          outline-no-text-square
          label="Войти"
          class="text-button1 bg-dark-purple q-ml-md q-px-lg"
        />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import CButton from "src/components/ClubButton.vue";
</script>

<style scoped>
.main-tabs {
  margin-left: 5rem;
}
</style>
