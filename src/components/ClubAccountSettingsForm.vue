<template>
  <q-form @submit="$emit('submit-form', form)" style="width: min-content">
    <section class="flex no-wrap">
      <c-label-control label="Фамилия">
        <template #control>
          <c-input
            v-model.capitalize="form.last_name"
            @update:model-value="changeUSerData('last_name', $event)"
            :placeholder="currentUser.last_name"
          />
        </template>
      </c-label-control>

      <c-label-control label="Имя" class="c-ml-32">
        <template #control>
          <c-input
            v-model.capitalize="form.first_name"
            @update:model-value="changeUSerData('first_name', $event)"
            :placeholder="currentUser.first_name"
          />
        </template>
      </c-label-control>
    </section>

    <section class="flex no-wrap">
      <c-label-control label="Отчество">
        <template #control>
          <c-input
            v-model.capitalize="form.middle_name"
            @update:model-value="changeUSerData('middle_name', $event)"
            :placeholder="currentUser.middle_name"
          />
        </template>
      </c-label-control>

      <c-label-control label="Дата рождения" class="c-ml-32">
        <template #control>
          <q-input
            v-model="form.birthday"
            :placeholder="currentUser.birthday || 'ДД.ММ.ГГГГ'"
            class="date-input c-input-outline"
            outlined
          >
            <template #append>
              <q-icon
                name="img:/src/assets/icons/calendar/calendar-grey.svg"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="form.birthday"
                    @update:model-value="changeUSerData('birthday', $event)"
                    mask="DD.MM.YYYY"
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
          <c-select
            v-model="form.city"
            use-input
            @update:model-value="changeUSerData('city', $event)"
            @filter="filterFn"
            :options="filteredCities"
          />
        </template>
      </c-label-control>

      <c-label-control label="Пол" class="c-ml-32">
        <template #control>
          <c-select
            v-model="form.gender"
            @update:model-value="changeUSerData('gender', $event)"
            :options="['Мужской', 'Женский']"
          />
        </template>
      </c-label-control>
    </section>

    <c-label-control label="Адрес электронной почты">
      <template #control>
        <q-input
          v-model="form.email"
          :placeholder="currentUser.email"
          class="c-input-outline"
          outlined
          readonly
        />
      </template>
    </c-label-control>
  </q-form>
</template>

<script setup>
import { ref, inject } from "vue";

import CInput from "./ClubInput.vue";
import CSelect from "./ClubSelect.vue";
import CLabelControl from "./ClubLabelControl.vue";
import userApi from "src/sdk/user";
import { useUserStore } from "src/stores/user";

const emit = defineEmits(["form-submit"]);

const userStore = useUserStore();

const currentUser = inject("currentUser");

const form = ref({
  last_name: currentUser.value.last_name,
  first_name: currentUser.value.first_name,
  middle_name: currentUser.value.middle_name,
  birthday: currentUser.value.birthday,
  gender: currentUser.value.gender,
  city: currentUser.value.city,
  email: currentUser.value.email,
});
const cities = ["Москва", "Санкт-Петербург", "Воронеж"];
const filteredCities = ref(cities);

const optionsDateSelect = (date) => new Date(date).getTime() < Date.now();

const filterFn = (val, update) => {
  update(() => {
    filteredCities.value = cities.filter((v) =>
      v.toLowerCase().includes(val.toLowerCase())
    );
  });
};

const changeUSerData = async (prop, value) => {
  try {
    if (prop === "birthday")
      await userApi.update(currentUser.value.subject_id, {
        [prop]: {
          date: value,
        },
      });
    else if (
      prop === "first_name" ||
      prop === "middle_name" ||
      prop === "last_name"
    )
      await userApi.update(currentUser.value.subject_id, {
        fullname: {
          first_name: form.value.first_name,
          middle_name: form.value.middle_name,
          last_name: form.value.last_name,
        },
      });
    else
      await userApi.update(currentUser.value.subject_id, {
        [prop]: value,
      });

    userStore.SET_PROP(prop, value);
  } catch (error) {
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
