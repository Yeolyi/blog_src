interface Person {
  name: string;
}
interface Lifespan {
  birth: Date;
  death?: Date;
}
type PersonSpan = Person & Lifespan;

const ps: PersonSpan = {
  name: "Yeolyi",
  birth: new Date(),
  death: new Date(),
}; // OK

type K = keyof (Person | Lifespan); // never

const list = [1, 2];
// const tuple: [number, number] = list;
// list의 타입인 number[]에는 [number, number]가 아닌 것들도 있다.

const triple: [number, number, number] = [1, 2, 3];
// const double: [number, number] = triple;
// Source has 3 element(s) but target allows only 2.
// 책이랑 에러 메시지가 다르네?
// 책은 Types of property 'length' are incompatible

// 타입스크립트는 튜플을 { 0: number, 1: number, length: 2}
// 으로 모델링한다.

type NonZeroNums = Exclude<number, 0>; // type: number
const zero: NonZeroNums = 0; // 되네???
// https://stackoverflow.com/questions/68008673/typescript-any-number-except-x
