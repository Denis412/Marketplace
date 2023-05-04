<template>
  <div class="item">
    <q-page class="qPage">
      <q-card class="oItem" >
        <q-card-section class="oNum">
          {{ item.number }}
        </q-card-section>
        <q-card-section class="oName">
          {{ item.name }}
        </q-card-section>
        <q-card-section class="oState">
          <div class="oStateIndicator" :style="{ backgroundColor: item.color }"></div>
          {{ item.state }}
        </q-card-section>
        <q-card-section class="oDateUpdate">
          {{ item.date }}
        </q-card-section>
        <q-card-section class="oResponse">
          <img src="../assets/icons/orderIcons/deal.png" alt="img">
        </q-card-section>
        <q-card-section class="oDeal">
          <img src="../assets/icons/orderIcons/wait.png" alt="img">
        </q-card-section>
        <q-card-section class="oEdit">
          <a href="#"><img src="../assets/icons/orderIcons/tripleDot.png" alt="img"></a>
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<script setup>

const { item } = defineProps({
  item: {
    type: Object,
    required: true
  }
});

</script>

<style scoped>
.item{
  padding: 10px;
}
.qPage{
  min-height: 70px !important;
}
.oItem{
  width: 1109px;
  display: flex;
  justify-content:space-between;
  flex-direction: row;
}
.oNum, .oName, .oState, .oDateUpdate, .oResponse, .oDeal, .oEdit{
  padding: 20px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
}
.oName{
  max-width: 165px;
}
.oStateIndicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
}
</style>
