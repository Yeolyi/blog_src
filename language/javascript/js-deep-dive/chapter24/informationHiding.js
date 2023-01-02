const counter = (function () {
  let num = 0;
  // 객체 리터럴의 코드 중괄호는 코드 블록이 아니므로 별도의 스코프를 생성하지 않는다.
  return {
    increase() {
      return ++num;
    },
    decrease() {
      return --num;
    },
  };
})();

console.log(counter.increase()); // 1
console.log(counter.decrease()); // 0
console.log(counter.decrease()); // -1
