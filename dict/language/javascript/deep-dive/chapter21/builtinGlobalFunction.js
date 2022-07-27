// 빌트인 전역 함수

// eval

console.log(isFinite(NaN)); // false, 인수가 NaN으로 평가되는 값이면 false를 반환
console.log(isFinite(null)); // true
console.log(isFinite(-Infinity)); // false

console.log(isNaN(NaN)); // true
console.log(isNaN('Hello')); // true
console.log(isNaN('')); // false

console.log(parseFloat('3.1415')); // 3.1415

console.log(parseInt('100', 2)); // 4
console.log(parseInt('100', 5)); // 25
console.log(parseInt('0xff')); // 255, 2진수와 8진수 리터럴은 해석하지 못한다. 
