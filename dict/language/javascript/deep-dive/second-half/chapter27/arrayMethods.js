const printAll = x => x.forEach(x => console.log(x));

printAll([
    Array.isArray({ length: 1, 0: 1 }), // false
    [3, 1, 4].indexOf(4), // 2
    [3, 1, 4].indexOf(9), // -1
    [3, 1, 4].includes(9), // false
    [1, 2, 3, 4].join('&'), // 1&2&3&4
    [NaN].indexOf(NaN), // -1
    [NaN].includes(NaN), // true
    [1, 2, 3, 4].includes(1, 1), // false
    [1, [2, [3, [4]]]].flat(1) // [ 1, 2, [ 3, [ 4 ] ] ]
]);

const arr1 = [];
// push 메서드는 성능 면에서 좋지 않다. 
// 스프레드 문법을 사용하면 표현식만으로 같은 작업을 부수효과 없이 할 수 있다. 
console.log(arr1.push(1, 2)); // 2, 변경된 length
console.log(arr1) // [ 1, 2 ]
console.log(arr1.pop()); // 2
console.log(arr1); // [ 1 ]

console.log(arr1.unshift('a')); // 2
console.log(arr1); // [ 'a', 1 ]
console.log(arr1.shift()); // a
console.log(arr1); // [ 1 ]

// 배열인 경우 배열을 해체. push/unshift와 다르다. 
console.log(arr1.concat([4])); // [ 1, 4 ]
console.log(arr1.concat(4, 5)); // [ 1, 4, 5 ]
console.log(arr1) // [ 1 ]

// push/unshift, concat 대신 스프레드 문법을 일관성 있게 사용하는 것이 권장된다. 
const arr2 = [1, 2, 3, 4, 5];
console.log(arr2.splice(-2)); // [4, 5]
console.log(arr2); // [1, 2, 3]
// start, deleteCount, items
console.log(arr2.splice(1, 1, 10, 11, 12)) // [2]
console.log(arr2); // [1, 10, 11, 12, 3]

const arr3 = [1, 2, 3];
console.log(arr3.slice(-2)); // [ 2, 3 ]
// start, end
console.log(arr3.slice(1, 2)); // [2] 
// 얕은 복사
const arr4 = [{ foo: 0 }];
const temp = arr4.slice();
console.log(arr4 === temp); // false
console.log(arr4[0] === temp[0]) // true

const arr5 = [1, 2, 3, 4];
console.log(arr5.reverse()); // [4, 3, 2, 1]
console.log(arr5); // [4, 3, 2, 1]

console.log(arr5.fill(0, 1, 3)); // [4, 0, 0, 1]
console.log(arr5) // [4, 0, 0, 1]
console.log(Array.from({ length: 5 }, (_, i) => i)); // [0, 1, 2, 3, 4]

