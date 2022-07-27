const person = { age: 13 }
console.log('age' in person); // true
console.log('isPrototypeOf' in person); // true
console.log(Reflect.has(person, 'age')); // in 연산자와 동일
console.log(person.hasOwnProperty('isPrototypeOf')); // false
