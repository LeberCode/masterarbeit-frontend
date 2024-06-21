export const shortenId = (uuid) => {
  const startsWithNumber = /^\d/.test(uuid);

  if (startsWithNumber) {
    uuid = uuid.replace(/^\d+/, "");
  }
  return uuid;
};
