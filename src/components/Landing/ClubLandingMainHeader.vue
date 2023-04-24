<template>
  <q-header class="header bg-dark-purple px-160 z-max" elevated>
    <q-toolbar>
      <q-img
        class="logo-header"
        src="src/assets/images/LogologoSprint.svg"
        alt="logo"
      />

      <q-tabs class="main-tabs">
        <q-tab
          no-caps
          name="buisness"
          label="Для бизнеса"
          class="rounded-borders"
        />

        <q-tab no-caps name="work" label="Для работы" class="rounded-borders" />

        <q-tab
          no-caps
          name="development"
          label="Для развития"
          class="rounded-borders"
        />
      </q-tabs>

      <q-space />

      <div>
        <c-button to="/registration" background label="Вступить в клуб" />
        <c-button
          to="/authentication"
          outline-no-text
          label="Войти"
          class="bg-dark-purple q-ml-md"
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
  margin-left: 4rem;
}
</style>
