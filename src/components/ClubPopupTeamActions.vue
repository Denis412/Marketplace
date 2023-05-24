<template>
  <q-icon class="cursor-pointer relative-position" name="more_horiz" size="40px">
    <q-menu class="w-max-content">
      <q-list separator>
        <q-item
          v-if="isOwner"
          clickable
          class="flex no-wrap items-center text-caption1 text-black"
          @click="editProfile"
        >
          Редактировать
        </q-item>

        <q-item
          v-else
          clickable
          v-ripple
          class="flex no-wrap items-center text-caption1 text-black"
        >
          Покинуть команду
        </q-item>

        <q-item clickable v-ripple class="flex no-wrap items-center text-caption1 text-black">
          Поделиться
        </q-item>
      </q-list>
    </q-menu>
  </q-icon>
</template>

<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const currentTeam = inject("currentTeam");
const isOwner = inject("isOwner");

const editProfile = async () => {
  router.push({
    name: "teamEdit",
    params: { id: currentTeam.value.id },
    query: { space: currentTeam.value.space },
  });
};
</script>

<style scoped lang="scss"></style>
