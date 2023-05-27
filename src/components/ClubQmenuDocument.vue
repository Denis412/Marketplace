<template>
  <q-list class="popup">
    <q-item @click="openDoc" class="popup-component" clickable>
      <q-img class="popup-png" src="/src/assets/icons/doc_popup/link.png" />
      <q-item-section>Открыть</q-item-section>
    </q-item>
    <!-- @click="
        filesApi.createHtmlFile(
          storeFile.currentEditorValue,
          storeFile.currentTitleDoc
        )
      " -->
    <q-item @click="duplicateDocument()" class="popup-component" clickable>
      <q-img class="popup-png" src="/src/assets/icons/doc_popup/file.png" />
      <q-item-section>Дублировать</q-item-section>
    </q-item>

    <q-item class="popup-component" clickable>
      <q-img class="popup-png2" src="/src/assets/icons/doc_popup/trash.png" />
      <q-item-section @click="showDialog = true">Удалить </q-item-section>
    </q-item>

    <c-delete-dialog-document :prop_doc_id="props.prop_doc.id" v-model="showDialog" />

    <q-item class="popup-component" clickable>
      <q-img class="popup-png" src="/src/assets/icons/doc_popup/lock.png" />
      <q-item-section>Права доступа</q-item-section>
    </q-item>

    <c-rename-item-document :prop_doc="prop_doc" />
  </q-list>
</template>

<script setup>
import { ref, computed } from "vue";
import { filesApi } from "src/sdk/files/file";
import CDeleteDialogDocument from "./ClubDeleteDialogDocument.vue";
import CRenameItemDocument from "./ClubRenameItemDocument.vue";
import { useRouter } from "vue-router";
import { useFileStore } from "src/stores/file";

const storeFile = useFileStore();

const FILES = computed(() => storeFile.GET_FILES);

const router = useRouter();

const props = defineProps({
  prop_doc: Object,
  prop_clicked_index_doc: Number,
});

const duplicateDocument = async () => {
  let document = FILES.value[props.prop_clicked_index_doc];
  let documentBody = await filesApi.getFileHtmlByUrl(
    document.path,
    document.id,
    document.name,
    document.extension
  );
  filesApi.createHtmlFile(documentBody, document.name.slice(0, -5));
};

const openDoc = () => {
  router.push({
    name: "Document",
    params: { id: props.prop_clicked_index_doc },
  });
};

let showDialog = ref(false);
</script>

<style lang="scss" scoped>
.q-tab__content {
  width: 100%;
}
.q-tabs__content {
  width: 100% !important;
  text-align: left !important;
}
.link {
  color: white;
  text-decoration: none;
}
.popup {
  align-items: center;
  overflow: hidden;
  position: relative;
  box-shadow: 0px 0px 45px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
}
.popup-component {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 29px 10px 20px;
  gap: 18px;
  width: 290px;
  height: 40px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #666666;
}
.popup-png {
  width: 16px;
  height: 14px;
}
.popup-png2 {
  width: 14px;
  height: 16px;
}
.doc_wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
