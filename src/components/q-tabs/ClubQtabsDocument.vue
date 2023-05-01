<template>
  <q-tabs
    class="row no-wrap q-pl-lg drawer-item"
    indicator-color="transparent"
    v-for="(doc, index) in FILES"
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
        <img
          :src="`/src/assets/icons/file/file-grey.svg`"
          alt=""
          class="q-pr-md"
        />
        <div class="item_doc">
          {{ doc.name.length > 10 ? doc.name.slice(0, 10) + "..." : doc.name }}
        </div>

        <div class="menu-wrapper" clickable>
          ⋮
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
              <q-item-section @click="showDialog = true"
                >Удалить</q-item-section
              >
            </q-item>

            <q-dialog v-model="showDialog">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Удаление файла</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  Вы уверены, что хотите удалить этот файл? Отменить это
                  действие будет невозможно
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn
                    label="Да"
                    @click="filesApi.deleteDoc(doc.id), (showDialog = false)"
                  />
                  <q-btn label="Нет" @click="showDialog = false" />
                </q-card-actions>
              </q-card>
            </q-dialog>

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
                      @click.stop.prevent="
                        filesApi.updateFile(scope.value, doc)
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
import { useFileStore } from "src/stores/file";
import filesApi from "src/sdk/file";

const storeFile = useFileStore();
const FILES = computed(() => storeFile.GET_FILES);

let showDialog = ref(false);

watch(FILES, () => {
  console.log(FILES.value);
});
</script>

<style scoped lang="scss">
.q-tab__content {
  width: 100%;
}
.menu-wrapper {
  width: 40px;
}
.item_doc {
  width: 190px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
.doc_wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
