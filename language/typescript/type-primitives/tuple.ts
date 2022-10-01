const notTuple = ["Not Found", 404];
// const notTuple: (string | number)[]

const tuple: [string, number] = ["{}", 200];
// const tuple: [string, number]

const tuple2: [number, number] = [1, 2];
// 아래 둘 다 가능,,, 근데 쓸까?
// const unknownLengthTuple: [string, ...[...number[]][]] = ['Hello', tuple2, tuple2];
const unknownLengthTuple: [string, ...number[][]] = ["Hello", tuple2, tuple2];
