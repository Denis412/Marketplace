<template>
  <q-page class="c-pa-32">
    <section>
      <h3 class="text-h3">
        Мои команды
      </h3>
      <p class="text-body2 c-mt-24">
        Заполните форму и создайте заказ: специальный алгоритм ИИ подберет для вас подходящую команду. Вы сможете обсудить с лидом команды-кандидата проект, выбрать команду, либо отказаться, чтобы ИИ подобрал другую. Также вам на помощь всегда готов прийти модератор.
      </p>
    </section>
    <section>
      <q-form @submit="onSubmit">
        <c-input
        :title="'Название заказа'"
        :name="'name-order'"
        :placeholder="'Кратко в одном предложении опишите идею вашего проекта или заказа...'"
        :type="'text'"
        @change="(value) => form.order = value"
        :length="500"
        />

        <c-input
        :title="'Наименование заказчика'"
        :name="'name-customer'"
        :placeholder="'Укажите названия компании или ИП...'"
        :type="'text'"
        @change="(value) => form.customer = value"
        :length="500"
        />

        <div class="text-subtitle3 input-title input-mt">
            Что требуется сделать
        </div>
        <div class="row justify-between wrap c-mt-24">
          <c-button
          v-for="(button, index) in buttons"
          :key="form.type + index"
          class="text-body1 btn"
          :label="button.name"
          :outline="button.name != form.type"
          :background="button.name == form.type"
          :iconLeft="`img:/src/assets/icons/${button.icon}`"
          @click="form.type = button.name"
          />
        </div>

        <div class="text-subtitle3 input-mt">
          Функции, блоки, разделы сайта
        </div>
        <div class="c-mt-24">
            <q-checkbox
            v-for="(checkbox, index) in checkboxes"
            :key="index"
            v-model="form.websiteFuncs"
            :val="checkbox"
            :label="checkbox"
            color="violet-6"
            />
        </div>

        <c-input
        :title="'Описание заказчика'"
        :name="'order-description'"
        :placeholder="'Опишите, что требуется сделать по вашей задаче...'"
        :type="'textarea'"
        @change="(value) => form.description = value"
        :length="5000"
        />


        <q-checkbox
        v-model="form.consult"
        :val="true"
        label="Мне нужна консультация"
        color="violet-6"
        />
        <div>
          Если Вы не знаете, как более точно сформулировать идею - дайте нам знать.
        </div>

        <label for="file" class="text-subtitle3 input-mt">
            Файлы и документы
        </label>
        <q-file
        outlined
        multiple
        use-chips
        append
        v-model="form.files"
        max-files="10"
        max-file-size="51200"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

        <label for="from-to" class="text-subtitle3 input-title input-mt">
            Желаемая стоимость
        </label>
        <div class="row">
          <q-input
          v-model="form.priceFrom"
          type="number"
          class="input c-mt-24 col-3"
          name="from-to"
          placeholder="Опишите, что требуется сделать по вашей задаче..."
          outlined
          :rules="[requiredOneOf(form.priceTo), positive, lowerThan(form.priceTo)]"
          />

          <q-input
          v-model="form.priceTo"
          type="number"
          class="input c-mt-24 col-3 offset-1"
          name="from-to"
          placeholder="Опишите, что требуется сделать по вашей задаче..."
          outlined
          :rules="[requiredOneOf(form.priceFrom), positive, biggerThan(form.priceFrom)]"
          />
        </div>

        <label for="date" class="text-subtitle3 input-title input-mt">
            Желаемый срок готовности
        </label>
        <q-input style="width: 300px;" name="date" filled v-model="form.date" :rules="[required]">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date
                :rules="[required]"
                v-model="form.date"
                mask="DD.MM.YYYY"
                :options="optionsFn"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <div class="row">
          <c-button
            class="text-body1 btn col-2"
            :label="'Разместить заказ'"
            :background="true"
            :type="'submit'"
          />

          <c-button
            class="text-body1 btn col-3 offset-1"
            :label="'Сохранить как черновик'"
            :outline="true"
            :type="'submit'"
          />
        </div>


      </q-form>
    </section>
  </q-page>
</template>

<script setup>
import CButton from "src/components/ClubButton.vue";
import CInput from "src/components/ClubOrderCreateInput.vue";
import { ref, watch } from "vue";
import { useValidators } from "src/use/validators";

const buttons = ref([
  {
    name: "Нетиповой заказ",
    icon: "Apple.svg"
  },
  {
    name: "Продающий лендинг",
    icon: "Apple.svg"
  },
  {
    name: "Сайт с каталогом товаров/услуг",
    icon: "Apple.svg"
  },
  {
    name: "Интернет-магазин",
    icon: "Apple.svg"
  },
  {
    name: "Блог или новостной сайт",
    icon: "Apple.svg"
  },
]);

const checkboxes = ref([
  "Отзывы",
  "Контакты с картой",
  "Партнеры с логотипами",
  "Фотогалерея",
  "FAQ",
  "Преимущества",
  "Сотрудники, команда",
  "Карточки товаров/услуг",
  "Слайдер с акциями"
]);

const form = ref({
  order: "",
  customer: "",
  type: "Нетиповой заказ",
  websiteFuncs: [],
  description: "",
  consult: false,
  files: null,
  priceFrom: "",
  priceTo: "",
  date: ""
})

const { required, positive, requiredOneOf, lowerThan, biggerThan } = useValidators();

const optionsFn = (date) => {
  return new Date(date).getTime() > Date.now() - 86_400_000;
}

const onSubmit = () => {
  console.log(form.value)
}
</script>

<style lang="scss" scoped>
.input-title {
  &::before {
    content: '';
    display: block;
    width: 11px;
    height: 11px;
    border-radius: 100px;
    background: #581C87;
    transform: translate(-21px, 20px);
  }
}

.input {
  border-radius: 8px;
}

.btn {
  width: 265px;
  margin-bottom: 23px;
}

.input-mt {
  margin-top: 80px;
  display: block;
}
</style>
