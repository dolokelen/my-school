const getPersonIdFromURL = (urlPathname: string) => {
  const personIdIndex = 3;
  const stringId = urlPathname.split("/")[personIdIndex];
  return parseInt(stringId);
};

export default getPersonIdFromURL;
