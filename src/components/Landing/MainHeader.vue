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
        <q-btn no-caps class="bg-gradient" label="Вступить в клуб" />
        <q-btn no-caps class="gradient-box q-ml-md" label="Войти" />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup></script>

<style scoped>
.main-tabs {
  margin-left: 4rem;
}
</style>
