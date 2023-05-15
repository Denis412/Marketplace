<template>
  <q-item class="popup-component" clickable>
    <q-img class="popup-png" src="/src/assets/icons/doc_popup/pen.png" />
    <q-item-section>Переименовать</q-item-section>

    <q-popup-edit
      v-model="cur_name"
      :validate="(val) => val.length < 150"
      v-slot="scope"
    >
      <q-input
        v-model="scope.value"
        :model-value="scope.value"
        hint="Введите имя документа"
        :rules="[(val) => scope.validate(val) || 'Слишком длинное название']"
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
              filesApi.updateFile(scope.value, props.prop_doc)
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
</template>

<script setup>
import { filesApi } from "src/sdk/files/file";
import { ref } from "vue";

const props = defineProps({
  prop_doc: Object,
});

const cur_name = ref(props.prop_doc.name.slice(0, -5));
</script>

<style lang="scss" scoped>
.popup-component {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 29px 10px 20px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #666666;
}
//
.popup-png {
  width: 16px;
  height: 14px;
}
</style>
