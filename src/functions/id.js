export const coorectId = (uuid) => {
  const startsWithNumber = /^\d/.test(uuid);

  if (startsWithNumber) {
    uuid = "a" + uuid;
  }
  return uuid;
};
