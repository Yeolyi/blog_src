const arr1 = [1, 2, 3];
console.log(arr1.length); // 3
console.log(arr1.constructor === Array); // true
console.log(Object.getPrototypeOf(arr1) === Array.prototype); // true
