<template>
  <q-page class="c-pa-32">
    <h3 class="text-h3">
      Все команды
    </h3>

    <section class="row c-mt-24">
      <q-input
      v-model="searchValue"
      filled
      type="search"
      hint="Search"
      @keyup.enter="search()"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

       <q-select
       class="offset-1"
       filled
       v-model="filterValue"
       :options="['Готовы к заказам', 'Не готовы к заказам']"
       @update:model-value="filter()"
       />
    </section>

    <section class="row justify-between">
      <c-team
      :team="team"
      v-for=" team  in  teams "
      :key="team.id"/>

      <div v-show="!teams.length">
        Ничего не найдено
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import CTeam from "src/components/ClubTeamCard.vue";

const teams = ref([
  {
    id: 1,
    img: "",
    title: "Цыплята",
    content: "Наша команда делает сервис, где человек смог бы следить за своим развитием в каждой из сфер жизни. Мы ждем иммено тебя!",
    ready: true,
  },
  {
    id: 2,
    img: "",
    title: "Цирк",
    content: "Наша команда делает сервис, где человек смог бы следить за своим развитием в каждой из сфер жизни. Мы ждем иммено тебя!",
    ready: true,
  },
  {
    id: 3,
    img: "",
    title: "Dream Team",
    content: "Наша команда делает сервис, где человек смог бы следить за своим развитием в каждой из сфер жизни. Мы ждем иммено тебя!",
    ready: false,
  }

])

//для эмуляции работы функций с бд, в последствии удалить
const teamsBuffer = ref([
  {
    id: 1,
    img: "",
    title: "Цыплята",
    content: "Наша команда делает сервис, где человек смог бы следить за своим развитием в каждой из сфер жизни. Мы ждем иммено тебя!",
    ready: true,
  },
  {
    id: 2,
    img: "",
    title: "Цирк",
    content: "Наша команда делает сервис, где человек смог бы следить за своим развитием в каждой из сфер жизни. Мы ждем иммено тебя!",
    ready: true,
  },
  {
    id: 3,
    img: "",
    title: "Dream Team",
    content: "Наша команда делает сервис, где человек смог бы следить за своим развитием в каждой из сфер жизни. Мы ждем иммено тебя!",
    ready: false,
  }
])

const searchValue = ref("");
const filterValue = ref("Фильтрация");


//всю фильтрацию перенести на сервер!!!!!
const search = () => {
  if (searchValue.value.length) {
    teams.value = teams.value.filter((e) =>
      e.title.toLowerCase().includes(searchValue.value.toLowerCase())
    );
  }
  else
    teams.value = teamsBuffer.value;
}

const filter = () => {
  teams.value = teamsBuffer.value;
  teams.value = filterValue.value === "Готовы к заказам" ? teams.value.filter((e) => e.ready === true) : teams.value.filter((e) => e.ready === false);
}
</script>

<style lang="scss" scoped></style>
