<template>
  <q-page class="c-pt-32 c-ml-32 c-mr-128">
    <section class="c-mb-64">
      <h3 class="text-h3 c-mb-24">Создать заказ</h3>
      <p class="text-body2">
        Заполните форму и создайте заказ: специальный алгоритм ИИ подберет для вас подходящую
        команду. Вы сможете обсудить с лидом команды-кандидата проект, выбрать команду, либо
        отказаться, чтобы ИИ подобрал другую. Также вам на помощь всегда готов прийти модератор.
      </p>
    </section>

    <section>
      <q-form v-if="orderTypes">
        <q-input
          flat
          outlined
          class="c-input-outline c-mb-64"
          title="Название заказа"
          :name="'name-order'"
          :placeholder="'Кратко в одном предложении опишите идею вашего проекта или заказа...'"
          :type="'text'"
          :class-name="'c-input-outline text-body1'"
          @change="(value) => (form.name = value)"
          maxlength="100"
        />

        <q-input
          flat
          outlined
          class="c-input-outline c-mb-64"
          title="Наименование заказчика"
          :name="'name-customer'"
          :placeholder="'Укажите названия компании или ИП...'"
          @change="(value) => (form.customer = value)"
          :class-name="'c-input-outline text-body1'"
          :length="500"
        />

        <div class="row no-wrap justify-between c-mt-24 c-mb-64">
          <div class="column no-wrap flex-start">
            <p class="text-subtitle5 input-title block c-mb-24">Что требуется сделать</p>
            <div class="row wrap button-group">
              <q-btn
                v-for="(orderType, index) in orderTypes"
                :key="index"
                class="text-caption2 btn-type"
                :label="orderType.name"
                :outline="true"
                @click="addTodo(index, orderType)"
              />
            </div>
          </div>

          <img src="/assets/images/order/mail-icon.svg" alt="" />
        </div>

        <div v-if="allFunctions.length">
          <p class="text-subtitle5 block c-mb-24">Функции, блоки, разделы сайта</p>
          <div class="c-mb-64 checkboxes-area">
            <q-checkbox
              v-for="(checkbox, index) in allFunctions"
              :key="index"
              v-model="selectedFunctions"
              :val="checkbox.id"
              :label="checkbox.name"
              class="c-checkbox-outlined"
            />
          </div>
        </div>

        <q-input
          flat
          outlined
          class="c-textarea-outline"
          title="Описание заказчика"
          :name="'order-description'"
          :placeholder="'Опишите, что требуется сделать по вашей задаче...'"
          :type="'textarea'"
          :class-name="'c-textarea-outline text-body1'"
          @change="(value) => (form.description = value)"
          maxlength="5000"
        />

        <div class="row text-caption1 c-mb-64">
          <div class="col-6">
            <q-checkbox
              v-model="form.consultation"
              :val="true"
              left-label
              label="Мне нужна консультация"
              color="violet-6"
              class="c-checkbox-outlined"
            />

            <div>Если Вы не знаете, как более точно сформулировать идею - дайте нам знать.</div>
          </div>

          <div class="col-6">
            <img class="question-mark-img" src="/assets/images/order/speech-bubble.svg" alt="" />
          </div>
        </div>

        <label for="file" class="text-subtitle5 block c-mb-24"> Файлы и документы </label>
        <q-file
          outlined
          multiple
          use-chips
          append
          v-model="files"
          max-files="10"
          max-file-size="51200"
          class="c-filepicker-outline c-mb-64"
          ref="uploadFile"
        >
          <div class="c-file-placeholder">
            Если у вас уже имеются контент, брендбук, бриф, спецификация или иные материалы по
            заказу, пожалуйста, загрузите их...
          </div>

          <q-btn
            class="text-body1 btn"
            text-color="white"
            :label="'Выберите файл'"
            @click="addFile"
          />
        </q-file>

        <div class="input-wrapper row relative-position c-mb-64">
          <div class="col-4">
            <label for="from-to" class="text-subtitle5 input-title block">
              Желаемая стоимость
            </label>

            <div class="row justify-between c-mt-24 col-3">
              <q-input
                v-model.number="form.price_start"
                type="number"
                class="c-input-price col-10"
                name="from-to"
                placeholder="От..."
                outlined
                :rules="[requiredOneOfNumber(form.price_end), positive, lowerThan(form.price_end)]"
              >
                <template v-slot:append>
                  <q-icon name="img:/assets/icons/others/ruble-purple.svg" color="orange" />
                </template>
              </q-input>
            </div>

            <div class="row justify-between c-mt-24 col-3">
              <q-input
                v-model.number="form.price_end"
                type="number"
                class="c-input-price col-10"
                name="from-to"
                placeholder="До..."
                outlined
                :rules="[
                  requiredOneOfNumber(form.price_start),
                  positive,
                  biggerThan(form.price_start),
                ]"
              >
                <template v-slot:append>
                  <q-icon name="img:/assets/icons/others/ruble-purple.svg" color="orange" />
                </template>
              </q-input>
            </div>
          </div>

          <div class="col-4 offset-2">
            <label for="date" class="text-subtitle5 input-title block c-mb-24">
              Желаемый срок готовности
            </label>

            <q-input
              placeholder="дд.мм.гггг"
              class="c-input-outline"
              name="date"
              outlined
              v-model="selectedDate"
              :rules="[required]"
            >
              <template v-slot:append>
                <q-icon
                  name="img:/assets/icons/calendar/calendar-purple.svg"
                  class="cursor-pointer"
                >
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date
                      :rules="[required]"
                      v-model="selectedDate"
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

            <img
              class="absolute calendar-img"
              src="/assets/images/order/calendar-inject.svg"
              alt=""
            />
          </div>
        </div>

        <div class="row submit-btns">
          <q-btn
            class="text-body1 btn"
            text-color="white"
            :label="'Разместить заказ'"
            @click="createOrder"
          />

          <q-btn class="text-body1 btn" :label="'Сохранить как черновик'" @click="createDraft" />
        </div>
      </q-form>
    </section>
  </q-page>
