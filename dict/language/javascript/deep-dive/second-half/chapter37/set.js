// 이터러블을 인수로 전달받는다. 
const set1 = new Set([3, 2, 1, 2]);
console.log(set1); // Set(3) { 3, 2, 1 }

// size 프로퍼티는 getter 함수만 존재한다. 
console.log(set1.size); // 3

// add 메서드는 method chaining이 가능하다. 
const set2 = new Set();
set2.add(1).add(2);
console.log(set2); // Set(2) { 1, 2 }

console.log(set2.has(3)); // false

console.log(set2.delete(2)); // true
console.log(set2.has(2)); // false

set2.clear();

// const set3 = Set([1, 2, 3]); TypeError: Constructor Set requires 'new'

const set3 = new Set([1, 2, 3]);
set3.forEach((v, v2, set) => console.log(v, v2, set));
/*
첫번째 인수과 두번째 인수가 같은데 이는 Array.prototype.forEach 메서드와 인터페이스를 통일하기 위함이며 다른 의미는 없다. 
1 1 Set(3) { 1, 2, 3 }
2 2 Set(3) { 1, 2, 3 }
3 3 Set(3) { 1, 2, 3 }
*/

console.log(Symbol.iterator in set3); // true

// 교집합 구현
Set.prototype.intersection = function (set) {
    return new Set([...this].filter(x => set.has(x)));
}

// 합집합 구현
Set.prototype.union = function (set) {
    return new Set([...this, ...set]);
}
