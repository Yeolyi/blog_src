const person = {
  firstName: 'Yi',
  lastName: 'Yeol',
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(' ');
  },
};

console.log(person.fullName);
person.fullName = 'foo bar';
console.log(person.firstName, person.lastName);

console.log(Object.getOwnPropertyDescriptor(person, 'fullName'));

console.log(globalThis.__proto__.__proto__);

function a(x, y) {
  console.log(arguments.length);
}
console.log(a.length); // 2
a(1, 2, 3); // 3
