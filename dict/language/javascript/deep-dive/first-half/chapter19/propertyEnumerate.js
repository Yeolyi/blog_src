const person = { __proto__: { temp: null }, age: 24, name: 'YeolYi' }

// for...in은 상속받은 프로토타입의 프로퍼티까지 열거한다. 
// [[Enumerable]]이 true이고 키가 심볼이 아닌 값만 열거된다. 
for (const key in person) {
    console.log(key); // age, temp, name
}

const arr = ['a', 'b', 'c'];
for (const key in arr) {
    console.log(key); // 0 1 2
}

console.log(Object.keys(person)); // age, name
console.log(Object.values(person)); // 24, 'YeolYi'
console.log(Object.entries(person)); // [ [ 'age', 24 ], [ 'name', 'YeolYi' ] ]
