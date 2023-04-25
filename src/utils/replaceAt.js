const replaceAt = (str, index, value) =>
  str.substring(0, index) + value + str.slice(value ? index : index + 1);

export default replaceAt;
