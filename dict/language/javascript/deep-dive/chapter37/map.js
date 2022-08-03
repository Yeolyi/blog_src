// const map1 = new Map(['key1', 'value1'], ['key2', 'value2']);
// TypeError: Iterator value key1 is not an entry object

const map1 = new Map([['key1', 'value1'], ['key2', 'value2']]);
console.log(map1); // Map(2) { 'key1' => 'value1', 'key2' => 'value2' }

console.log(map1.size); // 2

map1.set('key3', 'value3');

// 키 타입에 제한이 없다. 
const key = { id: 1 }
map1.set(key, 'One');

console.log(map1.get(key)); // One
console.log(map1.get({ id: 1 })); // undefined

console.log(map1.has('key1')); // true

console.log(map1.delete('key4')); // false

map1.clear();

const map2 = new Map([['key1', 'value1'], ['key2', 'value2']]);
map2.forEach((v, k, map) => console.log(v, k, map));
/*
value1 key1 Map(2) { 'key1' => 'value1', 'key2' => 'value2' }
value2 key2 Map(2) { 'key1' => 'value1', 'key2' => 'value2' }
*/

console.log(Symbol.iterator in map2); // true

console.log(map2.keys()); // [Map Iterator] { 'key1', 'key2' }
console.log(map2.values()); // [Map Iterator] { 'value1', 'value2' }
console.log(map2.entries()); // [Map Entries] { [ 'key1', 'value1' ], [ 'key2', 'value2' ] }
