<template>
    <q-page class="c-pa-32">
        <c-search-team-page-header class="club-mb-32"/>
        <c-search-team-page-list :teams="teams"/>
    </q-page>
</template>

<script setup>
import CSearchTeamPageHeader from "src/components/ClubSearchTeamPageHeader.vue";
import CSearchTeamPageList from "src/components/ClubSearchTeamPageList.vue";
import { ref } from "vue"

const teams = ref([
    {
        name:"Котики",
        description:"Давно решил, что не влюблюсь я больше никогда. И тут, явилась ты, мой котик. котик. котик... котик... Был не зависим, а сейчас так скучно без тебя, Ты сердце разрываешь, с моей душой играешь...…",
    },
    {
        name:"Ёжики",
        description:"Ёжик колючий, Хмурый, как туча. Ну и иголки у тебя! Ёжик, тебя я не понимаю. Смотришь ты волком на меня.",
    },
    {
        name:"Черепашки",
        description:"Мы не жалкие букашки, Супер-ниндзя-черепашки, Панцирь носим, как рубашки, Юные таланты. Да-да! Наш отряд бойцов всегда един! Вредных, нерадивых победим! Нас атаки не страшат, Злых уложим всех подряд!",
    },
    {
        name:"Зайки",
        description:"Зайка моя! Я твой зайчик. Ручка моя! Я твой пальчик. Рыбка моя! Я твой глазик. Банька моя! Я твой тазик. Солнце мое! Я твой лучик. Дверца моя! Я твой ключик. Ты стебелек, я твой пестик. Мы навсегда с тобой вместе! Зайка моя!",
    }
])
</script>

<style scoped lang="scss"></style>