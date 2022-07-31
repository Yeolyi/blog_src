const arr = [];
console.time('Array Performance Test');
for (let i = 0; i < 10000000; i++)
    arr1[i] = i;
console.timeEnd('Array Performance Test'); // 363.789ms

const obj = {};
console.time('Object Performance Test');
for (let i = 0; i < 10000000; i++)
    obj[i] = i;
console.timeEnd('Object Performance Test'); // 533.267ms
