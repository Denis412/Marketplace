<template>
  <q-carousel-slide :name="name" class="row no-wrap justify-between items-center carousel">
    <div class="text-center col-6">
      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        ref="carousel"
        height="320px"
        class="bg-transparent carousel-inside"
      >
        <q-carousel-slide
          v-for="item in teammates"
          :key="item.index"
          :name="item.slide"
          class="q-pa-none"
        >
          <div class="row flex-center no-wrap cards">
            <q-card class="card col-6">
              <q-img :src="item.image[0]">
                <div class="text-left bottom-img flex column justify-end">
                  <p class="text-body1 bottom-text">{{ item.name[0] }}</p>
                  <p class="text-caption1 bottom-text">
                    {{ item.profession[0] }}
                  </p>
                </div>
              </q-img>
            </q-card>
            <q-card class="card col-6">
              <q-img :src="item.image[1]">
                <div class="text-left bottom-img flex column justify-end">
                  <p class="text-body1 bottom-text">{{ item.name[1] }}</p>
                  <p class="text-caption1 bottom-text">
                    {{ item.profession[1] }}
                  </p>
                </div>
              </q-img>
            </q-card>
          </div>
        </q-carousel-slide>
        <template v-slot:control>
          <q-carousel-control
            :offset="[0, 0]"
            class="flex full-width full-height justify-between items-center"
          >
            <q-btn
              class="btn-prev"
              dense
              fab
              padding="0"
              icon="img:/assets/icons/arrow/arrow-left-round.svg"
              @click="$refs.carousel.previous()"
            />
            <q-btn
              class="btn-next"
              dense
              fab
              padding="0"
              icon="img:/assets/icons/arrow/arrow-right-round.svg"
              @click="$refs.carousel.next()"
            />
          </q-carousel-control>
        </template>
      </q-carousel>
    </div>
    <div class="q-mt-md text-left flex column">
      <div class="text-subtitle3 c-mb-8">
        {{ name }}
      </div>
      <div class="text-body2 c-mb-25 content">
        {{ content }}
      </div>
      <div class="c-mb-25">
        <q-btn v-for="link in links" :key="link.index" rounded class="text-caption2 link-btn">{{
          link.label
        }}</q-btn>
      </div>
      <a class="text-body1 more">Подробнее</a>
    </div>
  </q-carousel-slide>
</template>
<script setup>
import { ref } from "vue";

const { name, content, links, teams } = defineProps({
  name: String,
  content: String,
  links: Object,
  teammates: Object,
});

const slide = ref(1);
</script>
<style scoped lang="scss">
.carousel {
  border-radius: 24px;
  background: linear-gradient(97.7deg, #432076 0%, #3a1d47 100%);
  padding: 64px 64px 64px 48px;
  max-height: 450px;
  min-height: 450px;
  &-inside {
    width: 504px;
  }
}
.link-btn {
  color: #191919;
  background-color: #f2f2f2;
  margin-right: 8px;
}
.c-mb {
  &-8 {
    margin-bottom: 8px;
  }
  &-25 {
    margin-bottom: 25px;
  }
}
.content {
  max-width: 450px;
}
.more {
  &::after {
    content: url("/assets/icons/arrow/arrow-right-small.svg");
    margin-left: 17px;
  }
}
.card {
  min-height: 320px;
  max-width: 228px;
  & .q-img {
    min-height: 320px;
    max-height: 320px;
  }
  border-radius: 10px;
}
.cards {
  gap: 16px;
}

.bottom-text {
  margin: 0;
}
.bottom-img {
  position: absolute;
  height: 100%;
  width: 100%;
  bottom: 0;
  background: linear-gradient(180deg, rgba(8, 2, 18, 0) 61.25%, #1d083f 100%);
}
.btn {
  &-prev {
    margin-left: 1%;
  }
  &-next {
    margin-right: 1%;
  }
}
</style>
