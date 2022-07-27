const parent = {};
const child = {};
child.__proto__ = parent;
parent.__proto__ = child;
// TypeError: Cyclic __proto__ value
// 프로토타입 체인을 단방향 연결 리스트로 유지시키기 위해 __proto__ 접근자 프로퍼티를 통한 접근을 강제한다. 