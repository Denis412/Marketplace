<template>
  <h3 class="text-h3 q-ma-xl">Создание команды</h3>
  <q-table class="q-mx-lg no-shadow flat" :rows="pokapusto" :columns="columns" :pagination="pagination"
    :pagination-labels="{
        rowsPerPage: 'Строк на странице',
        rowsPerPageAll: 'Все',
      }" :rows-per-page-options="[5, 10, 20]">

    <!-- Пример -->

    <!-- <template v-slot:body="props">
      <q-tr :props="props">
        <q-td>{{ props.row.email.email }}</q-td>
        <q-td>{{ props.row.fullname.first_name }}</q-td>
        <q-td
          :class="
            props.row.property5 == '1700970386717883161'
              ? 'assigned'
              : props.row.property5 == '967659251654331262'
              ? 'accomplished'
              : 'completed'
          "
        >
          {{
            (function () {
              if (props.row.property5 == "1700970386717883161") {
                return "Назначена";
              } else if (props.row.property5 == "967659251654331262")
                return "Выполнена";
              else if (props.row.property5 == "1383309069201480491")
                return "Завершена";
            })()
          }}
        </q-td>
      </q-tr>
    </template> -->
  </q-table>
</template>

<script setup>
const columns = [
  {
    name: "Задача",
    align: "left",
    label: "Задача",
    field: "Задача",
    headerStyle:
      "font-family: 'Play'; font-weight: 400; font-size: 20px",

  },
  {
    name: "Проект",
    align: "left",
    label: "Проект",
    field: "Проект",
    headerStyle:
      "font-family: 'Play', Regular; font-weight: 400; font-size: 20px;",
    sortable: true
  },
  {
    name: "Дата начала",
    align: "left",
    label: "Дата начала",
    field: "Дата начала",
    headerStyle:
      "font-family: 'Play', Regular; font-weight: 400; font-size: 20px;",
    sortable: true
  },
  {
    name: "Дата окончания",
    align: "left",
    label: "Дата окончания",
    field: "Дата окончания",
    headerStyle:
      "font-family: 'Play', Regular; font-weight: 400; font-size: 20px;",
    sortable: true
  },
  {
    name: "Статус",
    align: "left",
    label: "Статус",
    field: "Статус",
    headerStyle: "font-family: 'Play'; font-weight: 400; font-size: 20px;",
    sortable: true
  },
];
</script>

<style scoped>
.q-table th {
  font-family: "Comic Sans MS", cursive, sans-serif;
}
</style>
