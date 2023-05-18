export const truncate = (str, length) => {
  return str?.length > length ? str.substr(0, length) + "..." : str;
};
