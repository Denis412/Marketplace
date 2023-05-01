<template>
  <section class="w-100p c-px-64 c-pt-24 c-pb-24 text-violet-6">
    <q-toolbar class="flex justify-end">
      <q-icon class="cursor-pointer" name="more_horiz" size="40px" />
    </q-toolbar>

    <div class="flex no-wrap">
      <q-avatar class="large-avatar">
        <q-img src="/src/assets/previews/avatar-140.png" />
      </q-avatar>

      <div class="club-ml-32">
        <h4 class="text-h4">{{ title }}</h4>

        <div v-if="fullDes">
          <div class="text-body2 q-mt-sm">{{ description.substr(0, 121) }} ...</div>
          <c-button label="Подробнее" class="text-grey-8 text-body1 btn-text-align" @click="fullDes=!fullDes" />  
        </div>
        
        <div v-else>
          <div class="text-body2 q-mt-sm">{{ description}}</div>
          <c-button label="Cкрыть" class="text-grey-8 text-body1 btn-text-align" @click="fullDes=!fullDes" />
        </div>

        <q-list class="club-mt-32 q-gutter-sm text-caption1">
          <c-button
            outline
            v-for="direction in directions"
            :key="direction.title"
            :label="direction.title"
          />
        </q-list>

      <c-button
          background
          label="Вступить в команду"
          class="text-body1 club-my-32"
        />

      </div>
    </div>
  </section>
</template>

<script setup>
import CButton from "src/components/ClubButton.vue";
import { ref } from "vue"

const { title, description, directions } = defineProps({
  title: String,
  description: String,
  directions: Array,
});
const fullDes = ref(true)

</script>

<style scoped lang="scss">
.btn-text-align{
  padding-left: 0;
}
</style>
