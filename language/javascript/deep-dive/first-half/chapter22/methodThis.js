function Person(name) {
  this.name = name;
}
Person.prototype.getName = function () {
  console.log(this.name);
};
Person.prototype.name = "Prototype";

let me = new Person("YeolYi");
me.getName(); // 'YeolYi'
Person.prototype.getName();
("Prototype");
