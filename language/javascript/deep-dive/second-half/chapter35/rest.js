const arr = [1, 2, 3];
arr.splice(1, 0, ...["a", "b"]);
console.log(arr); // [ 1, 'a', 'b', 2, 3 ]

const a = [1, 2];
const b = [...a];
console.log(a === b); // false

// 이터러블을 배열로 변환
const sum = (...args) => args.reduce((a, b) => a + b);
// 이터러블이 아닌 유사 배열 객체는 Array.from을 사용한다.

// 스프레드 프로퍼티 제안은 일반 객체를 상대로도 스프레드 문법의 사용을 허용한다.
const obj = { x: 1, y: 2 };
const copy = { ...obj };
console.log(copy); // { x: 1, y: 2 }
