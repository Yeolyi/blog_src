function* genFunc() {
    const x = yield 1; // x 값은 두번째 next 호출 때 결정된다. 
    const y = yield (x + 10);
    // 일반적으로 제너레이터의 반환값은 의미가 없다. 
    return x + y;
}
const g = genFunc(0);
// 첫 next는 인수를 전달해도 무시된다. 
console.log(g.next()); // 1
console.log(g.next(10)); // 20
console.log(g.next(20)); // 30
