const arr1 = [1];
arr1.length = 3;
console.log(arr1); // [ 1, <2 empty items> ]
console.log(Object.keys(arr1)); // [ '0' ]
