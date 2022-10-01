// 전역 심벌 레지스트리(global symbol registry)에서 검색
const s1 = Symbol.for('ABC');
const s2 = Symbol.for('ABC');
console.log(s1 === s2); // true
console.log(Symbol.keyFor(s1)); // ABC
