const both = (date) => appendAMPM(civilianHours(date));

const compost =
  (...fns) =>
  (arg) =>
    fns.reduce((composed, f) => f(composed), arg);
const betterBoth = compose(civilianHours, appendAMPM);
