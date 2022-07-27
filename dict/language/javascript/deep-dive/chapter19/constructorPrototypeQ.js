function Person() {}
Person.prototype.hello = () => { console.log('hello'); }
console.log(Person.hello) // undefined. 여기는 체인 따라 검색을 안하네?
console.log(Object.getPrototypeOf(Person) === Function.prototype); // true, 아 자기 프로토타입은 prototype이 아니라 __proto__...
console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype); // true
