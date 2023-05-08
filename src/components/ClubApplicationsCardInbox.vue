<template>
    <q-card
       v-if="application.sender==='team'"
    class="team rounded-borders-10 c-pa-24 all-pointer-events cursor-pointer justify-between">
    
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
      <c-button
            outline
            size="lg"
            label="Отклонить"
            class="page-background c-mr-32"
            @click="rejectOrAcceptApplication(application.id, application.name, '7969392693338571273')"
      />

      <c-button
            background
            size="lg"
            label="Принять"
            @click="rejectOrAcceptApplication(application.id, application.name, '6989336487856023800')"
            
      />
    </div>
  </q-card>
</template>

<script setup>
import CButton from "src/components/ClubButton.vue";
import teamApi from "src/sdk/team";

  const { application, currentUser } = defineProps({
    application: Object,
    currentUser: Object,
  });

console.log(application.team.author_id, "--------", currentUser.subject_id) 

  const rejectOrAcceptApplication = async (app_id, app_name, app_new_status) =>{
      await teamApi.updateApplication(app_id, app_name, app_new_status)
  }

</script>

<style lang="scss" scoped>

 
</style>
