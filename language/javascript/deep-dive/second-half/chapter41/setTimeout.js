const timerID = setTimeout((x) => console.log(x * 2), 1000, 2);
console.log(timerID); // 브라우저에서는 숫자, Node.js에서는 객체
clearTimeout(timerID); // 프로그램이 즉시 종료
