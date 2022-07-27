function A() { }
const a = new A();
console.log(a.__proto__ === A.prototype); // true
console.log(A.prototype.constructor === A); // true
console.log(a.__proto__.__proto__.__proto__); // null?