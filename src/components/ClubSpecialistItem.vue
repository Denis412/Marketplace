<template>
  <q-item class="flex items-center justify-between col-5 rounded-borders-10">
    <div class="flex items-center">
      <q-avatar class="medium-avatar cursor-pointer" @click="redirect">
        <q-img
          v-if="currentUser"
          :src="user.avatar || '/assets/images/preloaders/default-avatar.svg'"
        />

        <q-img v-else :src="specialist?.avatar || '/assets/images/preloaders/default-avatar.svg'" />
      </q-avatar>

      <div v-if="currentUser" class="q-ml-md">
        <div class="text-body2 text-violet-6">{{ user.first_name }} {{ user.last_name }}</div>

        <div class="text-caption1 q-mt-sm text-violet-6">
          {{ user.speciality1?.name || user.speciality1 }}
        </div>
      </div>

      <div v-else class="q-ml-md">
        <div class="text-body2 text-violet-6">
          {{ specialist?.fullname.first_name }} {{ specialist?.fullname.last_name }}
        </div>

        <div class="text-caption1 q-mt-sm text-violet-6" v-if="!roles">
          {{ specialist?.speciality1?.name || specialist?.speciality1 }}
        </div>

        <div class="text-caption1 q-mt-sm text-violet-6" v-else>
          {{ specialist?.role }}
        </div>
      </div>
    </div>

    <div v-if="deleting" class="delete-wrapper">
      <q-icon
        name="img:/assets/icons/delete/delete-violet-4.svg"
        size="24px"
        class="cursor-pointer"
        @click="showDialog"
      />
    </div>

    <q-dialog v-model="isDelete">
      <q-card style="border-radius: 8px">
        <q-card-section class="q-gutter-y-sm">
          <div>
            <span class="text-body1">Вы точно хотите удалить данного участника?</span>
          </div>

          <div>
            <span class="text-body2">Отменить это действие будет невозможно</span>
          </div>
        </q-card-section>

        <q-card-section class="flex justify-end rel-index-0 q-gutter-x-md">
          <q-btn
            flat
            no-caps
            v-close-popup
            class="club-button-background text-body1"
            @click="confirmDeleteSpecialist"
            label="Удалить участника"
          />

          <q-btn
            flat
            no-caps
            v-close-popup
            class="club-button-outline text-body1"
            label="Отменить"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-item>
</template>

<script setup>
import router from "src/router";
import { computed, inject, ref, watch, watchEffect } from "vue";
import { useUserStore } from "stores/user";
import TeamService from "src/sevices/TeamService";

const emit = defineEmits(["deleteItem"]);

const { specialist, currentUser, roles, deleting } = defineProps({
  specialist: Object,
  currentUser: Boolean,
  roles: Boolean,
  deleting: Boolean,
});

const user = inject("currentUser");
const currentProject = inject("currentProject");
const currentTeam = inject("currentTeam");

const userStore = useUserStore();

const isDelete = ref(false);

const redirect = () => {
  router.push({
    name: "profile",
    params: { id: specialist.id },
  });
};

const showDialog = () => {
  isDelete.value = true;
};

const confirmDeleteSpecialist = () => {
  userStore.PUSH_DELETING_SPECIALIST(specialist);

  if (currentProject?.value) {
    TeamService.deleteSpecialistFromProject(
      {
        project: currentProject.value,
        subject: specialist,
      },
      {
        space_id: currentProject.value.space,
        is_customer: currentProject.value.customers.find(
          (customer) => customer.email.email === specialist.email.email
        ),
      }
    );
  } else if (currentTeam?.value) {
    TeamService.deleteSpecialistFromTeam(
      {
        team: currentTeam.value,
        subject: specialist,
      },
      { space_id: currentTeam.value.space }
    );
  }
};
</script>

<style scoped lang="scss">
.delete-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  border-radius: 5px;

  cursor: pointer;

  transition: 0.3s;

  &:hover {
    background: white;
  }
}
</style>
