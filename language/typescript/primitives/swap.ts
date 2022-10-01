// TypeScript will take into account the position of the
// anys in different forms
function swap(x: [number, string]): [string, number] {
  return [x[1], x[0]];
}

const pair: [any, any] = [1, "hello"];
console.log(swap(pair));
