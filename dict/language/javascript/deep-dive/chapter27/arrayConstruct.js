let arr1 = [1, , , 3];
console.log(arr1.length); // 4
console.log(arr1); // [ 1, <2 empty items>, 3 ]
console.log(arr1[1]); // undefined

// 전달된 인수가 1개고 숫자면 length프로퍼티 값이 인수인 배열을 생성
console.log(new Array(10)); // [ <10 empty items> ]
console.log(Array.of(10)); // [ 10 ]

// 유사 배열 객체
const arrayLikeObject = { length: 2, 0: 'a', 1: 'b' }
console.log(Array.from(arrayLikeObject)); // [ 'a', 'b' ]
// 이터러블
console.log(Array.from('Hello')); // [ 'H', 'e', 'l', 'l', 'o' ]
