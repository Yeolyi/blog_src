---
title: Docs
---

## Installation

### Add React to a Website

The majority of websites aren’t, and don’t need to be, single-page apps. With a few lines of code and no build tooling, try React in a small part of your website.

You can place a “container” <div> anywhere inside the <body> tag. You may have as many independent DOM containers on one page as you need. They are usually empty — React will replace any existing content inside DOM containers.

[예시](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605)

[여러 render 예시](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605)

[terser](https://github.com/terser/terser)

아래를 통해 JSX를 빠르게 사용해볼 수 있다.

```jsx
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
// 이후 JSX가 있는 script 태그를 type="text/babel"로 설정
// 느림
```

```bash
npm install babel-cli@6 babel-preset-react-app@3
npx babel --watch src --out-dir . --presets react-app/prod
```

[npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)

### Create a New React App

A JavaScript build toolchain typically consists of:

- A package manager, such as Yarn or npm. It lets you take advantage of a vast ecosystem of third-party packages, and easily install or update them.
- A bundler, such as webpack or Parcel. It lets you write modular code and bundle it together into small packages to optimize load time.
- A compiler such as Babel. It lets you write modern JavaScript code that still works in older browsers.

[Creating a React App… From Scratch](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658)

### CDN Links

crossorigin 세팅을 추천. 더 나은 에러 핸들링 경험을 준다??

```html
<script
  crossorigin
  src="..."
></script>
```

## Main Concepts

### Hello World

In this guide, we will examine the building blocks of React apps: elements and components.

### Introducing JSX

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

### Rendering Elements

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

### Components and Props

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

### State and Lifecycle

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


## Advanced Guides

## API Reerence

## Hooks

## Testing

## Contributing

## FAQ
