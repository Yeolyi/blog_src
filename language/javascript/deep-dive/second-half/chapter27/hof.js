const alphabets = Array.from("alphabets");
alphabets.sort();
console.log(alphabets);
/*
[
  'a', 'a', 'b',
  'e', 'h', 'l',
  'p', 's', 't'
]
*/
// sort 메서드의 기본 정렬은 유니코드 코드 포인트를 따른다.
console.log([30, 40, 1, 3, 25].sort()); // [ 1, 25, 3, 30, 40 ]
// 0보다 작으면 첫번째 인수가 우선
console.log([30, 40, 1, 3, 25].sort((a, b) => a - b)); // [ 1, 3, 25, 30, 40 ]
// ES10이전에는 퀵 소트, 이후에는 timsort를 사용한다.

[1, 2, 3].forEach((item, index, arr) => {
  console.log(item, index, arr);
});
/*
1 0 [ 1, 2, 3 ]
2 1 [ 1, 2, 3 ]
3 2 [ 1, 2, 3 ]
*/
// 희소 배열에서 존재하지 않는 요소는 순회하지 않는다.
// for문보다 성능이 좋지는 않다.

console.log([1, 2, 3].map((item, index, arr) => ({ item, index, arr })));
/*
[
  { item: 1, index: 0, arr: [ 1, 2, 3 ] },
  { item: 2, index: 1, arr: [ 1, 2, 3 ] },
  { item: 3, index: 2, arr: [ 1, 2, 3 ] }
]
*/

// 책에서와 VSCode 팝업?의 변수 이름이 다름.
// 책에서는 accumulator, 여기서는 previousValue
console.log(
  [1, 2, 3, 4].reduce((previousValue, currentValue, currentIndex, array) => {
    console.log(previousValue, currentValue, currentIndex, array);
    return previousValue + currentValue;
  })
);
/*
1 2 1 [ 1, 2, 3, 4 ]
3 3 2 [ 1, 2, 3, 4 ]
6 4 3 [ 1, 2, 3, 4 ]
10
*/
// reduce 메서드를 호출할 때는 초기값을 생략하지 않고 언제나 전달하는 것이 안전하다.

console.log([1, 3, 5, 7].some((x) => x % 2 == 0)); // false
console.log([1, 3, 5, 7].every((x) => x % 2)); // true
console.log([].some((x) => x)); // false
console.log([].every(() => false)); // true

console.log(
  Array.from({ length: 5 }, (_, i) => ({ id: i * 2 })).find((x) => x.id == 8)
); // { id: 8 }

console.log(
  Array.from({ length: 5 }, (_, i) => ({ id: i * 2 })).findIndex(
    (x) => x.id == 8
  )
); // 4

const arr = ["hello", "world"];
// map에서 생성된 배열을 평탄화한다
console.log(arr.flatMap((x) => Array.from(x).reverse()));
/*
[
  'o', 'l', 'l', 'e',
  'h', 'd', 'l', 'r',
  'o', 'w'
]
*/
