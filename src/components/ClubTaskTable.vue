<template>
  <h3 class="text-h3 q-ma-xl">Мои задачи</h3>
  <q-table class="q-mx-lg no-shadow flat" :rows="tasks" :columns="columns" :pagination="pagination" :pagination-labels="{
      rowsPerPage: 'Строк на странице',
      rowsPerPageAll: 'Все',
    }" :rows-per-page-options="[5, 10, 20]">
    <!-- Пример -->

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td>{{ props.row.email.email }}</q-td>
        <q-td>{{ props.row.fullname.first_name }}</q-td>
        <q-td :class="props.row.property5 == '1700970386717883161'
          ? 'assigned'
          : props.row.property5 == '967659251654331262'
            ? 'accomplished'
            : 'completed'
          ">
          {{
            (function () {
              if (props.row.taskStatus == "8407796538990824904") {
                return "Назначена";
              } else if (props.row.taskStatus == "7045273205012284690")
                return "Выполнена";
              else if (props.row.taskStatus == "2406017079472962662")
                return "Завершена";
            })()
          }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup>
import { Quasar } from "quasar";
import quasarIconSet from "quasar/icon-set/svg-material-icons";
import { taskResult } from "src/sdk/tasks";
import { ref } from "vue"; // импортируем набор иконок Quasar

const tasks = ref([]);
// Добавляем свою иконку в набор иконок Quasar
quasarIconSet.table.mySortIcon = "прив";

Quasar.iconSet.set(quasarIconSet); // устанавливаем набор иконок Quasar для Quasar
quasarIconSet.table.arrowUp = "img:..\\icons\\SortableArrow.svg"; // используем свою иконку как иконку стрелки сортировки

taskResult((queryResult) => {
  tasks.value = queryResult.data.paginate_task.data;
  console.log(queryResult.data.paginate_task.data);
});


const columns = [
  {
    name: "Задача",
    align: "left",
    label: "Задача",
    field: "Задача",
    headerStyle:
      "font-family: 'Play'; font-weight: 400; font-size: 20px; padding-right: 260px;",
  },
  {
    name: "Проект",
    label: "Проект",
    align: "right",
    field: "Проект",
    headerStyle:
      "font-family: 'Play', Regular; font-weight: 400; font-size: 20px; padding-right: 30px;",
  },
  {
    name: "Дата начала",
    label: "Дата начала",
    align: "center",
    field: "Дата начала",
    headerStyle:
      "font-family: 'Play', Regular; font-weight: 400; font-size: 20px;",
  },
  {
    name: "Дата окончания",
    label: "Дата окончания",
    field: "Дата окончания",
    headerStyle:
      "font-family: 'Play', Regular; font-weight: 400; font-size: 20px;",
  },
  {
    name: "Статус",
    label: "Статус",
    field: "Статус",
    headerStyle: "font-family: 'Play'; font-weight: 400; font-size: 20px;",
  },
];
</script>

<style scoped></style>
