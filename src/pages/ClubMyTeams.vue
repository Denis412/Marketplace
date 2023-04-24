<template>
  <q-page class="c-pa-32">
    <h3 class="text-h3">
      Мои команды
    </h3>
    <nav>
      <q-list class="row justify-between c-mt-24">
        <q-item class="col-8">
          <q-item-section v-for="(btn, index) in  options " :key="index">
            <c-button
            class="text-body1 btn-text"
            :label="btn"
            :flat="true"
            :rippleColor="'violet-6'"
            />
          </q-item-section>
        </q-item>

        <q-item class="col-3">
          <c-button
          class="text-body1"
          :label="'Создать команду'"
          :outline="true"
          />
        </q-item>
      </q-list>
    </nav>
    <section class="row">
      <c-my-team
      :team="team"
      v-for="team in teams"
      :key="team.id"/>
    </section>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import CButton from "src/components/ClubButton.vue";
import CMyTeam from "src/components/ClubMyTeam.vue";

const options = ref([
  "Активные",
  "Входящие заявки",
  "Исходящие заявки",
  "Архив"
])

const teams = ref([
  {
    id: 1,
    img: "",
    title: "Dream Team",
    content: "Наша команда делает сервис, где человек смог бы следить за своим развитием в каждой из сфер жизни. Мы ждем иммено тебя!"
  }
])
</script>

<style lang="scss" scoped>
.btn-text {
  width: auto;

  &:hover {
    background: #EEE5F4
  }
}

.q-item {
  padding: 8px 0;
}
</style>
