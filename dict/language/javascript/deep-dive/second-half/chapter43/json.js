const obj = {
    a: 1,
    b: true,
    c: 'string',
    d: ['a', 'r', 'r']
}

console.log(JSON.stringify(obj));
/*
{"a":1,"b":true,"c":"string","d":["a","r","r"]}
*/

// param: value, replacer, string
// replacer 함수가 undefined를 반환하면 변환하지 않는다. 
const json = JSON.stringify(obj, null, 2); 
console.log(json);
/*
{
  "a": 1,
  "b": true,
  "c": "string",
  "d": [
    "a",
    "r",
    "r"
  ]
}
*/

console.log(JSON.parse(json));
// { a: 1, b: true, c: 'string', d: [ 'a', 'r', 'r' ] }