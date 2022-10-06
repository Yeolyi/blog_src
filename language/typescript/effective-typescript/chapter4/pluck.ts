function pluck<T>(record: T[], key: keyof T) {
  return record.map((x) => x[key]);
}

function betterPluck<T, K extends keyof T>(record: T[], key: K) {
  return record.map((r) => r[key]);
}

type A = { a: number; b: string };
const aList: A[] = [
  {
    a: 0,
    b: 'first',
  },
  {
    a: 1,
    b: 'second',
  },
];

// 두 함수 모두 자동완성 됨
// 반환값 (string | number)[]
console.log(pluck(aList, 'a')); // [0, 1]

// 반환값 key에 따라 달라짐
console.log(betterPluck(aList, 'a')); // [0, 1]
console.log(betterPluck(aList, 'b')); // ['first', 'second']
