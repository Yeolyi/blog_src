console.log(Temp1); // undefined
// console.log(Temp2); Cannot access 'Temp2' before initialization

var Temp1 = class { };
class Temp2 { }

const Person = '';
{
    // console.log(Person); ReferenceError: Cannot access 'Person' before initialization. 호이스팅 발생 중
    class Person { }
}
