let createBall = (diameter: number) => ({ diameter });
let createSphere = (diameter: number, useInches: boolean) => {
    return { diameter: useInches ? diameter * 0.39 : diameter };
};

createSphere = createBall;
// createBall = createSphere; 할당 불가

// TypeScript will discard the boolean in the first assignment because it's very common for JavaScript code to skip passing params when they're not needed.

// 리턴 타입도 유사한 규칙이 적용
let createRedBall = (diameter: number) => ({ diameter, color: "red" });

createBall = createRedBall;
// createRedBall = createBall; 할당 불가
