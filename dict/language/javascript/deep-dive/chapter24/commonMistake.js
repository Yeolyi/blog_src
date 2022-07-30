var funcs = [];
for (var i = 0; i < 3; i++) {
    // funcs[i] = function () { return i; }; i는 전역변수이므로 아래에서 3 3 3 이 출력된다. 
    funcs[i] = (function (x) {
        return function () {
            return x;
        }
    }(i))
    // 사실 그냥 let을 쓰는게 더 깔끔하기는 하다.
    // let으로 선언하면 for의 코드블록이 반복 실행될 때마다 for문 코드블럭의 새로운 렉시컬 환경이 생성된다. 
    // LOOP Lexical Environment -> Per-Iteration Lexical Environment
}

for (var j = 0; j < funcs.length; j++) {
    console.log(funcs[j]());
}
