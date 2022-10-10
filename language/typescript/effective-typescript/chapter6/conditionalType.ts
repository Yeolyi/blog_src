function double1(x: number | string): number | string;
function double1(x: any) {
  return x + x;
}
const num1 = double1(12); // string | number

function double2<T extends number | string>(x: T): T;
function double2(x: any) {
  return x + x;
}
const num2 = double2('x'); // "x" !!

function double3(x: number): number;
function double3(x: string): string;
function double3(x: any) {
  return x + x;
}

function f1(x: number | string) {
  // @ts-ignore
  return double3(x); // No overload matches the call.
}

// Conditional types are like if statements in type space.
function double<T extends number | string>(x: T): T extends string ? string : number;
function double(x: any) {
  return x + x;
}

function f2(x: number | string) {
  /*
   (number|string) extends string ? string : number
-> (number extends string ? string : number) |
   (string extends string ? string : number)
-> number | string
  */
  return double(x);
}
