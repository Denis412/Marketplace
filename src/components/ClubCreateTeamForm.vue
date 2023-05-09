<template>
  <q-form
    class="create-form c-pa-32 bg-grey-12 rounded-borders-15"
    @submit.prevent="createTeam"
  >
    <header>
      <h3 class="text-h3 text-center">Создание команды</h3>
    </header>

    <main class="flex column flex-center c-mt-32">
      <section class="relative-position">
        <q-avatar class="large-avatar">
          <q-img :src="avatar_URL" />
        </q-avatar>

        <q-img
          src="/src/assets/previews/craete-photo.png"
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
          placeholder="Название"
          class="text-body2"
          v-model="form.name"
          :rules="[required, maxLength(20)]"
        />

        <c-input
          bg-color="white"
          placeholder="Описание"
          class="club-textarea-mh-150 text-body2"
          autogrow
          style="max-height: 100px"
          v-model="form.description"
          :rules="[required, maxLength(1000)]"
        />
      </section>
    </main>

    <footer class="flex justify-center q-mt-xl">
      <c-button background size="lg" label="Создать" type="submit" />

      <c-button
        outline
        class="c-ml-32"
        size="lg"
        label="Отмена"
        to="/club/teams"
      />
    </footer>
  </q-form>
</template>

<script setup>
import { inject, ref } from "vue";
import { useValidators } from "src/use/validators";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

import CInput from "./ClubInput.vue";
import CButton from "./ClubButton.vue";

import teamApi from "src/sdk/team";
import filesApi from "src/sdk/file";
import userApi from "src/sdk/user";

const currentUser = inject("currentUser");

const { required, maxLength } = useValidators();
const $q = useQuasar();
const router = useRouter();

const form = ref({
  name: "",
  description: "",
});

const upload_img = ref(null);
const avatar_URL = ref("/src/assets/previews/avatar-140.png");
const uploadFile = ref(null);
const teamData = ref("");
// const avatar = ref("");

const createTeam = async () => {
  try {
    teamData.value = await teamApi.create(form.value);

    router.push({
      name: "my-teams",
    });

    // avatar.value = await filesApi.uploadFiles(upload_img.value);

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
  uploadFile.value.pickFiles();
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
      width: 30px;
      height: 30px;
    }
  }
}

.q-file {
  display: none;
}
</style>
