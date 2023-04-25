import { ref } from "vue";

export const useTimer = (seconds) => {
  const timer = ref(seconds);
  let timerId = 0;

  return {
    timer,
    start: () => {
      timerId = setInterval(() => {
        timer.value -= 1;
      }, 1000);
    },
    stop: () => clearInterval(timerId),
    clear: () => {
      clearInterval(timerId);
      timer.value = 0;
    },
  };
};
