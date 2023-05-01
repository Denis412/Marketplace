<template>
    <section>
        <header class="c-mb-32">
            <h3 class="text-h3">Все команды</h3>
        </header>

        <div class="row no-wrap justify-between qwerty c-mb-32">
          <c-input class="col-5"/>  
          <q-select outlined :options="filterOptions" label="Фильтрация" class="col-3"/>
        </div>
         
    </section>
</template>

<script setup>
import { ref } from "vue"
import CInput from "./ClubInput.vue";

const filterOptions =  ref([
        'Готовы к заказам', 'Не готовы к заказам'
      ])

</script>

<style scoped lang="scss">
.qwerty{
    width: 50%;
}

</style>   
