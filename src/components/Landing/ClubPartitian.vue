<template>
  <img
    :src="`/assets/images/landing/partitians/vector-${index - 1}.png`"
    :class="`face${cur_index} absolute cursor-pointer avatar`"
    :alt="`face${index}`"
  />
</template>

<script setup>
const { index } = defineProps({
  index: Number,
});

let cur_index = index

if(cur_index > 33){
  cur_index-=33
}
</script>

<style lang="scss" scoped>
.avatar {
  transition: 0.4s;

  &:hover {
    transform: scale(1.05);
  }
}

.face1 {
  left: 0px;
  top: 2px;
}

.face2 {
  left: 388px;
  top: 2px;
}

.face3 {
  left: 470px;
  top: 31px;
}

.face4 {
  left: 567px;
  top: 2px;
}

.face5 {
  left: 713px;
  top: 2px;
}

.face6 {
  left: 468px;
  top: 171px;
}

.face7 {
  left: 828px;
  top: 0px;
}

.face8 {
  left: 1036px;
  top: 8px;
}

.face9 {
  left: 389px;
  top: 122px;
}

.face10 {
  left: 1025px;
  top: 264px;
}

.face11 {
  left: 1042px;
  top: 139px;
}

.face12 {
  left: 713px;
  top: 258px;
}

.face13 {
  left: 887px;
  top: 261px;
}

.face14 {
  left: 634px;
  top: 77px;
}

.face15 {
  left: 486px;
  top: 269px;
}

.face16 {
  left: 669px;
  top: 171px;
}

.face17 {
  left: 587px;
  top: 236.13px;
}

.face18 {
  left: 947px;
  top: 193px;
}

.face19 {
  left: 852px;
  top: 119px;
}

.face20 {
  left: 801px;
  top: 199px;
}

.face21 {
  left: 946px;
  top: 68px;
}

.face22 {
  left: 113px;
  top: 37px;
}

.face23 {
  left: 12px;
  top: 130px;
}

.face24 {
  left: 12px;
  top: 264px;
}

.face25 {
  left: 106px;
  top: 197px;
}

.face26 {
  left: 202px;
  top: 271px;
}

.face27 {
  left: 202px;
  top: 134px;
}

.face28 {
  left: 735px;
  top: 108.67px;
}

.face29 {
  left: 209px;
  top: 2px;
}

.face30 {
  left: 292px;
  top: 205px;
}

.face31 {
  left: 310px;
  top: 81px;
}

.face32 {
  left: 388px;
  top: 255px;
}

.face33 {
  left: 550px;
  top: 109px;
}
</style>
