const arr = [1, 2];
const [one, two] = arr;

const [, dul, set = 3] = arr;
console.log(dul, set); // 2 3

// Rest 요소. rest element
const [x, ...y] = [1, 2, 3];
console.log(x, y); // 1 [2, 3]

// ES6 객체 디스트럭처링 할당
const obj = { a: 1, b: 2 };
const { c = 3, a, b } = obj;
console.log(a, b, c); // 1 2 3
const { a: aa, b: bb, c: cc } = obj;
console.log(aa, bb, cc); // 1 2 undefined

function foo({ a, b, c }) {
    console.log(a, b, c);
}

foo(obj); // 1 2 undefined

// 배열 디스트럭처링 할당과 객체 디스트렁처링 할당의 혼용
const d = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
]
const [, { id }] = d;
console.log(id); // 2

// Rest 프로퍼티 ...
const { xx, ...rest } = { xx: 1, yy: 2, zz: 3 };
console.log(xx, rest); // 1 { yy: 2, zz: 3 }
