function* getFunc() {
    try {
        yield 1;
        yield 2;
        yield 3;
    } catch (e) {
        console.error(e);
    }
}

const g = getFunc();
console.log(g.next()); // { value: 1, done: false }
console.log(g.return('End!')); // { value: 'End!', done: true }
console.log(g.next()); // { value: undefined, done: true }
console.log(g.throw('Error!')); // 책이랑 다르게 프린트 없이 터짐 왜?
