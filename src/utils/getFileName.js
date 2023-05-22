export const getFileName = (url) => {
  return url?.slice(url.indexOf("?n=") + 3);
};
