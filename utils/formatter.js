export const isUpperCase = (str) => {
  let result = str
    .split('')
    .map((letter) => /[A-Z]/.test(letter))
    .reduce((a, b) => a + b);

  return result === str.length;
};

export const formatFormikValues = (obj) => {
  if (!obj) {
    return false;
  }
  const res = JSON.parse(
    JSON.stringify(obj, (k, v) => {
      // ignore datetime
      let isDatetime = false;
      if (k.substr(k.length - 2, k.length) === 'At') {
        isDatetime = true;
      }

      // ignore booleans
      let isBoolean = false;
      if (k.substr(0, 2) === 'is' && isUpperCase(k[2])) {
        isBoolean = true;
      }

      return v === null && !isDatetime && !isBoolean ? '' : v;
    }),
  );
  return res;
};
