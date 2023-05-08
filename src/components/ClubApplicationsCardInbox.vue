<template>
    <q-card :class="
                application.sender=='team'
                  ? 'bg-white'
                  : 'bg-grey-12'
              "
    class="team rounded-borders-10 c-pa-24 all-pointer-events cursor-pointer justify-between"
    v-if="team.author_id==currentUser.subject_id && application.status==='1672342866228253681'"
    >
    
    <div class="flex no-wrap card-section q-p-sm">
      <q-avatar class="avatar-108 c-ml-24">
        <q-img
          :src="
          team.avatar?.length
              ? `/src/assets/images/${team.avatar}`
              : '/src/assets/images/TeamPlaceholder.png'
            "
          />
      </q-avatar>
        
      <div class="c-ml-24" v-if="application.sender=='team'">
        <p class="text-h4">
          {{ team.name }}
        </p>
        <p class="text-body2 q-mt-md">
          {{ team.description }}
        </p>
      </div>

      <div class="c-ml-24" v-else>
        <p class="text-body2 c-pt-16 c-pl-16 text-violet-6">
          {{ application.subject.fullname.first_name }} {{ application.subject.fullname.last_name }}
        </p>
        <!-- <p class="text-body2 c-pt-16 c-pl-16 text-violet-6">
          {{ application.subject.group.name }}
        </p> -->
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

  const { application, team, currentUser } = defineProps({
    application: Object,
    team: Object, 
    currentUser: Object,
  });

  console.log(application)

  const rejectOrAcceptApplication = async (app_id, app_name, app_new_status) =>{
      await teamApi.updateApplication(app_id, app_name, app_new_status)
  }

</script>

<style lang="scss" scoped>

 
</style>
