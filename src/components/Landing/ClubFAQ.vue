<template>
  <section class="text-center container">
    <h3 class="text-h3 text-left title">Часто задаваемые вопросы</h3>
    <q-expansion-item
      class="text-subtitle5 text-left"
      label="Какие бизнес-задачи поможет решить 1Т клуб?"
    >
      <q-card class="text-body2">
        <q-card-section>
          <ul>
            <li>Подбор IT-специалистов и укомплектованных IT-команд</li>
            <li>Обмен знаниями и опытом с резидентами 1Т Клуба</li>
            <li>Углубление социальных связей через общение на онлайн и офлайн мероприятиях</li>
            <li>Поддержка и консультация от экспертов в IT сфере</li>
          </ul>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-expansion-item
      class="text-subtitle5 text-left"
      label="Могу ли я принять участие в 1Т Клубе, если еще не предприниматель, а только начинаю свое дело?"
    >
      <q-card class="text-body2">
        <q-card-section>
          Да, вы можете принять участие в 1T Клубе, даже если вы только начинаете свой бизнес. 1T
          Клуб — это сообщество предпринимателей, новаторов и владельцев бизнеса, которые стремятся
          к успеху в своих областях.
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-expansion-item
      class="text-subtitle5 text-left"
      label="Что будет, если команды 1Т Клуба не справятся с проектом?"
    >
      <q-card class="text-body2">
        <q-card-section>
          В случае возникновения недопонимания или неудовлетворенности качеством IT-продукта
          заказчиком подключается платформа 1Т Клуба для урегулирования споров. Решением может стать
          возврат денег за услугу (частичный или полный) либо гарантия выполнения услуги экспертами
          1Т клуба.
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-expansion-item
      class="text-subtitle5 text-left"
      label="Какие требования к резидентам 1Т Клуба?"
    >
      <q-card class="text-body2">
        <q-card-section>
          Вы можете вступить в 1Т Клуб, если вы владелец бизнеса или фаундер (основатель)
          IT-стартапа, технологической компании или социально значимого проекта
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </section>
</template>
<script setup></script>
<style scoped lang="scss">
.title {
  margin-bottom: 50px;
}
.container {
  margin-bottom: 160px;
}
.q-expansion-item {
  border-bottom: 2px solid #9043b4;
  &q-item {
    padding-left: 0;
  }
}
.q-card {
  background-color: transparent;
}
</style>
