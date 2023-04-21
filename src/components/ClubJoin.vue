<template>
  <section class="flex flex-center ">
        <div class="join text-center flex items-between justify-center">
          <div class="join-text">
            Сделате шаг навстречу будущему и будьте с нами!
          </div>

          <q-btn no-caps class="bg-gradient join-btn" label="Присоединиться к Клубу" />
        </div>
      </section>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.join {
  width: 772px;
  min-height: 192px;

  padding: 32px;

  background: rgba(135, 32, 148, 0.197);
  box-shadow: inset 8px -8px 32px rgba(103, 24, 112, 0.2),
    inset -12px 12px 32px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(53.01px);

  border-radius: 12px;
  margin-top: 124px;
}

.join-btn {
  margin-top: 32px;
  font-size: 18px;
}

.join-text {
  font-size: 28px;
  font-weight: 400;
}
</style>
