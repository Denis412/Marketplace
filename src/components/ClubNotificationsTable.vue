<template>
  <section>
    <div class="flex justify-end">
      <c-button
        class="text-body2 c-mb-24"
        :background="true"
        :label="'Пометить прочитанным все'"
        @click="readAll"
      />
    </div>

    <section>
      <q-card
        v-for="elem in list"
        :key="elem.id"
        flat
        class="flex justify-between items-center c-mb-24 c-notification-card"
        :class="{ 'notification-card-unread': !elem.status }"
      >
        <q-card-section class="col club-pl-42">
          <q-btn
            @click="elem.status = !elem.status"
            v-if="!elem.status"
            round
            flat
            icon="img:/assets/icons/Eye/eye-violet6.svg"
            class="c-notification-btn"
          />
        </q-card-section>

        <q-card-section class="col">
          <span class="text-body1">{{ elem?.sendler }}</span>
        </q-card-section>

        <q-card-section class="col">{{ elem?.message }}</q-card-section>
        <q-card-section class="col">{{ elem?.data }}</q-card-section>
      </q-card>
    </section>

    <c-button
      class="text-body2"
      :background="true"
      :label="'Показать еще 30 уведомлений'"
    />
  </section>
</template>

<script setup>
import CButton from "src/components/ClubButton.vue";
const { list } = defineProps({
  list: Object,
});

const readAll = () => {
  list.map((elem) =>
    !elem.status ? (elem.status = !elem.status) : elem.status
  );
};
</script>

<style lang="scss" scoped>
.notification-card-unread {
  background-color: #d7c9e2;
}

.club-pl-42 {
  padding-left: 42px;
}
</style>