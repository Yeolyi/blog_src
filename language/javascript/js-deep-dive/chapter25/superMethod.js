class Phone {
  constructor(number) {
    this.number = number;
  }
  call() {
    return `calling ${this.number}...`;
  }
}

class iPhone extends Phone {
  call() {
    // return `${super.call()} by iPhone`;
    const __super = Object.getPrototypeOf(iPhone.prototype);
    return `${__super.call.call(this)} by iPhone`;
    // 어떤 call인지 잘 찾아서 불러주네?
    // 그냥 실행하면 this에 Phone.prototype이 바인딩 됨.
  }
}

const phone = new iPhone('010-1234-5678');
console.log(phone.call());
