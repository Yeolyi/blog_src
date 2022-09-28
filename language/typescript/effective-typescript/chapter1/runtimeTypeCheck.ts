interface Square {
    width: number;
}
interface Rectangle extends Square {
    height: number;
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
    // 'Rectangle' only refers to a type, but is being used as a value here.
    // if (shape instanceof Rectangle) {
    // }
    if ('height' in shape) {
        shape // type: Rectangle
    }
    // 아니면 kind: 'square'처럼 태그를 넣어놓는 것도 방법.
    // 이때 Shape는 tagged union이 된다. TS에서 널리 사용됨. 
}
