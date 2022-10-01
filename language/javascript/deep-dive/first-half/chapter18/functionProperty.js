function square(number) {
  return number * number;
}
console.log(Object.getOwnPropertyDescriptors(square));
// 여기는 함수 고유의 프로퍼티.
// {
//   length: { value: 1, writable: false, enumerable: false, configurable: true },
//   name: {
//     value: 'square',
//     writable: false,
//     enumerable: false,
//     configurable: true
//   },
//   arguments: {
//     value: null,
//     writable: false,
//     enumerable: false,
//     configurable: false
//   },
//   caller: {
//     value: null,
//     writable: false,
//     enumerable: false,
//     configurable: false
//   },
//   prototype: { value: {}, writable: true, enumerable: false, configurable: false }
// }

// 얘는 'own'이 아니라 아래의 Object.prototype으로부터 상속받는다.
console.log(square.__proto__); // {},
console.log(Object.getOwnPropertyDescriptor(square, "__proto__")); // undefined
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__"));
// {
//   get: [Function: get __proto__], // 접근자 프로퍼티
//   set: [Function: set __proto__],
//   enumerable: false,
//   configurable: true
// }

// argument 객체는 순회 가능한 유사 배열 객체. 함수 내부에서 지역 변수처럼 사용한다.
// 유사 배열 객체란 length 프로퍼티를 가진 객체로 for문으로 순회할 수 있는 객체를 말한다.
function multiply(x, y) {
  console.log(arguments);
  console.log(arguments.length);
  return x * y;
}
multiply(1, 2, 3, 4, 5);
// [Arguments] { '0': 1, '1': 2, '2': 3, '3': 4, '4': 5 }
// 5

console.log(multiply.length); // 위에는 인자, 얘는 매개변수의 개수
