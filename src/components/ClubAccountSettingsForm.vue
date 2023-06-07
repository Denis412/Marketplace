<template>
  <q-form @submit="$emit('submit-form', form)" class="c-gutter-y-32">
    <q-form ref="formRef" class="flex no-wrap" @submit="formSubmit">
      <c-label-control label="Фамилия">
        <template #control>
          <q-input
            flat
            outlined
            class="c-input-outline"
            v-model="form.last_name"
            type="text"
            maxlength="50"
            :placeholder="currentUser?.last_name"
            @update:model-value="capitailze('last_name')"
            @change="changeUSerData('last_name', $event)"
            :rules="[onlyRussian, noSpace, maxLength(50)]"
            lazy-rules
          />
        </template>
      </c-label-control>

      <c-label-control label="Имя" class="c-ml-32">
        <template #control>
          <q-input
            flat
            outlined
            class="c-input-outline"
            v-model="form.first_name"
            type="text"
            maxlength="50"
            :placeholder="currentUser?.first_name"
            @update:model-value="capitailze('first_name')"
            @change="changeUSerData('first_name', $event)"
            :rules="[onlyRussian, noSpace, maxLength(50)]"
            lazy-rules
          />
        </template>
      </c-label-control>

      <c-label-control label="Отчество" class="c-ml-32">
        <template #control>
          <q-input
            flat
            outlined
            class="c-input-outline"
            v-model="form.middle_name"
            type="text"
            maxlength="50"
            :placeholder="currentUser?.middle_name"
            @update:model-value="capitailze('middle_name')"
            @change="changeUSerData('middle_name', $event)"
            :rules="[onlyRussian, noSpace, maxLength(50)]"
            lazy-rules
          />
        </template>
      </c-label-control>
    </q-form>

    <section class="flex no-wrap">
      <c-label-control label="Пол">
        <template #control>
          <q-select
            no-caps
            borderless
            class="club-dropdown"
            v-model="form.gender"
            @update:model-value="changeUSerData('gender', $event)"
            :options="['Не выбран', 'Мужской', 'Женский']"
            dropdown-icon="img:/assets/icons/arrow/arrow-down-grey.svg"
          />
        </template>
      </c-label-control>

      <c-label-control label="Дата рождения" class="c-ml-32">
        <template #control>
          <q-input
            v-model="form.birthday"
            mask="##.##.####"
            @change="changeUSerData('birthday', $event)"
            :placeholder="currentUser?.birthday || 'ДД.ММ.ГГГГ'"
            class="date-input c-input-outline"
            outlined
          >
            <template #append>
              <q-icon name="img:/assets/icons/calendar/calendar-grey.svg" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="form.birthday"
                    @update:model-value="changeUSerData('birthday', $event)"
                    mask="DD.MM.YYYY"
                    default-year-month="2000/01"
                    navigation-min-year-month="1901/01"
                    navigation-max-year-month="2009/01"
                    :options="optionsDateSelect"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </template>
      </c-label-control>
    </section>

    <section class="flex no-wrap">
      <c-label-control label="Город">
        <template #control>
          <q-select
            no-caps
            borderless
            class="club-dropdown"
            use-input
            v-model="form.city"
            @update:model-value="changeUSerData('city', $event)"
            @filter="filterFn"
            :options="filteredCities"
            dropdown-icon="img:/assets/icons/arrow/arrow-down-grey.svg"
          />
        </template>
      </c-label-control>

      <!-- Тут должен быть регион и населенный пункт -->
    </section>

    <c-label-control label="Адрес электронной почты">
      <template #control>
        <q-input
          v-model="form.email"
          :placeholder="currentUser?.email"
          class="c-input-outline no-pointer-events"
          outlined
          readonly
        />
      </template>
    </c-label-control>
  </q-form>
</template>

<script setup>
import { ref, inject } from "vue";

import { useUserStore } from "src/stores/user";

import CLabelControl from "./ClubLabelControl.vue";
import userApi from "src/sdk/user";
import { useQuasar } from "quasar";
import UserService from "src/sevices/UserService";
import capitalizeWord from "src/utils/capitalizeWord";
import { useValidators } from "src/use/validators";

const emit = defineEmits(["form-submit"]);

const { required, email, minLength, noSpace, maxLength, equal, onlyRussian } = useValidators();
const $q = useQuasar();

const userStore = useUserStore();

const currentUser = inject("currentUser");

const form = ref({
  last_name: currentUser.value?.last_name,
  first_name: currentUser.value?.first_name,
  middle_name: currentUser.value?.middle_name,
  birthday: currentUser.value?.birthday,
  gender: currentUser.value?.gender,
  city: currentUser.value?.city,
  email: currentUser.value?.email,
});

const updatedData = ref({
  input: null,
  prop: null,
  value: null,
});

const cities = ["Москва", "Санкт-Петербург", "Воронеж"];
const filteredCities = ref(cities);
const formRef = ref(null);

const optionsDateSelect = (date) => new Date(date).getTime() < Date.now();

const filterFn = (val, update) => {
  update(() => {
    filteredCities.value = cities.filter((v) => v.toLowerCase().includes(val.toLowerCase()));
  });
};

const capitailze = (prop) => {
  if (form.value[prop].charCodeAt(0) >= 97) form.value[prop] = capitalizeWord(form.value[prop]);
};

const formSubmit = async () => {
  await UserService.subjectUpdate({ subject: currentUser.value, input: updatedData.value.input });

  userStore.SET_PROP(updatedData.value.prop, updatedData.value.value);
};

const changeUSerData = async (prop, value) => {
  let input;

  try {
    if (prop === "birthday")
      input = {
        [prop]: {
          date: value,
        },
      };
    else if (prop === "first_name" || prop === "middle_name" || prop === "last_name")
      input = {
        fullname: {
          first_name: form.value.first_name,
          middle_name: form.value.middle_name,
          last_name: form.value.last_name,
        },
      };
    else
      input = {
        [prop]: value,
      };

    updatedData.value.input = input;
    updatedData.value.prop = prop;
    updatedData.value.value = value;

    await formRef.value.submit();
  } catch (error) {
    if (prop === "birthday") {
      $q.notify({
        type: "warning",
        position: "top",
        message: "Неверное значение даты рождения!",
      });
    }
    console.log(error);
  }
};
</script>

<style scoped lang="scss">
label {
  $control-width: 352px;

  width: $control-width;
  max-width: $control-width;

  button {
    width: $control-width;
  }
}

.date {
  &-input {
    position: relative;
  }

  &-dialog {
    position: absolute;

    // top: 60px;
  }
}
</style>
