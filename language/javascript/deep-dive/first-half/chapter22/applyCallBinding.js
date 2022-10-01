function foo(a, b) {
  console.log(a, b, this);
}

const thisArg = { x: 1 };

foo.apply(thisArg); // undefined undefined { x: 1}
foo.call(thisArg); // undefined undefined { x: 1 }
foo.apply(thisArg, [1, 2]); // 1 2 { x: 1 }
foo.call(thisArg, 1, 2); // 1 2 { x: 1 }

// bind는 this가 교체된 함수를 새롭게 생성해 반환한다.

const bar = foo.bind(thisArg);
bar(3, 4); // 3 4 { x: 1 }

const timer = {
  message: "bibibib",
  foo(callback) {
    // setTimeout(callback.bind, 1000);
    setTimeout(callback.bind(this), 1000);
  },
};

timer.foo(function () {
  console.log(this.message);
});
