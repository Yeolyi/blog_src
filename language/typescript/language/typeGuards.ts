interface A {
  aProp: string;
}
interface B {
  bProp: string;
}
type AorB = A | B;

declare function getAorB(): AorB;
const aOrB = getAorB();

function notTypePredicateFunction(aOrB: AorB): boolean {
  return "aProp" in aOrB;
}
if (notTypePredicateFunction(aOrB)) {
  // console.log(aOrB.aProp); 에러
}

function typePredicateFunction(aOrB: AorB): aOrB is A {
  return "aProp" in aOrB;
}
if (typePredicateFunction(aOrB)) {
  console.log(aOrB.aProp);
}
