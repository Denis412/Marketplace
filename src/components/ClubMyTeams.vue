<template>
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
          @click="screenChoose(index + 1)"
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

  <section v-show="screen == 1" class="row justify-between">
    <c-team
    :team="team"
    v-for="team in teams"
    :key="team.id"/>
  </section>

  <section v-show="screen == 2">
    Входящие заявки
  </section>

  <section v-show="screen == 3">
    Исходящие заявки
  </section>

  <section v-show="screen == 4">
    Архив
  </section>
</template>

<script setup>
import { ref } from "vue";
import CButton from "src/components/ClubButton.vue";
import CTeam from "src/components/ClubTeamCard.vue";

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

const screen = ref(1);

const screenChoose = (screenIndex) => {
  screen.value = screenIndex;
}
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
