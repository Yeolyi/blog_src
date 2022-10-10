interface ABC {
  a: string;
  b: string;
  c: number;
}

// 함수 foo는 { a: 'a', b: 'b', c: 2, d: new Date()} 로도 호출될 수 있다.
function foo(abc: ABC) {
  for (const k in abc) {
    // const v = abc[k];
  }
}
