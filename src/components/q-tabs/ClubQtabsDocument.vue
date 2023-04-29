<template>
  <q-tabs
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
        <span>{{ doc.name.slice(0, -5) }}</span>
        <span clickable @click="menuDoc">⋮</span>
        <q-menu class="popup" anchor="bottom right" self="top left">
          <q-item class="popup-component" clickable>
            <q-item-section>Открыть</q-item-section>
          </q-item>
          <q-item class="popup-component" clickable>
            <q-item-section>Дублировать</q-item-section>
          </q-item>
          <q-item class="popup-component" clickable>
            <q-item-section @click="filesApi.deleteDoc(doc.id)"
              >Удалить</q-item-section
            >
          </q-item>
          <q-item class="popup-component" clickable>
            <q-item-section>Права доступа</q-item-section>
          </q-item>
          <q-item class="popup-component" clickable>
            <q-item-section>Переименовать</q-item-section>
            <q-popup-edit
              v-model="doc.name"
              :validate="(val) => val.length > 5"
              v-slot="scope"
            >
              <q-input
                v-model="scope.value"
                :model-value="scope.value"
                hint="Set document name"
                :rules="[
                  (val) => scope.validate(val) || 'More than 5 chars required',
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
import { fileUpdate, fileDelete } from "src/graphql/files/mutations";
import { ApolloClient } from "@apollo/client/core";
import { provideApolloClient } from "@vue/apollo-composable";
import { useMutation } from "@vue/apollo-composable";
import { useQuasar } from "quasar";
import { useFileStore } from "src/stores/file";
import filesApi from "src/sdk/file";

const storeFile = useFileStore();
const FILES = computed(() => storeFile.GET_FILES);

watch(FILES, () => {
  console.log(FILES.value);
});

// const renameDocument = (scope, doc) => {
//   console.log(scope);
//   console.log(doc);
//   console.log();
//   const { mutate } = useMutation(fileUpdate, () => ({
//     variables: {
//       input: {
//         title: scope,
//         path: doc.path,
//         size: doc.size,
//         name: scope,
//         short_link: doc.short_link,
//         extension: doc.extension,
//         disk: doc.disk,
//         hash: doc.hash,
//       },
//       id: doc.id,
//     },
//   }));
//   mutate();
// };

// const deleteDoc = function (id) {
//   const apolloClient = new ApolloClient(getClientOptions());
//   provideApolloClient(apolloClient);
//   const { mutate } = useMutation(fileDelete, () => ({
//     variables: {
//       id: id,
//     },
//   }));
//   mutate();
// };
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
  width: 290px;
  height: 291px;
  padding: 8px 0px 20px;
  gap: 16px;
  border: 1px solid #bbbbbb;
  box-shadow: 0px 0px 45px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
}

.popup-component {
  align-items: center;
  padding: 10px 29px 10px 20px;
  gap: 18px;

  height: 40px;
}
</style>
