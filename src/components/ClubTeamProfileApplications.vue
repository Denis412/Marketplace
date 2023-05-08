<template>
    <p class="text-h4 c-mb-32">Исходящие заявки</p>
    <c-applications-list  :team="team" :applications="userApplications" :type="true"/>
    
    <p class="text-h4 c-mb-32">Входящие заявки</p>
    <c-applications-list  :team="team" :applications="teamApplications" :type="false" :currentUser="currentUser"/>
</template>

<script setup>
    import { computed, ref } from "vue"
    import CApplicationsList from "./ClubApplicationsList.vue";
    import applicationApi from "src/sdk/application"
    import userApi from "src/sdk/user"

    const { team, currentUser } = defineProps({
        team: Object,
        currentUser: Object,
    });

    const teamApplications = ref()
    const userData = ref()
    const userApplications = ref()

    teamApplications.value = team.applications

    const getUserData = async () =>{
        userData.value = await userApi.subjectGetById(currentUser.subject_id)
        userApplications.value = userData.value.applications
    }
   
   getUserData()
</script>