<template>
  <div class="club-mb-32">
    <h4 class="text-h4 club-mb-16">{{ title }}</h4>
      <c-team-profile-applications :applications="userApplications" :currentUser="currentUser"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CTeamCard from "src/components/ClubTeamCard.vue";
import CTeamProfileApplications from "./ClubTeamProfileApplications.vue"
import applicationApi from "src/sdk/application"
import userApi from "src/sdk/user";

const { title, currentUser } = defineProps({
        title: String,
        currentUser: Object
    });

    const userData = ref()
    const userApplications = ref([])

console.log("user_id", currentUser.subject_id)

    const getUserData = async () =>{
        userData.value = await userApi.subjectGetById(currentUser.subject_id)
        userApplications.value = userData.value.applications
        console.log("1) all appl:  ", userApplications.value)
    }
   
   getUserData()
</script>

<style lang="scss" scoped>
.c-team {
  &-emptyImg {
    width: 205px;
  }
  &-requests {
    width: 100%;
    border: 1px dashed #5c309f;
    border-radius: 5px;
  }
  &-ml-78 {
    margin-left: 78px;
  }
}
</style>
