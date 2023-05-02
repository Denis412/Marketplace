<template>
  <div class="item">
    <q-page class="q-pa-md">
      <q-card class="oItem">
        <q-card-section class="oNum">
          {{ item.number }}
        </q-card-section>
        <q-card-section class="oName">
          {{ item.name }}
        </q-card-section>
        <q-card-section class="oState">
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
          <button><img src="../assets/icons/orderIcons/tripleDot.png" alt="img"></button>
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
  max-height: 140px;
}
.oItem{
  background-color: #DFD1F6;
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
</style>
