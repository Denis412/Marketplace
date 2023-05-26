<template>
  <q-form class="create-form c-pa-32 bg-grey-12 rounded-borders-15" @submit.prevent="teamCreate">
    <header>
      <h3 class="text-h3 text-center">Создание команды</h3>

      <h3 v-if="creatingTeam" class="text-h3-text-center">Создание...</h3>
    </header>

    <main class="flex column flex-center c-mt-32">
      <section class="relative-position">
        <q-avatar class="large-avatar">
          <q-img :src="avatar_URL" />
        </q-avatar>

        <q-img
          src="/assets/icons/plus/plus-black-add-ellipse.svg"
          class="absolute create-form-avatar-create cursor-pointer"
          @click="triggerInput"
        />
      </section>

      <section>
        <q-file
          class="q-file"
          outlined
          v-model="upload_img"
          accept=".png,.jpg"
          ref="uploadFile"
          @update:model-value="updateFile()"
        />
      </section>

      <section class="w-100p q-mt-md q-gutter-y-md">
        <c-input
          bg-color="white"
          placeholder="Введите название"
          class="text-body2"
          v-model="form.name"
          :rules="[required, maxLength(30)]"
        />

        <c-input
          bg-color="white"
          placeholder="Введите описание"
          class="club-textarea-mh-150 text-body2"
          autogrow
          style="max-height: 100px"
          v-model="form.description"
          :rules="[required, maxLengthForTeamForm(1000)]"
        />
      </section>
    </main>

    <footer class="flex justify-center q-mt-xl rel-index-0">
      <c-button background class="text-body1" label="Создать" type="submit" />
      <c-button
        outline
        class="text-body1 c-ml-32"
        label="Отмена"
        type="reset"
        to="/club/teams/my-teams"
      />
    </footer>
  </q-form>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

import { useValidators } from "src/use/validators";
import { useTeamCreate } from "src/use/teams";

import CInput from "./ClubInput.vue";
import CButton from "./ClubButton.vue";

import TeamService from "src/sevices/TeamService";

import filesApi from "src/sdk/file";

const currentUser = inject("currentUser");

const { required, maxLength, maxLengthForTeamForm } = useValidators();
const $q = useQuasar();
const router = useRouter();
const { createTeamResult, creatingTeam, createTeamError, createTeam } = useTeamCreate();

const form = ref({
  name: "",
  description: "",
});

const upload_img = ref(null);
const avatar_URL = ref("/assets/images/preloaders/default-avatar.svg");
const uploadFile = ref(null);

const teamCreate = async () => {
  try {
    TeamService.createTeam({ ...form.value });
    // await createTeam({ ...form.value, author: currentUser.value });

    router.push({
      name: "my-teams",
    });

    // await filesApi.uploadFiles(upload_img.value);

    // await teamApi.update(teamData.value.id, {
    //   avatar: avatar.value,
    //   name: form.value.name,
    // });
  } catch (error) {
    console.log(error);
  }
};

const updateFile = () => {
  if (Math.round(upload_img.value.size / Math.pow(1024, 2)) <= 10) {
    avatar_URL.value = URL.createObjectURL(upload_img.value);
  } else {
    $q.notify("Максимальный вес картинки 10Mb!");
  }
};

const triggerInput = () => {
  $q.notify({
    type: "negative",
    message: "В разработке!",
  });
  // uploadFile.value.pickFiles();
};
</script>

<style scoped lang="scss">
.create-form {
  max-width: 544px;
  width: 544px;
  min-height: 544px;

  &-avatar {
    &-create {
      bottom: 15px;
      right: -8px;
      width: 40px;
      height: 40px;
    }
  }
}

.q-file {
  display: none;
}
</style>
