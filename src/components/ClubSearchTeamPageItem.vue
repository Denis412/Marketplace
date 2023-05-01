<template>
<q-card class="col-5 club-mb-32 c-py-24">
    <q-item class="flex items-center rounded-borders-10">
        <q-avatar class="medium-avatar">
        <q-img src="/src/assets/previews/avatar-140.png" />
        </q-avatar>

        <div class="q-ml-md">
        <div class="text-h4">
            {{ team.name}}
        </div>

        <div class="text-caption1 q-mt-sm text-body2">
            {{ team.description}}
        </div>
        </div>
    </q-item>
  </q-card>
</template>

<script setup>
const { team } = defineProps({
  team: Object,
});
</script>

<style scoped lang="scss"></style>
