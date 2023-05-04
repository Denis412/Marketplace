<template>
  <div class="q-mx-auto q-mt-md wrapper-page-order-info">
    <div class="flex items-end">
      <div>
        <p class="text-h4 q-mb-sm">просмотр заказа 1260</p>
      </div>
      <div class="q-ml-sm flex items-baseline">
        <div
          class="color-type-status"
          :style="`background-color: ${colorStatus}`"
        ></div>
        <p class="text-h6 q-mx-sm q-mb-sm">Есть кандидат</p>
      </div>
    </div>

    <div>
      <p class="text-from-order-info q-mb-xl">Lorem, ipsum dolor.</p>
    </div>

    <div>
      <p class="text-h4">Отклик</p>

      <div class="block-control-response">
        <div class="q-mt-lg q-mb-md flex justify-start no-wrap">
          <div
            class="image-block-control-response q-ml-xl q-mr-md flex center justify-center"
          >
            <img
              src="src/assets/icons/person/person-white.svg"
              alt="person-white"
            />
          </div>

          <div class="flex column wrap content-block-control-response">
            <p class="q-mb-md text-h5 text-weight-medium">
              Lorem ipsum dolor sit.
            </p>
            <p class="q-mb-xl text-h6 text-weight-regular">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
              incidunt similique quisquam esse quaerat quibusdam.
            </p>
            <p class="text-h6 text-weight-regular">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem iusto quos blanditiis repellendus praesentium fuga?
            </p>
          </div>
        </div>

        <div class="flex items-center">
          <div class="q-ml-xl">{{ dateOrderResponse }}</div>

          <c-button
            class="q-ml-xl"
            :label="'Перейти к профилю'"
            :textColor="'white'"
            :background="'linear-gradient(101.75deg, #4C1D95 4.25%, #881D95 96.95%);'"
          />

          <c-button
            class="q-ml-md"
            :label="'Утвердить исполнителя'"
            :textColor="'white'"
            :background="'linear-gradient(101.75deg, #4C1D95 4.25%, #881D95 96.95%);'"
          />

          <c-button
            class="q-ml-md"
            :label="'Отказаться'"
            :textColor="'white'"
            :background="'linear-gradient(101.75deg, #4C1D95 4.25%, #881D95 96.95%);'"
          />
        </div>
      </div>
    </div>

    <div>
      <p class="q-mt-md q-mb-xs text-h5">Заказчик</p>
      <!-- <div>Тут будут ссылки на заказчиков =)</div>   -->
      <p class="text-content-component">
        ИП Котовский Константин Владиславович
      </p>
    </div>

    <div class="q-mt-lg">
      <p class="q-mt-sm q-mb-sm text-h5">Что требуется</p>
      <c-button
        :label="'Продающий лендинг'"
        :textColor="'white'"
        :background="'linear-gradient(101.75deg, #4C1D95 4.25%, #881D95 96.95%);'"
      />
    </div>

    <div class="q-mt-lg">
      <p class="q-mt-sm q-mb-sm text-h5">Функции, блоки, разделы сайта</p>

      <p class="text-content-component">Отзывы</p>
      <p class="text-content-component">Патерны с логотипами</p>
      <p class="text-content-component">Фотогалерея</p>
      <p class="text-content-component">Контакты с картой</p>
      <p class="text-content-component">Слайдер с акциями</p>
    </div>

    <div class="q-mt-lg">
      <div class="q-mt-sm q-mb-sm flex justify-start items-center">
        <p class="text-h5" style="margin: 0">Описание заказа</p>

        <img
          class="q-mx-sm"
          src="src/assets/icons/done/done-purple.svg"
          alt="done"
        />
        <p class="text-content-component">Мне нужна консультация</p>
      </div>

      <p class="text-content-component">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quam
        deserunt atque molestiae sed tempore saepe obcaecati cumque consequuntur
        mollitia consequatur officia, autem placeat, dolorum aliquid, natus quo
        qui? Numquam illo voluptate nostrum dignissimos accusantium tenetur,
        dolor blanditiis harum dolorem, quibusdam provident, veritatis deleniti.
        Veniam assumenda officia tenetur harum odit!
      </p>
    </div>

    <div class="q-mt-lg">
      <p class="q-mt-sm q-mb-sm text-h5">Файлы и документы</p>

      <p>Какие-то файлы и документы</p>
    </div>

    <div class="q-mt-lg">
      <p class="q-mt-sm q-mb-sm text-h5">Желаемая стоимость</p>

      <p class="text-content-component">от 100 000 ₽ до 150 000 ₽</p>
    </div>

    <div class="q-mt-lg">
      <p class="q-mt-sm q-mb-sm text-h5">Желаемый срок готовности</p>

      <p class="text-content-component">{{ dateOrderResponse }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CButton from "./ClubButton.vue";

const colorStatus = ref("#9236DA");
const dateOrderResponse = ref("01.01.2023");
</script>

<style scoped lang="scss">
.wrapper-page-order-info {
  max-width: 846px;
  padding-bottom: 171px;
}
.color-type-status {
  width: 12px;
  height: 12px;
  border-radius: 25px;
}
.text-from-order-info {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
}
.block-control-response {
  border: 1px solid #4f1e96;
  box-shadow: 0px 38px 15px rgba(0, 0, 0, 0.01),
    0px 21px 13px rgba(0, 0, 0, 0.03), 0px 10px 10px rgba(0, 0, 0, 0.04),
    0px 2px 5px rgba(0, 0, 0, 0.05), 0px 0px 0px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  min-height: 289px;
}
.image-block-control-response {
  min-width: 108px;
  height: 108px;
  background: #581c87;
  border-radius: 100px;
}
.content-block-control-response {
  max-width: 612px;
}
.text-content-component {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  margin: 0;
  color: #000000;
}
</style>
