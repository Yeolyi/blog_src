interface Vector2D {
    x: number;
    y: number;
}

function calculateLength(v: Vector2D) {
    return Math.sqrt(v.x ** 2 + v.y ** 2);
}

// Structural typing이 여기서는 장점이지만...
interface NamedVector {
    name: string;
    x: number;
    y: number;
}
// 여기서는 뒷통수를 때린다.
interface Vector3D {
    x: number;
    y: number;
    z: number;
}

// Sealed 혹은 precise 타입은 TS에서는 표현할 수 없다. 
// TS에서 타입은 open되어있고 생각해보지 못한 애들이 들어있을 수 있다.
function calculateLength2(v: Vector2D) {
    for (const axis of Object.keys(v)) {
        axis; // type: string
    }
}
