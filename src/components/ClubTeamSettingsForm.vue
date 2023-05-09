<!-- Компонент формы редактирования команды -->
<template>
  <section class="teamSettingForm c-mr-32 с-pb-32">
    <div class="flex teamSettingForm-section">
      <section class="large-avatar relative-position c-mr-32">
        <q-avatar class="large-avatar">
          <q-img src="/src/assets/previews/avatar-140.png" />
        </q-avatar>

        <div
          class="absolute flex flex-center create-form-avatar-create cursor-pointer"
        >
          <q-img
            src="/src/assets/icons/edit.svg"
            class="create-form-icon"
            @click="triggerInput"
          />
        </div>
      </section>

      <section class="flex no-wrap">
        <c-label-control label="Название команды">
          <template #control>
            <c-input :placeholder="Название" />
          </template>
        </c-label-control>
      </section>
    </div>
  </section>
</template>

<script setup>
import CInput from "./ClubInput.vue";
import CLabelControl from "./ClubLabelControl.vue";
</script>

<style lang="scss" scoped>
.teamSettingForm {
  max-width: 640px;
  width: 100%;

  &-section{
    border-bottom:1px solid #F4F4F4; ;
  }
}

.create-form {
  max-width: 544px;
  width: 544px;
  min-height: 544px;

  &-icon {
    fill: rgb(0, 0, 0);
    width: 18px;
  }

  &-avatar {
    &-create {
      bottom: 15px;
      right: -8px;
      width: 40px;
      height: 40px;
      background: $liner-button;
      border-radius: 50%;
      border: 2px solid #ffffff;
    }
  }
}
</style>