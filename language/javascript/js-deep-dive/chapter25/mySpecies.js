// Number를 반환하는 Number의 인스턴스 메서드가 없어서 예시 코드 실패,,
class MyNumber extends Number {
  get numberOfDigits() {
    // https://stackoverflow.com/questions/14879691/get-number-of-digits-with-javascript
    return Math.max(Math.floor(Math.log10(Math.abs(this))), 0) + 1; // 다형성?
  }
}

const myNumber = new MyNumber(12345);
// new 없으면 에러. Number가 없어도 되는 것과는 상관 없는 듯.
console.log(myNumber.numberOfDigits);

class MyArray extends Array {
  // static get [Symbol.species]() { return Array } 이게 있으면 addOne에서 Array를 반환한다.
  addOne() {
    return this.map((x) => x + 1);
  }
}

const myArr = new MyArray(1, 2, 3);
console.log(myArr.addOne() instanceof MyArray); // true. 덕분에 메서드 체이닝이 가능하다.
