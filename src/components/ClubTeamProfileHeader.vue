<template>
  <q-card flat class="header-wrapper w-100p text-violet-6">
    <q-toolbar class="absolute flex justify-end">
      <q-icon
        class="cursor-pointer relative-position"
        name="more_horiz"
        size="40px"
      >
        <q-menu class="w-max-content">
          <q-list separator>
            <q-item
              v-if="isOwner"
              clickable
              class="flex no-wrap items-center text-caption1 text-black"
              >Редактировать
            </q-item>

            <q-item
              v-else
              clickable
              v-ripple
              class="flex no-wrap items-center text-caption1 text-black"
              >Покинуть команду
            </q-item>

            <q-item
              clickable
              v-ripple
              class="flex no-wrap items-center text-caption1 text-black"
              >Поделиться
            </q-item>
          </q-list>
        </q-menu>
      </q-icon>
    </q-toolbar>

    <q-card-section class="flex no-wrap c-mx-64 c-mt-64 c-mb-40">
      <q-avatar class="large-avatar">
        <q-img src="/src/assets/previews/avatar-140.png" />
      </q-avatar>

      <section class="c-ml-32">
        <h4 class="text-h4">{{ team.name }}</h4>

        <section>
          <p class="text-body2 q-mt-sm">
            <span v-if="fullDes"
              >{{ team.description.substr(0, 121) }} ...</span
            >
            <span v-else>{{ team.description }}</span>
          </p>

          <p
            class="text-grey-8 text-body2 btn-text-align cursor-pointer"
            @click="fullDes = !fullDes"
          >
            {{ !fullDes ? "Cкрыть" : "Показать" }}
          </p>
        </section>

        <q-list
          v-if="team?.directions"
          class="c-mt-32 q-gutter-sm text-caption1"
        >
          <c-button
            outline
            v-for="direction in team?.directions"
            :key="direction.title"
            :label="direction.title"
          />
        </q-list>

        <div class="flex items-center c-mt-32 header-controls">
          <c-button
            v-if="!isMember"
            background
            label="Вступить в команду"
            class="text-body2"
            @click="sendApplication"
          />

          <q-checkbox
            dense
            v-if="isOwner"
            v-model="isReady"
            @update:model-value="updateTeamStatus"
            left-label
            label="Готовность к заказам"
            class="c-mr-32 c-checkbox-violet-6 text-body2 c-checkbox-label-pr-md c-checkbox-rounded"
          />

          <a
            v-if="isMember || isOwner"
            href="#"
            class="text-violet-6 link text-body2"
          >
            Чат команды
            <q-icon
              class="text-subtitle2"
              name="img:/src/assets/icons/telegram/telegram-gradient.svg"
            />
          </a>
        </div>
      </section>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { inject, ref } from "vue";
import CButton from "src/components/ClubButton.vue";
import teamApi from "src/sdk/team";


const { team, currentUser } = defineProps({
  team: Object,
  currentUser: Object,
});

const isReady = ref(team.ready_for_orders ?? false);
const isOwner = inject("isOwner");
const isMember = inject("isMember");
const fullDes = ref(true);
const applicationName = ref("от"+currentUser.first_name+'В'+team.name)

const updateTeamStatus = async () => {
  try {
    await teamApi.update(team.id, {
      ready_for_orders: isReady.value,
    });

    await teamApi.refetchTeamByName(team.name);
  } catch (error) {
    console.log(error);
  }
};

const sendApplication = async () => {
  try {
    await teamApi.sendApplication(applicationName.value, currentUser.subject_id, team.id)
  } catch (error) {
    console.log(error);
  }
};

</script>

<style scoped lang="scss">
.header-wrapper {
  .q-card__section {
    padding: 0;
  }
}

.popup {
  top: 10px !important;
  right: 10px !important;

  &-item {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
}

.header-controls {
  p {
    margin: 0;
  }
}

.btn-text-align {
  padding-left: 0;
}
</style>
