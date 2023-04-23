<template>
  <section class="section-wrapper">
    <q-img src="/src/assets/images/support-service.png" style="width: 352px" />

    <div class="flex items-center club-ml-32">
      <div>
        <div class="text-h3 text-primary-gradient">У вас нет команды?</div>

        <div class="text-subtitle3 q-mt-md">
          Создай сам или найди, чтобы приступить к работе!
        </div>

        <div class="flex buttons-wrapper q-mt-xl">
          <c-button background size="lg" label="Создать команду" />
          <c-button
            outline
            size="lg"
            label="Найти команду"
            class="page-background"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import CButton from "src/components/ClubButton.vue";
</script>

<style scoped lang="scss">
.section-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
}

.buttons-wrapper {
  justify-content: space-between;
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
