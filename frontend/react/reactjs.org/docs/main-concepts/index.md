---
title: Main Concepts
---

## Hello World

In this guide, we will examine the building blocks of React apps: elements and components.

## Introducing JSX

JSX produces React “elements”.

리액트는 렌더링 로직이 UI 로직과 내재적으로 연관되었다는 사실을 받아들인다. 마크업과 로직을 서로 다른 파일에 위치시켜 이 둘을 인위적으로 분리하지 않고 리액트는 **component**라고 불리는 약하게 결합된 유닛을 통해 관심사를 분리한다.

[Separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)

[Pete Hunt: React: Rethinking best practices -- JSConf EU](https://www.youtube.com/watch?v=x7cQ3mrcKaY)

After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects.

JSX는 injection attack(XSS)을 방지한다. JSX에 임베드된 모든 값을 React DOM은 escape함. 모든 것들이 렌더 전에 문자열로 변환된다.

```jsx
// 아래는 모두 React element들
// You can think of them as descriptions of what you want to see on the screen

const element = <h1 className="greeting">Hello, world!</h1>;

const element = React.createElement('h1', { className: 'greeting' }, 'Hello, world!');

// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!',
  },
};
```

## Rendering Elements

React DOM takes care of updating the DOM to match the React elements.

React elements are immutable. Once you create an element, you can’t change its children or attributes. An element is like a single frame in a movie: it represents the UI at a certain point in time.

```jsx
// 이런 것도 된다.
const root = ReactDOM.createRoot(document.getElementById('root'));

function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element);
}

setInterval(tick, 1000);
// 실제로는 root.render는 한번만 부르고, 위와 같은 작업은 stateful component에 캡슐화도니다.
```

React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.

In our experience, thinking about how the UI should look at any given moment, rather than how to change it over time, eliminates a whole class of bugs.

## Components and Props

Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.

Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// extends 안하면 Warning: The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors.
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
const element = <Welcome name="Sara" />;
root.render(element);
// 1. We call root.render() with the <Welcome name="Sara" /> element.
// 2. React calls the Welcome component with {name: 'Sara'} as the props.
// 3. Our Welcome component returns a <h1>Hello, Sara</h1> element as the result.
// 4. React DOM efficiently updates the DOM to match <h1>Hello, Sara</h1>.
```

리액트는 소문자로 시작하는 컴포넌트를 DOM 태그로 간주한다. 직접 만든거는 무조건 대문자로 시작하기.

We recommend naming props from the component’s own point of view rather than the context in which it is being used.

A good rule of thumb is that if a part of your UI is used several times (Button, Panel, Avatar), or is complex enough on its own (App, FeedStory, Comment), it is a good candidate to be extracted to a separate component. 이 말은 여러곳에 적용할 수 있을 듯. 여러 군데에서 사용되는 것 외에도 복잡도를 낮추기 위해. 타입 정의할 때도 여러 곳에서 안쓰이더라도 복잡도를 낮추기 위해 쪼갤 수 있을 듯.

**All React components must act like pure functions with respect to their props.**

## State and Lifecycle

State is similar to props, but it is private and fully controlled by the component.

The render method will be called each time an update happens, but as long as we render <Clock /> into the same DOM node, only a single instance of the Clock class will be used. This lets us use additional features such as local state and lifecycle methods.

In applications with many components, it’s very important to free up resources taken by the components when they are destroyed. We want to set up a timer whenever the Clock is rendered to the DOM for the first time. This is called **mounting** in React. We also want to clear that timer whenever the DOM produced by the Clock is removed. This is called **unmounting** in React.

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  // These methods are called “lifecycle methods”.
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);

// When <Clock /> is passed to root.render(), React calls the constructor of the Clock component. Since Clock needs to display the current time, it initializes this.state with an object including the current time. We will later update this state.

// React then calls the Clock component’s render() method. This is how React learns what should be displayed on the screen. React then updates the DOM to match the Clock’s render output.

// When the Clock output is inserted in the DOM, React calls the componentDidMount() lifecycle method. Inside it, the Clock component asks the browser to set up a timer to call the component’s tick() method once a second.

// Every second the browser calls the tick() method. Inside it, the Clock component schedules a UI update by calling setState() with an object containing the current time. Thanks to the setState() call, React knows the state has changed, and calls the render() method again to learn what should be on the screen. This time, this.state.date in the render() method will be different, and so the render output will include the updated time. React updates the DOM accordingly.

// If the Clock component is ever removed from the DOM, React calls the componentWillUnmount() lifecycle method so the timer is stopped.
```

React may batch multiple setState() calls into a single update for performance. Because this.props and this.state may be updated asynchronously, you should not rely on their values for calculating the next state. To fix it, use a second form of setState() that accepts a function rather than an object.

setState에 다른 값을 가진 같은 객체를 전달하면?

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { a: { b: 1 } };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const c = this.state.a;
    c.b += 1;
    this.setState({
      a: c,
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>{this.state.a.b}</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);
```

## Handling Events

```jsx
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
// e는 synthetic event. 리액트 이벤트는 네이티브 이벤트와 정확히 똑같이 작동하시는 않는다.
```

When you define a component using an ES6 class, a common pattern is for an event handler to be a method on the class.

If you forget to bind this.handleClick and pass it to onClick, this will be undefined when the function is actually called.

```jsx
// public class field syntax를 사용하면 bind를 생략해도 된다.
// 혹은 arrow function. 다만 이경우 prop으로 전달되는거라면 콜백이 매번 생성되고 자식 컴포넌트가 추가적인 리렌더링을 하게 된다.
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  handleClick = () => {
    console.log('this is:', this);
  };
  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}
```

```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
// bind를 쓰면 추가적인 인수는 자동으로 전달된다
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

## Conditional Rendering

그나저나 아래처럼 써도 C의 상태가 유지되나??

```jsx
if ... {
  <A/>
  <B/>
  <C/>
} else {
  <A/>
  <C/>
}
```

```jsx
// <div>0</div>가 됨에 유의
render() {
  const count = 0;
  return (
    <div>
      {count && <h1>Messages: {count}</h1>}
    </div>
  );
}
```

In rare cases you might want a component to hide itself even though it was rendered by another component. To do this return null instead of its render output.

```jsx
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return <div className="warning">Warning!</div>;
}
```

이래도 lifecycle method는 불린다. componentDidUpdate 등.

## Lists and Keys

Keys help React identify which items have changed, are added, or are removed.

[Index as a key is an antipattern](https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/)

A good rule of thumb is that elements inside the map() call need keys.

Keys serve as a hint to React but they don’t get passed to your components.

## Forms

HTML form elements work a bit differently from other DOM elements in React, because form elements naturally keep some internal state.

리액트에서도 HTML같은 행동을 할 수 있지만 일반적으로 제출을 처리하는 JS 함수가 있고 사용자가 form에 입력한 정보에 접근할 수 있으면 좋다.

이럴 때 controlled component를 사용한다.

HTML에서 input, textarea, select는 각자의 상태를 갖는다. 리액트에서 상태는 컴포넌트의 state 프로퍼티에 담기며 setState()를 통해서만 바뀐다.

이 둘을 합쳐 react state를 single source of truth로 만들 수 있다.

> An input form element whose value is controlled by React in this way is called a “controlled component”.

With a controlled component, the input’s value is always driven by the React state.

```jsx
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'coconut' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select
            value={this.state.value}
            onChange={this.handleChange}
          >
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input
          type="submit"
          value="Submit"
        />
      </form>
    );
  }
}
```

```jsx
<input type="file" />
// 값이 read-only기에 React의 uncontrolled component이다.
```

```jsx
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    );
  }
}
```

value로 null이나 undefined를 넣으면 uncontrolled component가 되는 듯?

[Formik](https://formik.org)

## Lifting State Up

```jsx
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { temperature: '' };
  }

  handleChange(e) {
    this.setState({ temperature: e.target.value });
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange}
        />
        <BoilingVerdict celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}

// If the Calculator owns the shared state, it becomes the “source of truth” for the current temperature in both inputs.
```

Controlled component에서는 value와 onChange가 가장 일반적인 관례인듯.

Instead of trying to sync the state between different components, you should rely on the top-down data flow.

> Lifting state involves writing more “boilerplate” code than two-way binding approaches, but as a benefit, it takes less work to find and isolate bugs. Since any state “lives” in some component and that component alone can change it, the surface area for bugs is greatly reduced. Additionally, you can implement any custom logic to reject or transform user input.

> If something can be derived from either props or state, it probably shouldn’t be in the state.

## Composition vs Inheritance

Nesting children에는 <></>가 자동으로 붙는건가? 그냥 배열도 되는건가.

```jsx
// Specialization
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">{props.title}</h1>
      <p className="Dialog-message">{props.message}</p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!"
    />
  );
}
```

At Facebook, we use React in thousands of components, and we haven’t found any use cases where we would recommend creating component inheritance hierarchies.

## Thinking in React

1. UI를 컴포넌트 계층으로 나누기. 디자이너가 있다면 이미 해놨을수도! 포토샵 레이어 이름이 즉 컴포넌트 이름이 될 수 있다. SRP를 적용해보자. UI와 데이터 모델은 같은 information architecture로 묶여있을 수 있다.

2. 리액트로 정적인 버전 만들기. 정적 버전 만드는 것은 생각 없이 타이핑 많고, interactivity를 더하는 것은 생각 많고 타이핑 없으므로 두 프로세스를 나누는 것이 좋다. 이 단계에서는 state를 전혀 쓰지 말기. 간단한 프로젝트에서는 top-down, 큰 프로젝트에서는 테스트와 함께 bottom-up.

3. UI 상태에 대한 최소한의 표현 방법 찾기.

4. 상태가 위치할 곳 찾기. **React is all about one-way data flow down the component hierarchy.**

5. 반대 방향 데이터 흐름 추가하기. 고전적인 양방향 데이터 바인딩보다 타이핑을 좀 더 해야한다. onChange 관련인듯.

Remember that code is read far more often than it’s written, and it’s less difficult to read this modular, explicit code.
