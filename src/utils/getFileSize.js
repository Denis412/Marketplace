export const getFileSize = (file) => {
  const count = 0;
  const currentSize = file?.size;

  while (currentSize >= 1024) {
    currentSize /= 1024;
    count++;
  }

  return count === 0
    ? `${currentSize} b`
    : count === 1
    ? `${currentSize} kb`
    : count === 2
    ? `${currentSize} mb`
    : `${currentSize} gb`;
};
