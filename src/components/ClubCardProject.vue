<template>
  <q-card flat class="project-card">
    <main class="q-gutter-y-md">
      <q-card-section class="column wrap">
        <section class="q-gutter-y-sm">
          <div>
            <span class="text-subtitle4 text-violet8">
              {{ currentProject.name }}
            </span>
          </div>

          <div>
            <span class="text-caption1 text-gray7">
              Команда: {{ currentProject.team_name }}
            </span>
          </div>
        </section>
      </q-card-section>

      <q-card-section>
        <q-img class="bg-violet4 cursor-pointer" @click="redirectProjectPage" />
      </q-card-section>

      <q-card-section>
        <div class="column text-caption1 text-gray7 q-gutter-y-lg">
          <span>{{ currentProject.description }}</span>
          <span>до {{ currentProject.delivery_date?.date }}</span>
          <span>Роль в проекте: Участник</span>
        </div>
      </q-card-section>
    </main>
  </q-card>
</template>

<script setup>
import { useRouter } from "vue-router";

const { currentProject } = defineProps({
  currentProject: Object,
});

const router = useRouter();

const redirectProjectPage = () => {
  router.push({
    name: "project",
    params: { id: currentProject.id },
    query: { name: currentProject.name, space: currentProject.space },
  });
};
</script>

<style scoped lang="scss">
.project-card {
  padding: 12px 16px;
  box-shadow: 0px 29px 12px rgba(0, 0, 0, 0.01),
    0px 16px 10px rgba(0, 0, 0, 0.05), 0px 7px 7px rgba(0, 0, 0, 0.09),
    0px 2px 4px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1) !important;
  border-radius: 12px;

  .q-card__section {
    padding: 0;

    .q-img {
      border-radius: 12px;
    }
  }
}
</style>
