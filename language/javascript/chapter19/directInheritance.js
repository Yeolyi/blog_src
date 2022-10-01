let obj = Object.create(null);
console.log(Object.__proto__);

function Person(name) {
  this.name = name;
}
obj = Object.create(Person.prototype);
console.log(obj.constructor);
