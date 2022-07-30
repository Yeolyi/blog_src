class Person {
    #age // 반드시 함수 몸체에 정의해야 한다. 
    constructor(age) {
        this.#age = age;
    }
}

const person = new Person(24);
// console.log(person.#age); SyntaxError: Private field '#age' must be declared in an enclosing class
// 에러 메시지가 요상하네??
// new 빼먹었었는데 이거보다 위 에러가 우선적으로 뜨는게 신기. 
