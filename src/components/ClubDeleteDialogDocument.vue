<template>
  <q-dialog>
    <q-card class="delete-popup">
      <q-card-section class="name-delete-popup">
        <div>Удаление файла</div>
      </q-card-section>

      <q-card-section class="text-delete-popup">
        Вы уверены, что хотите удалить этот файл? Отменить это действие будет
        невозможно
      </q-card-section>

      <q-card-actions class="actions-delete-popup">
        <q-btn
          class="yes-actions-delete-popup"
          label="Удалить"
          v-close-popup
          @click="deleteDocument"
        />
        <q-item class="no-actions-delete-popup" v-close-popup>Отмена</q-item>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { filesFunc } from "src/use/fileFunctions";

const props = defineProps({
  prop_stat: Object,
  tree: Object,
  prop_doc_id: String,
  prop_page_id: String,
});

const deleteDocument = () => {
  props.tree.remove(props.prop_stat);
  filesApi.deleteDoc(props.prop_doc_id, props.prop_page_id);
};
</script>

<style lang="scss" scoped>
.delete-popup {
  width: 463px;
  height: 210px;

  border: 1px solid #bbbbbb;
  box-shadow: 0px 0px 45px rgba(0, 0, 0, 0.06);
  border-radius: 16px;
}

.name-delete-popup {
  width: 214px;
  height: 29px;
  margin-top: 15px;
  margin-left: 24px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;

  color: #282828;
}

.text-delete-popup {
  width: 407px;
  height: 30px;
  margin-top: 20px;
  margin-left: 24px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 17px;

  color: #444444;
}

.actions-delete-popup {
  margin-top: 41px;
  margin-left: 228px;
}

.yes-actions-delete-popup {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 16px;

  gap: 16px;
  width: 95px;
  height: 36px;

  color: white;
  background: linear-gradient(101.75deg, #4c1d95 4.25%, #881d95 96.95%);
  border-radius: 4px;
}

.no-actions-delete-popup {
  width: 56px;
  height: 15px;
  margin-left: 13px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 540;
  cursor: pointer;

  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
}
</style>
