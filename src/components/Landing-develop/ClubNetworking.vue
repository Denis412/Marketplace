<template>
  <section class="section">
    <h2 class="text-h2 text-center c-mb-24">Нетворкинг</h2>
    <p class="text-subtitle2 text-center c-mb-64">
      Окружайте себя IT-экспертами, участвуйте в онлайн и офлайн мероприятиях и расширяйте свой круг
      общения вместе с 1Т Клубом
    </p>

    <section class="networking-video c-mb-96">
      <div id="yt-video">
        <YouTube
          src="https://www.youtube.com/watch?v=sCJrLLcSMe0"
          ref="youtube"
          @ready="onPlayerReady"
          width="992px"
          height="558px"
        />
      </div>
    </section>

    <section class="flex column flex-center">
      <h3 class="text-h3 text-center c-mb-32">Станьте участником мероприятий</h3>
      <c-button
        to="/registration"
        background
        label="Вступить в 1Т Клуб"
        :class="'text-subtitle4 networking-btn'"
      />
    </section>
  </section>
</template>

<script setup>
import CButton from "src/components/ClubButton.vue";
import { onMounted } from "vue";

import YouTube from "vue3-youtube";

const onPlayerReady = (event) => {
  let options = {
    rootMargin: "0px",
    threshold: 1.0,
  };

  let observer = new IntersectionObserver((entries, observer) => {
    if (entries.length && entries.some((e) => e.target.id === "yt-video" && e.isIntersecting)) {
      event.target.mute();
      event.target.playVideo();
    }
  }, options);
  const target = document.getElementById("yt-video");
  observer.observe(target);
};
</script>

<style lang="scss" scoped>
.section {
  max-width: 1120px;
  margin: 0 auto;
  margin-bottom: 160px;
}

.networking-video {
  background: #32104d;
  border-radius: 20px;
  padding: 64px;
}
.networking-btn {
  padding: 16px 32px;
}
</style>
