<template>
  <q-editor
    v-model="editor"
    ref="edit"
    flat
    :content-style="{ borderTop: '1px solid grey' }"
    min-height="15rem"
    :content-class="'q-px-xl'"
    :toolbar="data.toolbar"
    :definitions="data.definitions"
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
        no-icon-animation
        dropdown-icon="text_format"
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
                :palette="data.lightPalette"
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
                :palette="data.textPalette"
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
import { useFileStore } from "src/stores/file";
import { useRoute, useRouter } from "vue-router";
import { filesApi } from "src/sdk/files/file";
import { data } from "src/utils/documentData";

const route = useRoute();
const router = useRouter();
const storeFile = useFileStore();
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
    filesApi.createHtmlFile(
      editor.value,
      storeFile.currentTitleDoc ? storeFile.currentTitleDoc : "Unknown"
    );
  }

  if (route.params.id && FILES.value.length) {
    storeFile.SET_CURRENT_TITLE_DOC(
      FILES.value[route.params.id].name.slice(0, -5)
    );
    editor.value = await filesApi.getFileHtmlByUrl(
      FILES.value[route.params.id].path,
      FILES.value[route.params.id].id,
      FILES.value[route.params.id].name,
      FILES.value[route.params.id].extension
    );

    storeFile.SET_CURRENT_EDITOR_VALUE(editor.value);
  } else {
    editor.value = "";
    storeFile.SET_CURRENT_TITLE_DOC("");
  }

  previousRout.value = route.params.id;
});

onMounted(async () => {
  if (route.params.id && FILES.value.length) {
    storeFile.SET_CURRENT_TITLE_DOC(
      FILES.value[route.params.id].name.slice(0, -5)
    );
    editor.value = await filesApi.getFileHtmlByUrl(
      FILES.value[route.params.id].path,
      FILES.value[route.params.id].id,
      FILES.value[route.params.id].name,
      FILES.value[route.params.id].extension
    );
  }
});

onBeforeMount(() => {
  editor.value = "";
  storeFile.SET_CURRENT_TITLE_DOC("");
  router.push("/club/addDocument");
});
</script>

<style lang="scss" scoped></style>
