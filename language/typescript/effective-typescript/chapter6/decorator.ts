class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  // Angular framework를 위해 추가됨
  // 표준화되기 전까지는 지양하기
  @logged
  // @ts-ignore
  greet() {
    // Experimental support for decorators is a feature that is subject to change in a future release.
    return 'Hello, ' + this.greeting;
  }
}

function logged(target: any, name: string, descriptor: PropertyDescriptor) {
  const fn = target[name];
  descriptor.value = function () {
    console.log(`Calling ${name}`);
    return fn.apply(this, arguments);
  };
}

console.log(new Greeter('Dave').greet());
