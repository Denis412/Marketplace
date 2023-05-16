<template>
  <q-page class="c-pt-32 c-pt-32 container">
    <section>
      <h3 class="text-h3">
        Создать заказ
      </h3>
      <p class="text-body2 c-mt-24">
        Заполните форму и создайте заказ: специальный алгоритм ИИ подберет для вас подходящую команду. Вы сможете обсудить с лидом команды-кандидата проект, выбрать команду, либо отказаться, чтобы ИИ подобрал другую. Также вам на помощь всегда готов прийти модератор.
      </p>
    </section>
    <section>
      <q-form>
        <c-input
        :title="'Название заказа'"
        :name="'name-order'"
        :placeholder="'Кратко в одном предложении опишите идею вашего проекта или заказа...'"
        :type="'text'"
        :class-name="'c-input-outline'"
        @change="(value) => form.name = value"
        :length="500"
        />

        <c-input
        :title="'Наименование заказчика'"
        :name="'name-customer'"
        :placeholder="'Укажите названия компании или ИП...'"
        :type="'text'"
        @change="(value) => form.customer = value"
        :class-name="'c-input-outline'"
        :length="500"
        />

        <div class="text-subtitle3 input-title input-mt">
            Что требуется сделать
        </div>
        <div class="relative-position button-group row wrap c-mt-24">
          <c-button
          v-for="(button, index) in buttons"
          :key="form.todos + index"
          class="text-caption2 btn"
          :label="button.label"
          :outline="!form.todos.includes(button.id)"
          :background="form.todos.includes(button.id)"
          :icon-right="form.todos.includes(button.id) ? 'img:/assets/icons/close/cross-white.svg' : ''"
          @click="addTodo(button.id, form)"
          />

          <img class="absolute mail-img" src="/assets/images/order/mail-icon.svg" alt=""/>
        </div>

        <div class="text-subtitle3 input-mt">
          Функции, блоки, разделы сайта
        </div>
        <div class="c-mt-24 checkboxes-area">
            <q-checkbox
            v-for="(checkbox, index) in checkboxes"
            :key="index"
            v-model="form.functions"
            :val="checkbox.id"
            :label="checkbox.label"
            class="c-checkbox-outlined"
            />
        </div>

        <c-input
        :title="'Описание заказчика'"
        :name="'order-description'"
        :placeholder="'Опишите, что требуется сделать по вашей задаче...'"
        :type="'textarea'"
        :class-name="'c-textarea-outline'"
        @change="(value) => form.description = value"
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

            <div>
              Если Вы не знаете, как более точно сформулировать идею - дайте нам знать.
            </div>
          </div>

          <div class="col-6">
            <img class="question-mark-img" src="/assets/images/order/speech-bubble.svg" alt="">
          </div>
        </div>

        <label for="file" class="text-subtitle3 input-mt">
            Файлы и документы
        </label>
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
              Если у вас уже имеются контент, брендбук, бриф, спецификация или иные материалы по заказу, пожалуйста, загрузите их...
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

                <q-icon class="ruble" name="img:/assets/icons/others/ruble-purple.svg"/>
              </div>

              <div class="row justify-between c-mt-24 col-3">
                <q-input
                v-model.number="form.price_end"
                type="number"
                class="c-input-price col-10"
                name="from-to"
                placeholder="До..."
                outlined
                :rules="[requiredOneOfNumber(form.price_start), positive, biggerThan(form.price_start)]"
                />

                <q-icon class="ruble" name="img:/assets/icons/others/ruble-purple.svg"/>
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
                  <q-icon name="img:/assets/icons/calendar/calendar-purple.svg" class="cursor-pointer">
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

              <img class="absolute calendar-img" src="/assets/images/order/calendar-inject.svg" alt="">
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
import { ref } from "vue";
import { useValidators } from "src/use/validators";
import orderApi from "src/sdk/order";
import { useRouter } from "vue-router";
import { addTodo } from "src/use/order";
import { optionsFn } from "src/use/date";

const router = useRouter();

const buttons = ref([
  {
    id: "2322215395332615839",
    label: "Нетиповой заказ",
    icon: "Apple.svg"
  },
  {
    id: "5804251226518375556",
    label: "Продающий лендинг",
    icon: "Apple.svg"
  },
  {
    id: "872950655226984022",
    label: "Сайт с каталогом товаров/услуг",
    icon: "Apple.svg"
  },
  {
    id: "3807907494702823055",
    label: "Интернет-магазин",
    icon: "Apple.svg"
  },
  {
    id: "3145435887065291672",
    label: "Блог или новостной сайт",
    icon: "Apple.svg"
  },
]);

const checkboxes = ref([
  {
    id: "1115056088238798708",
    label: "Отзывы"
  },
  {
    id: "2814433946574621136",
    label: "Контакты с картой"
  },
  {
    id: "8646158479716124341",
    label: "Форма заявки"
  },
  {
    id: "7339056783708620612",
    label: "Партнеры с логотипами"
  },
  {
    id: "6214538158831939451",
    label: "Фотогалерея"
  },
  {
    id: "3255894487282866788",
    label: "FAQ"
  },
  {
    id: "4051829856883748978",
    label: "Преимущества"
  },
  {
    id: "8055711828454729804",
    label: "Сотрудники, команда"
  },
  {
    id: "6486583800529494661",
    label: "Карточки товаров/услуг"
  },
  {
    id: "7925538065036122162",
    label: "Слайдер с акциями"
  }
]);

const files = ref([]);
const uploadFile = ref();

const form = ref({
  name: "",
  customer: "",
  todos: ["2322215395332615839"],
  functions: [],
  description: "",
  consultation: false,
  // files: null,
  price_start: "",
  price_end: "",
  date_complete: "",
  draft: true
})

const { required, positive, requiredOneOfNumber, lowerThan, biggerThan } = useValidators();

const createDraft = () => {
  orderApi.orderCreate(form.value);
}

const createOrder = () => {
  form.value.draft = false;
  orderApi.orderCreate(form.value);
  router.push({ name: 'order-created' });
}

const addFile = () => {
  uploadFile.value.pickFiles();
}
</script>

<style lang="scss" scoped>
.input-title {
  margin-left: 21px;

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

.button-group {
  gap: 32px;
  width: 70%;
}

.btn {
  white-space: nowrap;
  margin-bottom: 23px;
  border-radius: 32px !important;
  height: 37px;
}

.input-mt {
  margin-top: 80px;
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
