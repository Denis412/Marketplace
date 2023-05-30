<template>
  <q-page class="bg-dark-purple h-100p no-scroll" style="overflow-x: hidden">
    <c-background-spot class="overflow-hidden" />

    <main class="text-white relative-position" style="z-index: 1">
      <c-main-screen
        :title="'Для Бизнеса'"
        :subtitle="'1Т Клуб — это поддержка, наставничество и полная вовлеченность в ваш IT-проект'"
        :img="'assets/images/landing-business/amico.svg'"
        :video="false"
      />
      <c-business-offers />
      <c-advantages :content-list="contentList" />
      <c-string />
      <c-business-tools />
      <c-join-business />
      <c-best-teams />
      <c-faq />
      <c-request />
    </main>
  </q-page>
</template>

<script setup>
import CBackgroundSpot from "components/Landing/ClubBackgroundSpot.vue";
import CMainScreen from "components/Landing/ClubMainScreen.vue";
import CBusinessScreen from "components/Landing/ClubBusinessScreen.vue";
import CBusinessOffers from "components/Landing/ClubBusinessOffers.vue";
import CAdvantages from "src/components/Landing/ClubAdvantages.vue";
import CString from "components/Landing/ClubString.vue";
import CBusinessTools from "components/Landing/ClubBusinessTools.vue";
import CJoinBusiness from "components/Landing/ClubJoinBusiness.vue";
import CBestTeams from "components/Landing/ClubBestTeams.vue";
import CTasks from "components/Landing/ClubTasks.vue";
import CFaq from "components/Landing/ClubFAQ.vue";
import CRequest from "components/Landing/ClubRequest.vue";

const contentList = [
  {
    id: 1,
    content: "Оценка квалификации IT-специалиста с помощью тестового задания",
  },
  {
    id: 2,
    content:
      "Услуги наставника, который доступно объяснит информацию по разработке и продвижению IT-проекта",
  },
  {
    id: 3,
    content: "Выбор IT-специалиста или IT-команды по рейтингу и отраслям",
  },
  {
    id: 4,
    content:
      "Возможность наблюдать за работой над IT-проектом с помощью сервиса для управления задачами",
  },
];
</script>

<style scoped lang="scss"></style>
