<template>
  <section class="section-margin">
    <q-card class="rounded-borders-12 card">
      <q-card-section horizontal class="flex justify-between">
        <q-card-section>
          <div class="text-h4 q-mb-xl">Контакты</div>

          <club-contacts-section
            title="Режим работы"
            :text-content="[
              'Понедельник - пятница: c 09:00 до 18:00',
              'Суббота и воскресенье выходной',
            ]"
          />

          <club-contacts-section
            title="Адрес"
            image-url="src/assets/images/Map.svg"
            text-content="ул. Ростовская набережная д.5,"
            row
          />

          <club-contacts-section
            title="Телефон"
            image-url="src/assets/images/Phone.svg"
            text-content="+7 (999) 333-33-07"
            row
          />

          <club-contacts-section
            title="Эл. почта"
            image-url="src/assets/images/Email.svg"
            text-content="Club@1T.ru"
            row
          />
        </q-card-section>

        <q-card-section>
          <club-write-to-us-form />
        </q-card-section>
      </q-card-section>
    </q-card>
  </section>
</template>

<script setup>
import ClubContactsSection from "./ClubContactsSection.vue";
import ClubWriteToUsForm from "src/components/ClubWriteToUsForm.vue";
</script>

<style scoped lang="scss">
.card {
  padding: 32px 95px;
  background-color: #260f4a;

  margin-bottom: 66px;
}
</style>
