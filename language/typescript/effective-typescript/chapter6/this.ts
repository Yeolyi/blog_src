class C {
  vals = [1, 2, 3];
  logSquares() {
    for (const val of this.vals) {
      console.log(val * val);
    }
  }
}

const c = new C();
c.logSquares();
const method = c.logSquares;
method(); // Cannot read properties of undefined

// c.logSquares는 C.prototype.logSquares를 호출하고 호출된 함수의 this를 c로 바인딩하는 두가지 일을 한다.
// logSquares의 참조를 꺼냄으로서 this가 undefined가 되어버린다.

method.call(c); // this를 명시해 문제를 해결할 수 있다.

// this의 이러한 성질은 API에서 많이 활용된다.
document.querySelector('input')!.addEventListener('change', function (e) {
  console.log(this); // 이벤트가 fire된 element를 로깅한다.
});

class ResetButton {
  // onClick만 있으면 ResetButton.prototype의 프로퍼티로서 onClick이 정의된다.
  // constructor의 구문을 통해 인스턴스 프로퍼티로 onClick을 바꾼다.
  // 이후 lookup sequence에서 인스턴스 프로퍼티가 우선된다.
  // 화살표 함수를 사용하면 ResetButton이 생성될 때마다 this가 적합한 값으로 세팅된다.
  constructor() {
    this.onClick = this.onClick.bind(this);
  }
  render() {
    // @ts-ignore
    return makeButton({ text: 'Reset', onClick: this.onClick });
  }
  onClick() {
    alert(`Reset ${this}`);
  }
}

function addKeyListener(
  el: HTMLElement,
  // TS 사용법
  fn: (this: HTMLElement, e: KeyboardEvent) => void
) {
  el.addEventListener('keydown', (e) => {
    fn.call(el, e);
  });
}
