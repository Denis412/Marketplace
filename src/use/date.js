export const optionsFn = (date) => {
  return new Date(date).getTime() > Date.now() - 86_400_000;
};
