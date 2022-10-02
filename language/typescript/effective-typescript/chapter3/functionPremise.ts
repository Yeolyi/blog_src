type Obj = { a: number | null };
function fn(p: Obj) {
  p.a = null;
}

const obj: Obj = { a: 1 };
if (obj.a) {
  fn(obj);
  obj.a; // 타입은 여전히 number로 뜬다.
}

// TS makes the pragmatic choice to assume the function does not invalidate its type refinements.
// 그러지 않았다면 함수 호출할 때마다 타입 체크를 다시 해야됨.
