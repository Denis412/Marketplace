<template>
  <section class="w-100p bg-white rounded-borders-10 c-px-64 c-pt-24 c-pb-24">
    <q-toolbar class="flex justify-end">
      <q-icon class="cursor-pointer" name="more_horiz" size="40px" />
    </q-toolbar>

    <div class="flex no-wrap">
      <q-avatar class="large-avatar">
        <q-img src="/src/assets/images/Ellipse55.svg" />
      </q-avatar>

      <div class="club-ml-32">
        <h4 class="text-h4">{{ title }}</h4>
        <div class="text-body2 q-mt-sm">{{ description }}</div>

        <q-list class="club-mt-32 q-gutter-sm">
          <c-button
            background
            v-for="direction in directions"
            :key="direction.title"
            :label="direction.title"
          />
        </q-list>
      </div>
    </div>
  </section>
</template>

<script setup>
import CButton from "src/components/ClubButton.vue";

const { title, description, directions } = defineProps({
  title: String,
  description: String,
  directions: Array,
});
</script>

<style scoped lang="scss"></style>
