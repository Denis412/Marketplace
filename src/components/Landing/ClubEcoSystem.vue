<template>
    <section class="container section-margin">
        <h3 class="text-h3 q-px-lg text-center">1Т Клуб — это масштабная экосистема для развития начинающих специалистов в сфере IT</h3>
        <div class="row my-row q-my-xl justify-center">
            <c-eco-system-item v-for="(item,index) in ecoSystem" :name="item.name" :key="index"/>
        </div>
    </section>
</template>

<script setup>
import CEcoSystemItem from './ClubEcoSystemItem.vue'
import { ref } from 'vue'

const ecoSystem = ref([
    {
        name: 'Сообщества'
    },
    {
        name: 'Проекты'
    },
    {
        name: 'Команды'
    },
    {
        name: 'Инструменты'
    },
    {
        name: 'Акселератор'
    },
    {
        name: 'Менторство'
    },
    {
        name: 'Консультация'
    },
    {
        name: 'Привелигии'
    },
    {
        name: 'Мероприятия'
    },

])

</script>

<style scoped>
.my-row{
    padding-left: 80px;
    padding-right: 80px;
}
</style>