const jackson5 = ['Jackie', 'Tito', 'Jermaine', 'Marlon', 'Michael'];
// (string | undefined)[]
const members = ['Janet', 'Michael']
  .map((who) => jackson5.find((n) => n === who))
  .filter((who) => who !== undefined);

function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

// string[]
const members2 = ['Janet', 'Michael']
  .map((who) => jackson5.find((n) => n === who))
  .filter(isDefined);
