const Person = (function () {
  function Person(name) {
    this.name = name;
  }
  Person.prototype = {};
  return Person;
})();

const me = new Person("YeolYi");
console.log(me.constructor === Person); // fals e
console.log(me instanceof Person); // true
