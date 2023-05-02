<template>
  <q-form @submit="$emit('submit-form', form)" style="width: min-content">
    <section class="flex no-wrap">
      <c-label-control label="Фамилия">
        <template #control>
          <c-input
            v-model="form.last_name"
            :placeholder="currentUser.last_name"
          />
        </template>
      </c-label-control>

      <c-label-control label="Имя" class="c-ml-32">
        <template #control>
          <c-input
            v-model="form.first_name"
            :placeholder="currentUser.first_name"
          />
        </template>
      </c-label-control>
    </section>

    <section class="flex no-wrap">
      <c-label-control label="Отчество">
        <template #control>
          <c-input
            v-model="form.middle_name"
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
            readonly
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
                    mask="DD.MM.YYYY"
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
          <c-dropdown
            v-model="form.city"
            :list="['Москва', 'Санкт-Петербург']"
          />
        </template>
      </c-label-control>

      <c-label-control label="Пол" class="c-ml-32">
        <template #control>
          <c-dropdown v-model="form.sex" :list="['Мужской', 'Женский']" />
        </template>
      </c-label-control>
    </section>

    <c-label-control label="Адрес электронной почты">
      <template #control>
        <c-input :placeholder="currentUser.email" readonly />
      </template>
    </c-label-control>
  </q-form>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "src/stores/user";

import CInput from "./ClubInput.vue";
import CDropdown from "./ClubDropdown.vue";
import CLabelControl from "./ClubLabelControl.vue";

const emit = defineEmits(["form-submit"]);

const userStore = useUserStore();

const currentUser = computed(() => userStore.GET_CURRENT_USER);

const form = ref({
  last_name: "",
  first_name: "",
  middle_name: "",
  birthday: "",
  sex: "",
  city: "",
  email: "",
});
const dateSelect = ref(false);

const optionsDateSelect = (date) => new Date(date).getTime() > Date.now();

const showDateSelect = () => {
  dateSelect.value = true;
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
