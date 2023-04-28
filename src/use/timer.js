import { ref } from "vue";

export const useTimer = (seconds) => {
  const timer = ref(seconds);
  let timerId = 0;

  return {
    timer,
    stop: () => clearInterval(timerId),

    start: () => {
      clearInterval(timerId);

      timerId = setInterval(() => {
        timer.value -= 1;

        if (!timer.value) clearInterval(timerId);
      }, 1000);
    },

    clear: () => {
      clearInterval(timerId);
      timer.value = seconds;
    },
  };
};
