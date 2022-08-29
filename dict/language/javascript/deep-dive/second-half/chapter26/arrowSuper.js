class Base {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        return `Hi! ${this.name}`;
    }
}

class Derived extends Base {
    // 클래스 필드 정의 제안
    // 화살표 함수의 super는 상위 스코프인 constructor의!!! super를 가리킨다. 
    sayHi = () => `${super.sayHi()} how are you doing?`;
}
