class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    get size() {
        return this.width * this.height;
    }
    set size(size) {
        let ratio = Math.sqrt(size / this.size);
        this.width *= ratio;
        this.height *= ratio;
    }
}

const rect = new Rectangle(2, 3);
console.log(rect.size);
rect.size = 24;
console.log(rect.width, rect.height);

console.log(Object.getOwnPropertyNames(rect)); // width, height
console.log(Object.getOwnPropertyNames(Rectangle.prototype)); // constructor, size
