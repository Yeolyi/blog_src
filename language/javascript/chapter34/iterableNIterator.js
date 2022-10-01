const fibo = function (max) {
  let [pre, cur] = [0, 1];
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      [pre, cur] = [cur, pre + cur];
      return { value: cur, done: cur >= max };
    },
  };
};

let iter = fibo(10);
for (const x of iter) {
  console.log(x); // 1 2 3 5 8
}

iter = fibo(10);
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
