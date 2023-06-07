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
        <c-input
          class="c-mb-64"
          :title="'Название заказа'"
          :name="'name-order'"
          :placeholder="'Кратко в одном предложении опишите идею вашего проекта или заказа...'"
          :type="'text'"
          :class-name="'c-input-outline'"
          @change="(value) => (form.name = value)"
          :length="500"
        />

        <c-input
          class="c-mb-64"
          :title="'Наименование заказчика'"
          :name="'name-customer'"
          :placeholder="'Укажите названия компании или ИП...'"
          :type="'text'"
          @change="(value) => (form.customer = value)"
          :class-name="'c-input-outline'"
          :length="500"
        />

        <div class="row no-wrap justify-between c-mt-24 c-mb-64">
          <div class="column no-wrap items-start">
            <p class="text-subtitle5 input-title input-mt c-pb-24">Что требуется сделать</p>
            <div class="col-10 row wrap button-group">
              <q-btn
                v-for="(orderType, index) in orderTypeList"
                :key="index"
                class="text-caption2 btn"
                :label="orderType.name"
                :outline="true"
                @click="addTodo(index, orderType)"
              />
            </div>
          </div>

          <img class="mail-img" src="/assets/images/order/mail-icon.svg" alt="" />
        </div>

        <p v-if="allFunctions.length" class="text-subtitle5 input-mt c-mb-24">
          Функции, блоки, разделы сайта
        </p>
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

        <c-input
          :title="'Описание заказчика'"
          :name="'order-description'"
          :placeholder="'Опишите, что требуется сделать по вашей задаче...'"
          :type="'textarea'"
          :class-name="'c-textarea-outline'"
          @change="(value) => (form.description = value)"
          :length="5000"
        />

        <div class="row">
          <div class="col-6">
            <q-checkbox
              v-model="form.consultation"
              :val="true"
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

        <label for="file" class="text-subtitle3 input-mt"> Файлы и документы </label>
        <q-file
          outlined
          multiple
          use-chips
          append
          v-model="files"
          max-files="10"
          max-file-size="51200"
          class="c-filepicker-outline"
          ref="uploadFile"
        >
          <div class="c-file-placeholder">
            Если у вас уже имеются контент, брендбук, бриф, спецификация или иные материалы по
            заказу, пожалуйста, загрузите их...
          </div>

          <c-button
            class="text-body1 btn c-file-button"
            :label="'Выберите файл'"
            :background="true"
            @click="addFile"
          />
        </q-file>

        <div class="input-wrapper row relative-position">
          <div class="col-3">
            <label for="from-to" class="text-subtitle3 input-title input-mt">
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
              />

              <q-icon class="ruble" name="img:/assets/icons/others/ruble-purple.svg" />
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
              />

              <q-icon class="ruble" name="img:/assets/icons/others/ruble-purple.svg" />
            </div>
          </div>

          <div class="col-3 offset-2">
            <label for="date" class="text-subtitle3 input-title input-mt">
              Желаемый срок готовности
            </label>

            <q-input
              placeholder="дд.мм.гггг"
              class="c-input-outline"
              name="date"
              outlined
              v-model="form.date_complete"
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
                      v-model="form.date_complete"
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
          <c-button
            class="text-body1 btn col-2"
            :label="'Разместить заказ'"
            :background="true"
            @click="createOrder"
          />

          <c-button
            class="text-body1 btn col-3 offset-1"
            :label="'Сохранить как черновик'"
            :outline="true"
            @click="createDraft"
          />
        </div>
      </q-form>
    </section>
  </q-page>
</template>

<script setup>
import CButton from "src/components/ClubButton.vue";
import CInput from "src/components/ClubOrderCreateInput.vue";
import { ref, computed } from "vue";
import { useValidators } from "src/use/validators";
import orderApi from "src/sdk/order";
import orderTypeApi from "src/sdk/order_type";
import { useRouter } from "vue-router";
// import { addTodo } from "src/use/order";
import { optionsFn } from "src/use/date";
import { useQuasar } from "quasar";

const $q = useQuasar();

const router = useRouter();

const { result: orderTypes } = orderTypeApi.paginateOrderTypes({
  page: 1,
  perPage: 100,
});

console.log(orderTypes);

const orderTypeList = computed(() => orderTypes.value.paginate_order_type.data);

console.log(orderTypeList);

const selectedType = ref("");
const selectedFunctions = ref([]);
const allFunctions = ref([]);
const files = ref([]);
const uploadFile = ref();

const form = ref({
  name: "",
  customer: "",
  type: { [process.env.ORDER_TYPE_ID]: selectedType },
  functions: { [process.env.ORDER_FUNCTION_ID]: selectedFunctions },
  description: "",
  consultation: false,
  // files: null,
  price_start: "",
  price_end: "",
  date_complete: "",
  draft: true,
  status: process.env.ORDER_STATUS_1,
});

const { required, positive, requiredOneOfNumber, lowerThan, biggerThan } = useValidators();

const createDraft = () => {
  form.value.status = process.env.ORDER_STATUS_0;
  orderApi.orderCreate(form.value);
};

const createOrder = () => {
  form.value.draft = false;
  console.log(selectedType.value);
  console.log(selectedFunctions.value);
  orderApi.orderCreate(form.value);
  // router.push({ name: "orders" });
};

const addTodo = (index, orderType) => {
  selectedType.value = orderType.id;
  allFunctions.value = orderTypeList.value[index].all_functions.map((el) => {
    el = { id: el.id, name: el.name };
    return el;
  });
  console.log(selectedFunctions.value);
  // console.log(
  //   orderTypeList.value[index].all_functions.map((el) => {
  //     el = { id: el.id, name: el.name };
  //     return el;
  //   })
  // );
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

.input {
  border-radius: 8px;
}

.button-group {
  gap: 32px;
  // width: 70%;
}

.btn {
  white-space: nowrap;
  margin-bottom: 23px;
  border-radius: 32px !important;
  height: 37px;
}

.input-mt {
  display: block;
}

.checkboxes-area {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.submit-btns {
  margin-top: 120px;
}

.ruble {
  height: 24px;
  width: 24px;
}

.mail-img {
  right: -32%;
  top: -58px;
}

.question-mark-img {
  margin-top: 31px;
}

.calendar-img {
  right: 0;
  top: 221px;
}
</style>
