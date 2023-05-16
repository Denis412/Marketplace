<template>
  <h3 class="text-h3 q-ma-xl">Мои задачи</h3>
  <q-table
    class="q-mx-lg no-shadow flat"
    :rows="tasks"
    :columns="data.columns"
    :rows-per-page-options="[5, 10, 20]"
    dense
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td
          v-if="props.row.first"
          @click="addNewTask"
          class="items-centered addNewTask"
        >
          <q-icon name="add" align="left" />
          <span class="q-pl-sm">Новая задача</span>
        </q-td>
        <q-td class="text-subtitle3" v-else>{{ props.row.name }}</q-td>
        <q-td class="text-subtitle3" v-if="!props.row.first">-</q-td>
        <q-td v-else></q-td>
        <q-td class="text-subtitle3">{{ props.row.dateStart?.date }}</q-td>
        <q-td class="text-subtitle3">{{ props.row.dateEnd?.date }}</q-td>
        <q-td>
          <div
            :class="
              props.row.taskStatus == '8407796538990824904'
                ? 'assigned'
                : props.row.taskStatus == '7045273205012284690'
                ? 'accomplished'
                : 'completed'
            "
          >
            {{
              (function () {
                if (props.row.taskStatus == "8407796538990824904") {
                  return "надо сделать";
                } else if (props.row.taskStatus == "7045273205012284690")
                  return "в процессе";
                else if (props.row.taskStatus == "2406017079472962662")
                  return "выполнено";
              })()
            }}
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup>
import { useQuery } from "@vue/apollo-composable";
import { getTasks } from "src/graphql/tasks/queries";
import { data } from "src/utils/taskData";
import { ref } from "vue";
import { Quasar } from "quasar";
import quasarIconSet from "quasar/icon-set/svg-material-icons";

const { onResult: taskResult, refetch: taskRefetch } = useQuery(getTasks);

const tasks = ref([
  {
    first: true,
  },
]);

// Добавляем свою иконку в набор иконок Quasar
quasarIconSet.table.mySortIcon = "прив";

Quasar.iconSet.set(quasarIconSet); // устанавливаем набор иконок Quasar для Quasar
quasarIconSet.table.arrowUp = "img:..\\icons\\SortableArrow.svg"; // используем свою иконку как иконку стрелки сортировки

taskResult((queryResult) => {
  queryResult.data.paginate_task.data.forEach((element) => {
    tasks.value.push(element);
  });
});

const addNewTask = () => {
  console.log("add");
};
</script>

<style scoped>
.q-table tbody td {
  font-size: 16px;
}

.addNewTask:hover {
  cursor: pointer;
}

.assigned {
  background: #d8b4fe;
  border-radius: 12px;
  text-align: center;
  width: 139px;
  height: 20px;
}
.accomplished {
  background: #7dd3fc;
  border-radius: 12px;
  text-align: center;
  width: 139px;
  height: 20px;
}
.completed {
  background: #86efac;
  border-radius: 12px;
  text-align: center;
  width: 139px;
  height: 20px;
}
</style>
