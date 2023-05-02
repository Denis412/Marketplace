<template>
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
          <q-item tag="label" clickable @click="color('backColor', highlight)">
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
          <q-item tag="label" clickable @click="color('foreColor', foreColor)">
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
</template>

<script setup>
import { computed, ref, watch, onMounted, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { useFileStore } from "src/stores/file";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import filesApi from "src/sdk/file";

const titleDocument = ref("");

const emit = defineEmits("update:titleDocument");

watch(titleDocument, () => {
  emit("update:titleDocument", titleDocument.value);
});

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

const route = useRoute();
const router = useRouter();
const storeFile = useFileStore();
const id_route = ref(route.params.id);
const edit = ref(null);
const editor = ref("");
const token = ref(null);
const foreColor = ref("#000000");
const highlight = ref("#ffff00aa");
const FILES = computed(() => storeFile.GET_FILES);
const previousRout = ref("d");

const color = (cmd, name) => {
  token._value.hide();
  edit._value.caret.restore();
  edit._value.runCmd(cmd, name);
  edit._value.focus();
};

watch(route, async () => {
  if (!previousRout.value && editor.value) {
    console.log(1);
    filesApi.createHtmlFile(
      editor.value,
      titleDocument.value ? titleDocument.value : "Unknown"
    );
  }

  if (route.params.id && FILES.value.length) {
    titleDocument.value = FILES.value[route.params.id].name.slice(0, -5);
    editor.value = await filesApi.getFileHtmlByUrl(
      FILES.value[route.params.id].path,
      FILES.value[route.params.id].id,
      FILES.value[route.params.id].name
    );
  } else {
    editor.value = "";
    titleDocument.value = "";
  }

  previousRout.value = route.params.id;
});

onMounted(async () => {
  if (route.params.id && FILES.value.length) {
    titleDocument.value = FILES.value[route.params.id].name.slice(0, -5);

    editor.value = await filesApi.getFileHtmlByUrl(
      FILES.value[route.params.id].path,
      FILES.value[route.params.id].id,
      FILES.value[route.params.id].name
    );
  }
});

onBeforeMount(() => {
  editor.value = "";
  titleDocument.value = "";
  router.push("/club/addDocument");
});
</script>

<style lang="scss" scoped></style>
