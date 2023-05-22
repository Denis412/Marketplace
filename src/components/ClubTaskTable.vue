<template>
  <div>
    <h3 class="text-h3 q-ma-xl col">Мои задачи</h3>
    <q-card class="no-shadow">
      <q-card-section class="row flat">
        <div class="col-12 border-bottom">
          <div class="row q-pb-md">
            <div class="col-4 text-subtitle3">Задача</div>
            <div class="col-2 text-subtitle3">Проект</div>
            <div class="col-2 text-subtitle3">Дата начала</div>
            <div class="col-2 text-subtitle3">Дата окончания</div>
            <div class="col-2 text-subtitle3">Статус</div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card
      v-for="row in tasks"
      :key="row.name"
      class="no-shadow q-ma-md bg-color q-pa-lg"
      :class="{ 'my-color': getStatusText(row.taskStatus) === 'надо сделать' }"
    >
      <q-card-section class="row">
        <div class="col-4 text-subtitle3">{{ row.name }}</div>
        <div class="col-2 text-subtitle3">-</div>
        <div class="col-2 text-subtitle3">{{ row.dateStart?.date }}</div>
        <div class="col-2 text-subtitle3">{{ row.dateEnd?.date }}</div>

        <div class="col-2 text-subtitle3">
          <template v-if="getStatusText(row.taskStatus) === 'надо сделать'">
            <q-icon name="error" class="text-red" />

            <span class="my-text-blue">
              {{ getStatusText(row.taskStatus) }}
            </span>
          </template>

          <template v-else-if="getStatusText(row.taskStatus) === 'в процессе'">
            <q-icon name="autorenew" class="text-orange" />
            <span class="text-orange">{{ getStatusText(row.taskStatus) }}</span>
          </template>

          <template v-else-if="getStatusText(row.taskStatus) === 'выполнено'">
            <q-icon name="check_circle" class="text-green" />
            <span class="text-green">{{ getStatusText(row.taskStatus) }}</span>
          </template>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useQuery } from "@vue/apollo-composable";
import { getTasks } from "src/graphql/tasks/queries";
import { data } from "src/utils/taskData";
import { ref } from "vue";
import { Quasar } from "quasar";
import quasarIconSet from "quasar/icon-set/svg-material-icons";
import { spaceHeader } from "src/utils/spaceHeader";

const { onResult: taskResult, refetch: taskRefetch } = useQuery(
  getTasks,
  {},
  spaceHeader(process.env.MAIN_SPACE_ID)
);

const tasks = ref([]);

const getStatusText = (taskStatus) => {
  if (taskStatus == "8407796538990824904") {
    return "надо сделать";
  } else if (taskStatus == "7045273205012284690") {
    return "в процессе";
  } else if (taskStatus == "2406017079472962662") {
    return "выполнено";
  }
};

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
.my-text-green {
  color: #15803d;
}
.my-text-orange {
  color: #c2410c;
}
.my-text-blue {
  color: #1d4ed8;
}
.my-color {
  background-color: #d7c9e2 !important;
}
.border-bottom {
  border-bottom: 1px solid #9c9c9c !important;
}
.bg-color {
  background-color: #eee8f3;
}

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
