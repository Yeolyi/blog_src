// ArrayLike: length와 numeric index가 끝
function checkedAccess<T>(xs: ArrayLike<T>, i: number): T {
  if (i < xs.length) {
    return xs[i];
  }
  throw new Error(`Attempt to access ${i} which is part end of array.`);
  // Error 던지면 return이 없어도 반환값으로 뭐라 하지 않는구나
}

checkedAccess({ '0': 'A', '1': 'B', length: 2 }, 2);
