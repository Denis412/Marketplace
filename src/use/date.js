export const optionsFn = (date) => {
  return new Date(date).getTime() > Date.now() - 86_400_000;
};

export const prettyDate = (date) => {
  date = date.slice(0,10)
  date = date.slice(8,10) + "." + date.slice(5,7) + "." + date.slice(0,4)
  return date
}