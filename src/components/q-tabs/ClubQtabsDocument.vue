<template>
  <q-tabs
    indicator-color="transparent"
    v-for="(doc, index) in DOCUMENT"
    :key="doc.id"
    align="left"
  >
    <q-route-tab
      :to="{
        name: 'Document',
        params: { id: `${index}` },
      }"
    >
      <div class="item_doc">
        <span>{{ doc.name.slice(0, -5) }}</span>
        <span clickable>⋮</span>
        <q-menu class="popup" anchor="bottom right" self="top left">
          <q-item class="popup-component" clickable>
            <q-img
              class="popup-png"
              src="/src/assets/icons/doc_popup/link.png"
            />
            <q-item-section>Открыть</q-item-section>
          </q-item>

          <q-item class="popup-component" clickable>
            <q-img
              class="popup-png"
              src="/src/assets/icons/doc_popup/file.png"
            />
            <q-item-section>Дублировать</q-item-section>
          </q-item>

          <q-item class="popup-component" clickable>
            <q-img
              class="popup-png2"
              src="/src/assets/icons/doc_popup/trash.png"
            />
            <q-item-section @click="filesApi.deleteDocument(doc.id)"
              >Удалить</q-item-section
            >
          </q-item>

          <q-item class="popup-component" clickable>
            <q-img
              class="popup-png"
              src="/src/assets/icons/doc_popup/lock.png"
            />
            <q-item-section>Права доступа</q-item-section>
          </q-item>

          <q-item class="popup-component" clickable>
            <q-img
              class="popup-png"
              src="/src/assets/icons/doc_popup/pen.png"
            />
            <q-item-section>Переименовать</q-item-section>
            <q-popup-edit
              v-model="doc.name"
              :validate="(val) => val.length < 150"
              v-slot="scope"
            >
              <q-input
                v-model="scope.value"
                :model-value="scope.value"
                hint="Введите имя документа"
                :rules="[
                  (val) => scope.validate(val) || 'Слишком длинное название',
                ]"
              >
                <template v-slot:after>
                  <q-btn
                    flat
                    dense
                    color="negative"
                    icon="cancel"
                    @click.stop.prevent="scope.cancel"
                  />

                  <q-btn
                    flat
                    dense
                    color="positive"
                    icon="check_circle"
                    @click.stop.prevent="filesApi.updateFile(scope.value, doc)"
                    :disable="
                      scope.validate(scope.value) === false ||
                      scope.initialValue === scope.value
                    "
                  />
                  =========
                  <q-btn
                    flat
                    dense
                    color="positive"
                    icon="check_circle"
                    @click.stop.prevent="
                      filesApi.renameDocument(scope.value, doc)
                    "
                    :disable="
                      scope.validate(scope.value) === false ||
                      scope.initialValue === scope.value
                    "
                  />
                </template>
              </q-input>
            </q-popup-edit>
          </q-item>
        </q-menu>
      </div>
    </q-route-tab>
  </q-tabs>
</template>

<script setup>
import { defineComponent, ref, computed, onMounted, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { provideApolloClient } from "@vue/apollo-composable";
import { useMutation } from "@vue/apollo-composable";
import { useQuasar } from "quasar";
import { useDocumentStore } from "src/stores/document";

const storeDocument = useDocumentStore();
const DOCUMENT = computed(() => storeDocument.GET_DOCUMENTS);

const deleteDocument = () => {
  console.log("deleteDocument");
};

const updateDocument = () => {
  console.log("updateDocument");
};

watch(DOCUMENT, () => {
  console.log(DOCUMENT.value);
});
</script>

<style scoped lang="scss">
.q-tab__content {
  width: 100%;
}

.item_doc {
  width: 100%;
  display: flex;
  justify-content: space-between;
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
  padding: 8px 0px 20px;
  gap: 16px;

  position: relative;
  width: 290px;
  height: 291px;

  background: #ffffff;

  border: 1px solid #bbbbbb;
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
</style>
