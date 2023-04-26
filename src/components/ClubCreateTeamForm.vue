<template>
  <q-form class="create-form c-pa-32 bg-white rounded-borders-15" @submit.prevent="createSpace">
    <header>
      <h3 class="text-h3 text-center">Создание команды</h3>
    </header>

    <main class="flex column flex-center club-mt-32">
      <section class="relative-position">
        <q-avatar class="large-avatar">
          <q-img :src="team_img_URL" />
        </q-avatar>

        <q-img
          src="/src/assets/previews/craete-photo.png"
          class="absolute create-form-avatar-create cursor-pointer"
          @click="testClick"
        />       
      </section>
      
      <section>
          <q-file outlined v-model="team_img"
          @update:model-value="updateFile()"/>
      </section>

      <section class="w-100p q-mt-md q-gutter-y-md">
        <c-input 
          placeholder="Название"
          class="text-body2"
          v-model="form.name"
          :rules="[required, maxLength(100)]" />

        <c-input
          placeholder="Описание"
          class="club-textarea-mh-150 text-body2"
          autogrow
          style="max-height: 100px"
          v-model="form.description"
          :rules="[required, maxLength(100)]"
        />
      </section>
    </main>

    <footer class="flex justify-center q-mt-xl">
      <c-button background size="lg" label="Создать" type="submit"/>
      <c-button outline class="club-ml-32" size="lg" label="Отмена" />
    </footer>
  </q-form>
</template>

<script setup>
import { ref } from "vue";

import CInput from "./ClubInput.vue";
import CButton from "./ClubButton.vue";
import userSpace from "src/sdk/team";
import { useValidators } from "src/use/validators";

const { required, maxLength} = useValidators();

const form = ref({
  name:"",
  description:""
})

const team_img = ref(null)
const team_img_URL = ref("/src/assets/previews/preview-create-team.png");

const createSpace = async () => {
  try {
    await  userSpace.userSpaceCreate(form.value);
  } 
  catch (error) {
    console.log(error);
  }
};

const updateFile = () => {
        team_img_URL.value = URL.createObjectURL(team_img.value);
      }

// const testClick = () =>{
     
//     }

</script>

<style scoped lang="scss">
.create-form {
  max-width: 544px;
  width: 544px;
  min-height: 544px;

  &-avatar {
    &-create {
      bottom: 15px;
      right: -13px;
      width: 30px;
      height: 30px;
    }
  }
}
</style>
