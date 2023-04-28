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
      <form action="">
        <label for="name-order" class="text-subtitle3 input-title input-mt">
            Название заказа
        </label>
        <q-input class="input c-mt-24" name="name-order" placeholder="Кратко в одном предложении опишите идею вашего проекта или заказа..." outlined/>

        <label for="name-customer" class="text-subtitle3 input-title input-mt">
            Наименование заказчика
        </label>
        <q-input class="input c-mt-24" name="name-customer" placeholder="Укажите названия компании или ИП..." outlined/>

        <div class="text-subtitle3 input-title input-mt">
            Что требуется сделать
        </div>
        <div class="row justify-between wrap c-mt-24">
          <c-button
          v-for="button in buttons"
          :key="button.name"
          class="text-body1 btn"
          :label="'Создать команду'"
          :outline="true"
          :background="false"
          :iconLeft="`img:/src/assets/icons/${button.icon}`"
          />
        </div>

        <div class="text-subtitle3 input-mt">
          Функции, блоки, разделы сайта
        </div>
        <div class="c-mt-24">
            <q-checkbox
            v-for="(checkbox, index) in checkboxes"
            :key="index"
            v-model="selection"
            :val="checkbox"
            :label="checkbox"
            color="violet-6"
            />
        </div>


        <label for="order-description" class="text-subtitle3 input-title input-mt">
            Описание заказчика
        </label>
        <q-input type="textarea" class="input c-mt-24" name="order-description" placeholder="Опишите, что требуется сделать по вашей задаче..." outlined/>

        <q-checkbox
        v-model="consult"
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
        <q-file outlined v-model="model">
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

        <label for="from-to" class="text-subtitle3 input-title input-mt">
            Желаемая стоимость
        </label>
        <div class="row">
          <q-input type="number" class="input c-mt-24 col-3" name="from-to" placeholder="Опишите, что требуется сделать по вашей задаче..." outlined/>
          <q-input type="number" class="input c-mt-24 col-3 offset-1" name="from-to" placeholder="Опишите, что требуется сделать по вашей задаче..." outlined/>
        </div>

        <label for="date" class="text-subtitle3 input-title input-mt">
            Желаемый срок готовности
        </label>
        <q-input style="width: 300px;" name="date" filled v-model="date" mask="date" :rules="['date']">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="date">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      </form>
    </section>
  </q-page>
</template>

<script setup>
import CButton from "src/components/ClubButton.vue";
import { ref, watch } from "vue";

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
])

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
])

const selection = ref([]);

const consult = ref(false);
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
