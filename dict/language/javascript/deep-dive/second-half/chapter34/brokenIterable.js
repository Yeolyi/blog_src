const obj = { x: 1 };
obj[Symbol.iterator] = () => ({
    next() {
        return {}; 
    }
})

for (let x of obj) {
    console.log(x);
}

// 위 상황에서는 undefined가 계속 불리고, (done이 undefined라서 false로 평가?)
// next가 없으면 undefined를 호출할 수 없다고 하며, 
// next가 아무것도 반환하지 않으면 TypeError: Iterator result undefined is not an object
