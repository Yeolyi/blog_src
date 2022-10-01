const iterable = [1, 2, 3];
const iterator = iterable[Symbol.iterator]();
while (true) {
  const res = iterator.next();
  if (res.done) break;
  console.log(res.value);
}
// 1 2 3
