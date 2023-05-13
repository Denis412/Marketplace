<template>
  <q-page class="c-pa-32">
    <section v-if="!loadingOrder">
      <div v-if="loadingOrder">
        Загрузка...
      </div>

      <h3 class="text-h3">
        Изменить заказ {{ order.id }}
      </h3>

      <p class="text-body2 c-mt-24">
        Заполните форму и создайте заказ: специальный алгоритм ИИ подберет для вас подходящую команду. Вы сможете обсудить с лидом команды-кандидата проект, выбрать команду, либо отказаться, чтобы ИИ подобрал другую. Также вам на помощь всегда готов прийти модератор.
      </p>
    </section>

    <section v-if="!loadingOrder">
      <q-form>
        <c-input
        :title="'Название заказа'"
        :name="'name-order'"
        :placeholder="'Кратко в одном предложении опишите идею вашего проекта или заказа...'"
        :type="'text'"
        :value = "order.name"
        @change="(value) => form.name = value"
        :length="500"
        :readonly="!order.draft"
        />

        <c-input
        :title="'Наименование заказчика'"
        :name="'name-customer'"
        :placeholder="'Укажите названия компании или ИП...'"
        :type="'text'"
        :value = "order.customer"
        @change="(value) => form.customer = value"
        :length="500"
        :readonly="!order.draft"
        />

        <div class="text-subtitle3 input-title input-mt">
            Что требуется сделать
        </div>
        <div class="row justify-between wrap c-mt-24">
          <c-button
          v-for="(button, index) in buttons"
          :key="form?.todos + index || index"
          class="text-body1 btn"
          :label="button.label"
          :outline="!order.todos.includes(button.id)"
          :background="order.todos.includes(button.id)"
          :iconLeft="`img:/src/assets/icons/${button.icon}`"
          @click="addTodo(button.id)"
          />
        </div>

        <div class="text-subtitle3 input-mt">
          Функции, блоки, разделы сайта
        </div>
        <div class="c-mt-24">
            <q-checkbox
            v-for="(checkbox, index) in checkboxes"
            :key="index"
            v-model="order.functions"
            :val="checkbox.id"
            :label="checkbox.label"
            color="violet-6"
            @update:model-value="setValue('functions')"
            />
        </div>

        <c-input
        :title="'Описание заказчика'"
        :name="'order-description'"
        :placeholder="'Опишите, что требуется сделать по вашей задаче...'"
        :type="'textarea'"
        :value = "order.description"
        @change="(value) => form.description = value"
        :length="5000"
        />


        <q-checkbox
        v-model="order.consultation"
        :val="true"
        label="Мне нужна консультация"
        color="violet-6"
        :disable="!order.draft"
        @update:model-value="setValue('consultation')"
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
          v-model.number="order.price_start"
          type="number"
          class="input c-mt-24 col-3"
          name="from-to"
          placeholder="Опишите, что требуется сделать по вашей задаче..."
          outlined
          :rules="[requiredOneOfNumber(form.price_end), positive, lowerThan(form.price_end)]"
          :readonly="!order.draft"
          @update:model-value="setPrice()"
          />

          <q-input
          v-model.number="order.price_end"
          type="number"
          class="input c-mt-24 col-3 offset-1"
          name="from-to"
          placeholder="Опишите, что требуется сделать по вашей задаче..."
          outlined
          :rules="[requiredOneOfNumber(form.price_start), positive, biggerThan(form.price_start)]"
          :readonly="!order.draft"
          @update:model-value="setPrice()"
          />
        </div>

        <label for="date" class="text-subtitle3 input-title input-mt">
            Желаемый срок готовности
        </label>
        <q-input
        style="width: 300px;"
        name="date"
        filled
        v-model="order.date_complete"
        @update:model-value="setValue('date_complete')"
        :rules="[required]"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date
                :rules="[required]"
                v-model="order.date_complete"
                @update:model-value="setValue('date_complete')"
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
            :label="'Изменить'"
            :background="true"
            @click="editOrder"
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
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { getOrderById } from "src/graphql/order/queries";
import orderApi from "src/sdk/order";

const route = useRoute();
const { result: getOrder, loading: loadingOrder } = useQuery(getOrderById, route.params);
const { required, positive, requiredOneOfNumber, lowerThan, biggerThan } = useValidators();

const order = ref({});
const form = ref({});

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


watch(loadingOrder, () => {
  Object.assign(order.value, getOrder.value.get_order)
})

const optionsFn = (date) => {
  return new Date(date).getTime() > Date.now() - 86_400_000;
}

const addTodo = (id) => {
  if (!order.value.draft)
    return;

  if (!form.value.hasOwnProperty('todos')) {
    form.value.todos = []
    Object.assign(form.value.todos, order.value.todos);
  }

  form.value.todos.includes(id) ?
    form.value.todos.splice(form.value.todos.indexOf(id), 1) :
    form.value.todos.push(id);

  order.value.todos = form.value.todos
}

const setPrice = () => {
  form.value.price_start = order.value.price_start;
  form.value.price_end = order.value.price_end
}

const setValue = (value) => {
  form.value[value] = order.value[value];
}

const editOrder = () => {
  orderApi.orderEdit(form.value, order.value.id, order.value.name)
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
