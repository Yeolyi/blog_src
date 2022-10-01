console.log("ABCDE".indexOf("C")); // 2
console.log("ABCDE".indexOf("C", 3)); // -1
console.log("ABCDE".includes("C")); // true
console.log("AB010CD010".search(/010/)); // 2

console.log("ABCDE".startsWith("ABC")); // true
// 인덱스 2로부터 시작하는 문자열이 'CD'로 시작하는지 확인
console.log("ABCDE".startsWith("CD", 2)); // true

console.log("ABCDE".endsWith("DE")); // true
// 처음부터 3자리까지가 BC로 끝나는지 확인
console.log("ABCDE".endsWith("BC", 3)); // true

// charAt, charCodeAt, codePointAt 생략

console.log("ABCDE".substring(1, 3)); // BC
console.log("ABCDE".slice(-2)); // DE

console.log("abcde".toUpperCase()); // ABCDE
// Swift에서도 uppercase 관련을 계산 프로퍼티가 아니라 [메소드](https://developer.apple.com/documentation/swift/string/uppercased())로 제공하는데 O(n)이라는 긴 시간을 가져서 그런듯.
console.log("ABCDE".toLowerCase()); // abcde
console.log("   foo   ".trim()); // foo, trimStart와 trimEnd도 있음.
console.log("blah".repeat(5)); // blahblahblahblahblah

console.log("blahblah".replace("blah", "bleh")); // blehblah
console.log("blahblah".replace(/blah/, "bleh")); // blehblah
console.log("blahblah".replace(/blah/g, "bleh")); // blehbleh
console.log("blahblah".replace(/blah/g, "!$&!")); // !blah!!blah!

console.log("A B C D E".split(" ")); // [ 'A', 'B', 'C', 'D', 'E' ]
