const replaceAt = (str, index, value) =>
  str.slice(0, index) + (value || " ") + str.slice(index + 1);

export default replaceAt;
