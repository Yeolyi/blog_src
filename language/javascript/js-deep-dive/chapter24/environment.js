function foo() {
  let x = 0;
  setTimeout(function () {
    x += 1;
  }, 100);
  function bar() {
    return x;
  }
  return bar;
}

const bar = foo();
console.log(bar()); // 0
setTimeout(function () {
  console.log('result: ' + bar());
}, 200); // 1
