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
        <q-btn
          label="Да"
          @click="filesApi.deleteDoc(prop_doc_id), (showDialog = false)"
        />
        <q-btn label="Нет" @click="showDialog = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { filesApi } from "src/sdk/files/file";

const props = defineProps({
  prop_doc_id: String,
});
</script>

<style lang="scss" scoped></style>
