<template>
  <q-icon class="cursor-pointer relative-position" name="more_horiz" size="40px">
    <q-menu class="w-max-content">
      <q-list separator>
        <q-item
          v-if="isOwner"
          clickable
          class="flex no-wrap items-center text-caption1 text-black"
          @click="editProfile"
        >
          Редактировать
        </q-item>

        <q-item
          v-else
          clickable
          v-ripple
          class="flex no-wrap items-center text-caption1 text-black"
        >
          Покинуть команду
        </q-item>

        <q-item
          clickable
          v-ripple
          ref="t"
          class="flex no-wrap items-center text-caption1 text-black"
          @click="copyTeamTelegram"
        >
          Поделиться
          <transition name="slide">
            <div
              v-show="showPopup"
              class="flex flex-center"
              :style="popupStyle"
              style="
                position: absolute;
                padding: 10px;
                width: max-content;
                height: min-content;
                border-radius: 5px;
                background: lightgray;
              "
            >
              <span class="text-caption2">Скопировано в буфер обмена</span>
            </div>
          </transition>
        </q-item>
      </q-list>
    </q-menu>
  </q-icon>
</template>

<script setup>
import { useQuasar } from "quasar";
import { inject, reactive, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";

const $q = useQuasar();

const router = useRouter();

const currentTeam = inject("currentTeam");
const isOwner = inject("isOwner");

const showPopup = ref(false);

const popupStyle = reactive({
  top: 0,
  left: 0,
});

const editProfile = async () => {
  router.push({
    name: router.currentRoute.value.path.includes("team-space") ? "teamSpaceEdit" : "teamEdit",
    params: { id: currentTeam.value.id },
    query: { space: currentTeam.value.space },
  });
};

const copyTeamTelegram = async () => {
  await navigator.clipboard.writeText(currentTeam.value.telegram_chat_id);

  $q.notify({
    position: "top",
    color: "lightgray",
    timeout: 1000,
    message: "Ссылка скопирована в буфер обмена",
  });
};
</script>

<style scoped lang="scss">
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
}
</style>
