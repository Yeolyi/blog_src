const counter = {
  num: 1,
  increase: () => ++this.num,
};

console.log(counter.increase()); // NaN
// increase 프로퍼티에 할당된 화살표 함수의 상위 스코프는 전역이다,,,,!

class Person {
  constructor() {
    this.name = "Lee";
    // 클래스가 생성한 인스턴스(this)의 sayHi 프로퍼티에 화살표 함수를 할당한다.
    // 따라서 sayHi 프로퍼티는 인스턴스 프로퍼티다.
    this.sayHi = () => console.log(`Hi ${this.name}`);
    // sayHi의 상위 스코프는 클래스 외부이지만, 여기서 화살표 함수의 this는 constructor 내부의 this와 같다??
  }
}
