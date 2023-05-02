<template>
  <div>
    <q-page class="q-pa-md">
      <q-card class="item">
        <q-card-section class="oNum">
          1260
        </q-card-section>
        <q-card-section class="oName">
          Лендинг чайного магазина
        </q-card-section>
        <q-card-section class="oState">
          Поиск исполнителя
        </q-card-section>
        <q-card-section class="oDateUpdate">
          24.05.2023
        </q-card-section>
        <q-card-section class="oResponse">
          <img src="../assets/icons/orderIcons/deal.png" alt="img">
        </q-card-section>
        <q-card-section class="oDeal">
          <img src="../assets/icons/orderIcons/wait.png" alt="img">
        </q-card-section>
        <q-card-section class="oEdit">
          <img src="../assets/icons/orderIcons/tripleDot.png" alt="img">
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<script setup>

</script>

<style scoped>
.item{
  background-color: #DFD1F6;
  width: 1109px;
  display: flex;
  justify-content:space-between;
  flex-direction: row;
  vertical-align: middle;
  text-align: center;
  line-height: normal;
}
.q-card__section--vert {
  padding: 23px;
}
.oNum, .oName, .oState, .oDateUpdate{
  padding: 30px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
}
.oResponse, .oDeal, .oEdit{
  line-height: 16px;
}
</style>
