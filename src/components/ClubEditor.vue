<template>
  <div class="q-pa-md q-gutter-sm">
    <div class="row q-my-lg">
      <input readonly class="q-py-sm q-pt-sm col-6" :placeholder="path" />
      <input
        readonly
        class="q-py-sm col-6"
        style="direction: rtl"
        :placeholder="'Дата создания: ' + day + ' ' + month + ' ' + year"
      />
      <input
        autocomplete="off"
        class="text-h3 q-mb-sm col-12"
        id="id"
        :placeholder="titleDocument"
      />
    </div>

    <q-editor
      v-model="editor"
      ref="edit"
      flat
      :content-style="{ borderTop: '1px solid grey' }"
      min-height="15rem"
      :content-class="'q-px-xl'"
      :toolbar="toolbar"
    >
      <template v-slot:token>
        <q-btn-dropdown
          dense
          no-caps
          ref="token"
          no-wrap
          unelevated
          label=""
          size="sm"
          dropdown-icon="palette"
        >
          <q-list dense>
            <q-item
              tag="label"
              clickable
              @click="color('backColor', highlight)"
            >
              <q-item-section side>
                <q-icon name="highlight" />
              </q-item-section>

              <q-item-section>
                <q-color
                  v-model="highlight"
                  default-view="palette"
                  no-header
                  no-footer
                  :palette="lightPalette"
                  class="my-picker"
                />
              </q-item-section>
            </q-item>
            <q-item
              tag="label"
              clickable
              @click="color('foreColor', foreColor)"
            >
              <q-item-section side>
                <q-icon name="format_paint" />
              </q-item-section>

              <q-item-section>
                <q-color
                  v-model="foreColor"
                  no-header
                  no-header-tabs
                  no-footer
                  default-view="palette"
                  :palette="textPalette"
                  class="my-picker"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>
    </q-editor>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useFileStore } from "src/stores/file";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import filesApi from "src/sdk/file";

const titleDocument = ref("");

const $q = useQuasar();

const lightPalette = [
  "#ffccccaa",
  "#ffe6ccaa",
  "#ffffccaa",
  "#ccffccaa",
  "#ccffe6aa",
  "#ccffffaa",
  "#cce6ffaa",
  "#ccccffaa",
  "#e6ccffaa",
  "#ffccffaa",
  "#ffffffaa",
  "#00ff00aa",
  "#ff0000aa",
  "#ff8000aa",
  "#00ff80aa",
  "#00ffffaa",
  "#0080ffaa",
  "#0000ffaa",
  "#8000ffaa",
  "#ff00ffaa",
];

const textPalette = [
  "#ff0000",
  "#ff8000",
  "#ffff00",
  "#000000",
  "#00ff80",
  "#00ffff",
  "#0080ff",
  "#0000ff",
  "#8000ff",
  "#ff00ff",
];

const toolbar = [
  ["undo", "redo"],
  [
    {
      label: $q.lang.editor.fontSize,
      fixedIcon: true,
      list: "no-icons",
      options: ["p", "h4", "h5", "h6"],
    },
  ],
  ["token"],
  ["underline", "strike", "bold", "italic"],
  [
    {
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      list: "only-icons",
      options: ["left", "center", "right", "justify"],
    },
    "outdent",
    "indent",
    "ordered",
    "unordered",
  ],
  ["removeFormat", "link", "hr"],
  ["print"],
];

const monthNames = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];

const route = useRoute();
const storeFile = useFileStore();
const id_route = ref(route.params.id);
const date = new Date();
const day = date.getDate();
const month = monthNames[date.getMonth()];
const year = date.getFullYear();
const edit = ref(null);
const path = "Главная/Сайт с каталогом/Без названия"; //Placeholder
const editor = ref("");
const token = ref(null);
const foreColor = ref("#000000");
const highlight = ref("#ffff00aa");
const FILES = computed(() => storeFile.GET_FILES);

const color = (cmd, name) => {
  token._value.hide();
  edit._value.caret.restore();
  edit._value.runCmd(cmd, name);
  edit._value.focus();
};

watch(FILES, () => {
  editor.value = filesApi.getFileHtmlByUrl(
    FILES.value[route.params.id].path,
    FILES.value[route.params.id].id,
    FILES.value[route.params.id].name
  );
  titleDocument.value = FILES.value[route.params.id].name;
});

watch(route, async () => {
  // filesApi.deleteDoc(FILES.value[route.params.id].id);
  // filesApi.createHtmlFile(editor.value, titleDocument.value + ".html");
  if (route.params.id) {
    console.log(11111, FILES.value[route.params.id].id);
    console.log(22222, titleDocument.value + ".html");
    console.log(33333, editor.value);
    titleDocument.value = FILES.value[route.params.id].name.slice(0, -5);
    editor.value = await filesApi.getFileHtmlByUrl(
      FILES.value[route.params.id].path,
      FILES.value[route.params.id].id,
      FILES.value[route.params.id].name
    );
  }
});

onMounted(async () => {
  if (route.params.id) {
    console.log(11111, FILES.value[route.params.id].id);
    console.log(22222, titleDocument.value + ".html");
    console.log(33333, editor.value);
    titleDocument.value = FILES.value[route.params.id].name.slice(0, -5);
    editor.value = await filesApi.getFileHtmlByUrl(
      FILES.value[route.params.id].path,
      FILES.value[route.params.id].id,
      FILES.value[route.params.id].name
    );
  }
});
</script>

<style lang="scss" scoped>
input {
  color: grey;
  outline: none;
  border: none;
}
</style>
