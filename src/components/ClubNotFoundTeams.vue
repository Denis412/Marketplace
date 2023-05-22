<template>
  <section class="section-wrapper">
    <q-img
      src="/assets/images/my-teams-page/not-found.svg"
      style="width: 255px"
      class="c-my-64 c-mr-128"
    />

    <div class="flex items-center c-ml-32">
      <div>
        <div class="text-h3 text-dark">У вас нет команды?</div>

        <div class="text-subtitle3 q-mt-md c-mb-24">
          Создай сам или найди, чтобы приступить к работе!
        </div>

        <c-add-buttons />
      </div>
    </div>
  </section>
</template>

<script setup>
import CAddButtons from "src/components/ClubTeamAddButtons.vue";
</script>

<style scoped lang="scss">
.section-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
}

.c-mr-128 {
  margin-right: 128px;
}

@media screen and (max-width: 670px) {
  .section-wrapper {
    flex-direction: column !important;
  }
}

@media screen and (max-width: 410px) {
  .section-wrapper {
    flex-direction: column !important;
  }

  .buttons-wrapper {
    justify-content: center;
  }
}
</style>
