// @ts-nocheck
function range(start: number, limit: number) {
  const out = []; // any[]
  for (let i = start; i < limit; i++) {
    out.push(i); // number[]
  }
  return out;
}

let val; // any
if (Math.random() < 0.5) {
  val = /hello/; // any, 책에서는 RegExp라는데 다르네
  val; // Type is only evoleved after you assign or push an element!!!!
  // 다른게 아니라 밑에서 확인해야 됐던 것
} else {
  val = 12;
  val; // number
}
val; // number | RegExp

let val2 = null;
val2; // null
try {
  // somethingDangerous();
  val2 = 12;
  val2; // number
} catch (e) {
  console.warn('alas!');
}
val2; // number | null
