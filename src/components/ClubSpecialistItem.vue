<template>
  <q-item class="flex items-center col-5 rounded-borders-10">
    <q-avatar class="medium-avatar cursor-pointer">
      <q-img
        v-if="currentUser"
        :src="user.avatar || '/assets/images/preloaders/default-avatar.svg'"
      />

      <q-img
        v-else
        :src="
          specialist.avatar || '/assets/images/preloaders/default-avatar.svg'
        "
      />
    </q-avatar>

    <div v-if="currentUser" class="q-ml-md">
      <div class="text-body2 text-violet-6">
        {{ user.first_name }} {{ user.last_name }}
      </div>

      <div class="text-caption1 q-mt-sm text-violet-6">
        {{ user.major }}
      </div>
    </div>

    <div v-else class="q-ml-md">
      <div class="text-body2 text-violet-6">
        {{ specialist.fullname.first_name }} {{ specialist.fullname.last_name }}
      </div>

      <div class="text-caption1 q-mt-sm text-violet-6">
        {{ specialist.major }}
      </div>
    </div>
  </q-item>
</template>

<script setup>
import { inject } from "vue";

const { specialist, currentUser } = defineProps({
  specialist: Object,
  currentUser: Boolean,
});

const user = inject("currentUser");
</script>

<style scoped lang="scss"></style>