</template>

<script setup>
import { inject, ref } from "vue";
import { useValidators } from "src/use/validators";
import { useRouter } from "vue-router";
import { optionsFn } from "src/use/date";
import { useQuasar } from "quasar";

import OrderService from "src/sevices/OrderService";

const $q = useQuasar();

const router = useRouter();

const currentUser = inject("currentUser");

const { result: orderTypes } = OrderService.fetchOrderTypes();

const selectedType = ref("");
const selectedFunctions = ref([]);
const allFunctions = ref([]);
const files = ref([]);
const uploadFile = ref();
const selectedDate = ref("");

const form = ref({
  name: "",
  customer: "",
  type: { [process.env.ORDER_TYPE_ID]: selectedType },
  functions: { [process.env.ORDER_FUNCTION_ID]: selectedFunctions },
  description: "",
  consultation: false,
  price_start: "",
  price_end: "",
  date_complete: { date: selectedDate, time: "20:00:00" },
  draft: true,
  status: process.env.ORDER_STATUS_1,
});

const { required, positive, requiredOneOfNumber, lowerThan, biggerThan } = useValidators();

const createDraft = () => {
  form.value.status = process.env.ORDER_STATUS_0;
  OrderService.createOrder(form.value);
};

const createOrder = () => {
  form.value.draft = false;

  console.log(form.value);
  OrderService.createOrder(form.value);
};

const addTodo = (index, orderType) => {
  selectedType.value = orderType.id;
  allFunctions.value = orderTypes.value[index].all_functions.map((el) => {
    el = { id: el.id, name: el.name };
    return el;
  });
};

const addType = (id) => {
  if (form.value.functions.find((type) => type === id)) {
    $q.notify({
      type: "warning",
      message: "Такой вид работ уже есть в списке!",
    });
    return;
  }
  form.value.functions = [...form.value.functions, id];
};

const addFile = () => {
  uploadFile.value.pickFiles();
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.q-input {
  max-height: 44px;
}
.c-mb-24 {
  margin-bottom: 24px;
}
.input-title {
  margin-left: 21px;

  &::before {
    content: "";
    display: block;
    width: 11px;
    height: 11px;
    border-radius: 100px;
    background: #581c87;
    transform: translate(-21px, 20px);
  }
}
.button-group {
  gap: 32px;
}
.btn {
  text-transform: none;
  padding: 8px 16px;
  white-space: nowrap;
  background: linear-gradient(101.75deg, #4c1d95 4.25%, #881d95 96.95%);
  border-radius: 8px;
  &-type {
  }
}
.checkboxes-area {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
.question-mark-img {
  margin-top: 31px;
}
.calendar-img {
  right: 0;
  top: 221px;
}
</style>
