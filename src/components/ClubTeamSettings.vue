<template>
  <section>
    <header class="c-mb-32">
      <h3 class="text-h3">Редактирование</h3>
    </header>

    <main class="flex justify-between no-wrap">
      <c-team-settings-form v-if="editableItem === 'profile'" />
      <c-team-space-settings-form v-else />

      <q-tabs
        v-model="editableItem"
        vertical
        no-caps
        dense
        active-color="black"
        indicator-color="transparent"
        active-bg-color="white"
        class="editableItems c-tabs c-pa-16 c-ml-32"
      >
        <q-tab class="editableItem" name="profile" label="Профиль команды" />
        <q-tab class="editableItem" name="space" label="Командное пространство" />
      </q-tabs>
    </main>
  </section>
</template>

<script setup>
import { ref } from "vue";
import CTeamSettingsForm from "./ClubTeamSettingsForm.vue";
import CTeamSpaceSettingsForm from "./ClubTeamSpaceSettingsForm.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const editableItem = ref(route.path.includes("team-space") ? "space" : "profile");
</script>

<style lang="scss" scoped>
.editableItems {
  max-width: 450px;
  width: 100%;
  border-radius: 8px;
  color: #686868;
  background-color: $violet-1;
}

.editableItem {
  border-radius: 8px;
  justify-content: flex-start;
  font-weight: 400;
}
</style>
