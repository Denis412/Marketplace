<template>
  <div class="team c-pa-32 c-mt-20">
    <div class="content relative-position row justify-between">
      <q-img
        class="image c-mt-16"
        :src="
          team.img.length
            ? `/src/assets/images/${team.img}`
            : '/src/assets/images/TeamPlaceholder.png'
        "
      />

      <div class="text-area col-8">
        <h4 class="text-h4">
          {{ team.title }}
        </h4>

        <div class="text-body2 c-mt-16">
          {{ team.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CButton from "src/components/ClubButton.vue";

const { team } = defineProps({
  team: Object,
});
</script>

<style lang="scss" scoped>
.team {
  height: 278px;
  box-shadow: 0px 38px 15px rgba(0, 0, 0, 0.01),
    0px 21px 13px rgba(0, 0, 0, 0.03), 0px 10px 10px rgba(0, 0, 0, 0.04),
    0px 2px 5px rgba(0, 0, 0, 0.05), 0px 0px 0px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  max-width: 544px;
  box-sizing: border-box;
}

.content {
  height: 100%;
}

.image {
  width: 108px;
  height: 108px;
}

.team-btn {
  width: 115px;
  height: 40px;
}
</style>
