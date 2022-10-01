const uri = "https://yeolyi.dev/언어/모던 자바스크립트";
const encoded = encodeURI(uri);
console.log(encoded);
// https://yeolyi.dev/%EC%96%B8%EC%96%B4/%EB%AA%A8%EB%8D%98%20%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8
const decoded = decodeURI(encoded);
console.log(decoded);
// https://yeolyi.dev/언어/모던 자바스크립트
console.log(decodeURI(decoded)); // 그대로
console.log(encodeURI(encoded));
// https://yeolyi.dev/%25EC%2596%25B8%25EC%2596%25B4/%25EB%25AA%25A8%25EB%258D%2598%2520%25EC%259E%2590%25EB%25B0%2594%25EC%258A%25A4%25ED%2581%25AC%25EB%25A6%25BD%25ED%258A%25B8

// encodeURIComponent는 쿼리 스트링 구분자까지 인코딩한다.
