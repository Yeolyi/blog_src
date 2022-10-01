const target = "onetwothreetwo";

console.log(/two/g.exec(target));
// [ 'two', index: 3, input: 'onetwothree', groups: undefined ]
// g가 있어도 첫번째 매칭 결과만 반환한다.

console.log(/two/.test(target)); // true

console.log(target.match(/two/));
// [ 'two', index: 3, input: 'onetwothreetwo', groups: undefined ]
console.log(target.match(/two/g));
// [ 'two', 'two' ]
