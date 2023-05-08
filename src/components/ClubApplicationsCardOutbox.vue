<template>
 
  <q-card
    v-if="application.sender!=='team'"
    class="team rounded-borders-10 c-pa-24 all-pointer-events cursor-pointer justify-between"
    >
    <div class="flex no-wrap card-section q-p-sm">
      <q-avatar class="avatar-108 c-ml-24">
        <q-img
          :src="
          application.team.avatar?.length
              ? `/src/assets/images/${team.avatar}`
              : '/src/assets/images/TeamPlaceholder.png'
            "
          />
      </q-avatar>
        
      <div class="c-ml-24 c-pt-16 c-pl-16">
        <p class="text-h4">
          {{ application.team.name }}
        </p>
        <p class="text-body2 q-mt-md">
          {{ application.team.description }}
        </p>
      </div>
    </div>
  
    <div class="row justify-end">
          <p class="text-body2 q-mt-md" v-if=" application.status == '1672342866228253681'"> 
            В ожидании
          </p>
          <p class="text-body2 q-mt-md text-red" v-else-if=" application.status == '7969392693338571273'"> 
            Отклонена
          </p>
          <p class="text-body2 q-mt-md" v-else> 
            Одобрена
          </p>

          <c-button v-if="application.status == '7969392693338571273'"
          background
          size="lg"
          label="Скрыть"
          class="c-ml-32"
          />

          <c-button v-else
          background
          size="lg"
          label="Отменить"
          class="c-ml-32"
          @click="deleteApplication(application.id)"
          />
    </div>
  </q-card>
</template>

<script setup>
import CButton from "src/components/ClubButton.vue";
import applicationApi from "src/sdk/application";

  const { application, currentUser } = defineProps({
    application: Object,
    currentUser: Object
  });

  // console.log("out", application.team.author_id, currentUser.subject_id)

  const deleteApplication = async (app_id) => {
    await applicationApi.deleteById(app_id)
  }

</script>

<style lang="sass" scoped></style>
