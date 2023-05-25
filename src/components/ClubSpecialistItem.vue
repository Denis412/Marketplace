<template>
  <q-item class="flex items-center col-5 rounded-borders-10">
    <q-avatar class="medium-avatar cursor-pointer">
      <q-img
        v-if="currentUser"
        :src="user.avatar || '/assets/images/preloaders/default-avatar.svg'"
      />

      <q-img v-else :src="specialist.avatar || '/assets/images/preloaders/default-avatar.svg'" />
    </q-avatar>

    <div v-if="currentUser" class="q-ml-md">
      <div class="text-body2 text-violet-6">{{ user.first_name }} {{ user.last_name }}</div>

      <div class="text-caption1 q-mt-sm text-violet-6">
        {{ user.speciality1?.name || user.speciality1 }}
      </div>
    </div>

    <div v-else class="q-ml-md">
      <div class="text-body2 text-violet-6">
        {{ specialist.fullname.first_name }} {{ specialist.fullname.last_name }}
      </div>

      <div class="text-caption1 q-mt-sm text-violet-6" v-if="!roles">
        {{ specialist.speciality1?.name || specialist.speciality1 }}
      </div>

      <div class="text-caption1 q-mt-sm text-violet-6" v-else>
        {{ specialist.role }}
      </div>
    </div>
  </q-item>
</template>

<script setup>
import { computed, inject } from "vue";

const { specialist, currentUser, roles } = defineProps({
  specialist: Object,
  currentUser: Boolean,
  roles: Boolean,
});

const user = inject("currentUser");

const specialistRoles = computed(() => specialist.group.map((group) => group.name).join(", "));
</script>

<style scoped lang="scss"></style>
