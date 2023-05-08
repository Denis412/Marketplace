<template>
  <q-page class="c-pa-32">
    <section>
      <h3 class="text-h3">
        Создать заказ
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
        @change="(value) => form.name = value"
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
          :key="form.todos + index"
          class="text-body1 btn"
          :label="button.label"
          :outline="button.id != form.todos"
          :background="button.id == form.todos"
          :iconLeft="`img:/src/assets/icons/${button.icon}`"
          @click="form.todos = button.id"
          />
        </div>

        <div class="text-subtitle3 input-mt">
          Функции, блоки, разделы сайта
        </div>
        <div class="c-mt-24">
            <q-checkbox
            v-for="(checkbox, index) in checkboxes"
            :key="index"
            v-model="form.functions"
            :val="checkbox.id"
            :label="checkbox.label"
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
        v-model="form.consultation"
        :val="true"
        label="Мне нужна консультация"
        color="violet-6"
        />
        <div>
          Если Вы не знаете, как более точно сформулировать идею - дайте нам знать.
        </div>

        <!-- <label for="file" class="text-subtitle3 input-mt">
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
        </q-file> -->

        <label for="from-to" class="text-subtitle3 input-title input-mt">
            Желаемая стоимость
        </label>
        <div class="row">
          <q-input
          v-model.number="form.price_start"
          type="number"
          class="input c-mt-24 col-3"
          name="from-to"
          placeholder="Опишите, что требуется сделать по вашей задаче..."
          outlined
          :rules="[requiredOneOfNumber(form.price_end), positive, lowerThan(form.price_end)]"
          />

          <q-input
          v-model.number="form.price_end"
          type="number"
          class="input c-mt-24 col-3 offset-1"
          name="from-to"
          placeholder="Опишите, что требуется сделать по вашей задаче..."
          outlined
          :rules="[requiredOneOfNumber(form.price_start), positive, biggerThan(form.price_start)]"
          />
        </div>

        <label for="date" class="text-subtitle3 input-title input-mt">
            Желаемый срок готовности
        </label>
        <q-input style="width: 300px;" name="date" filled v-model="form.date_complete" :rules="[required]">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
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
import { ref } from "vue";
import { useValidators } from "src/use/validators";
import orderApi from "src/sdk/order";

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

const form = ref({
  name: "",
  customer: "",
  todos: "2322215395332615839",
  functions: "7925538065036122162",
  description: "",
  consultation: false,
  // files: null,
  price_start: "",
  price_end: "",
  date_complete: ""
})

const { required, positive, requiredOneOfNumber, lowerThan, biggerThan } = useValidators();

const optionsFn = (date) => {
  return new Date(date).getTime() > Date.now() - 86_400_000;
}

const onSubmit = () => {
  orderApi.orderCreate(form.value);
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
