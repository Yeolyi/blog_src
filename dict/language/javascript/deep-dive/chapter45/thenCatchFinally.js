// then은 언제나 promise를 반환한다. 
const a = new Promise(resolve => resolve('fulfilled'))
    .then(v => console.log(v), e => console.error(e));
console.log(a); // fulfilled

const b = new Promise((_, reject) => reject(new Error('rejected')))
    .then(v => console.log(v), e => console.error(e)) // Error: rejected
    .catch(e => console.log(e)) // reject된 상태에만 실행된다. 여기서는 실행 안됨. then(undefined, onRejected)와 같다. 
    .finally(() => console.log('bye!')) // 프로미스 상태 상관없이 한번만 실행된다. 
console.log(b) // 실행 안됨
