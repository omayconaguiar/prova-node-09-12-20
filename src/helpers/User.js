const notNullObjects = (obj) => {
  /* eslint no-param-reassign: "error" */
  Object.keys(obj).forEach((key) => (obj[key] === null ? delete obj[key] : {}));
  return obj;
};

module.exports = {
  notNullObjects,
};
