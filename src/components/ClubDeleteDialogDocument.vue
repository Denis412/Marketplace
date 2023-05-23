<template>
  <q-dialog>
    <q-card>
      <q-card-section>
        <div class="text-h6">Удаление файла</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Вы уверены, что хотите удалить этот файл? Отменить это действие будет
        невозможно
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Да" @click="deleteDocument" />
        <q-btn label="Нет" @click="showDialog = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { filesApi } from "src/sdk/files/file";
import EventBus from "../sdk/files/eventBus";

let showDialog = ref(true);

const props = defineProps({
  prop_doc_id: String,
  prop_page_id: String,
});

const deleteDocument = () => {
  filesApi.deleteDoc(props.prop_doc_id, props.prop_page_id);
  showDialog = false;
};
</script>

<style lang="scss" scoped></style>
