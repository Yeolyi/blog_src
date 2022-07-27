function Circle(radius) {
    this.radius = radius;
    this.getArea = function () {
        return Math.PI * this.radius ** 2;
    }
}

const circle1 = new Circle(10);
const circle2 = new Circle(12);
console.log(circle1.getArea === circle2.getArea);
// false

function BetterCircle(radius) {
    this.radius = radius
}

BetterCircle.prototype.getArea = function () {
    return Math.PI * this.radius ** 2;
}

const circle3 = new BetterCircle(10);
const circle4 = new BetterCircle(12);
console.log(circle3.getArea === circle4.getArea);
// true
