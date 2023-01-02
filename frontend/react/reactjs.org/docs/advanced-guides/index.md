---
title: Advanced Guides
---

## Accessiblity

읽어보라는 외부 링크가 많으니 한번 둘러보기.

```jsx
// aria-* 어트리뷰트는 hyphen-cased이다.
<input
  type="text"
  aria-label={labelText}
  aria-required="true"
  onChange={onchangeHandler}
  value={inputValue}
  name="name"
/>
```

Semantic HTML은 접근성의 기본이다. <div>가 semantic을 깨는 경우 React Fragment를 사용하는 것이 낫다.

모든 form control은 올바르게 라벨링되어야한다.

```jsx
<label htmlFor="namedInput">Name:</label>
<input id="namedInput" type="text" name="name"/>
```

키보드 사용자의 편의를 위해 네비게이션 섹션을 건너뛰는 기능을 제공하라.

리액트는 DOM을 지속적으로 건들기에 키보드 포커스를 잃을 수 있다. 포커스를 프로그램적으로 관리해야한다.

When using a HOC to extend components, it is recommended to forward the ref to the wrapped component using the forwardRef function of React?

Depending on only pointer and mouse events will break functionality for keyboard users.

등등...

## Code-Splitting

> **Bundling** is the process of following imported files and merging them into a single file: a “bundle”.

> **Code splitting**: To avoid winding up with a large bundle, it’s good to get ahead of the problem and start “splitting” your bundle. 여러 번들을 만들어 런타임에 동적으로 로드한다. 유저에게 필요한 것만 로드한다.

```jsx
// 웹팩은 이런 syntax를 만나면 자동적으로 code-splitting을 시작한다.
import('./math').then((math) => {
  console.log(math.add(16, 26));
});
```

React.lazy는 dynamic import를 일반 컴포넌트로서 렌더할 수 있도록 한다. 리액트 컴포넌트를 포함하는 default export 모듈로 resolve되는 Promise를 반환해야한다.

```jsx
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

```jsx
// 깜빡인다.
// fallback을 피해야하는 경우
import React, { Suspense } from 'react';
import Tabs from './Tabs';
import Glimmer from './Glimmer';

const Comments = React.lazy(() => import('./Comments'));
const Photos = React.lazy(() => import('./Photos'));

function MyComponent() {
  const [tab, setTab] = React.useState('photos');

  function handleTabSelect(tab) {
    setTab(tab);

    // startTransition API를 활용한다.
    // 리액트에게 'comment'로 바꾸는 과정이 긴급하지 않다 알리며, 리액트는 old UI를 보여주고 interactive하게 놔둔다.

    // startTransition(() => {
    //   setTab(tab);
    // });
  }

  return (
    <div>
      <Tabs onTabSelect={handleTabSelect} />
      <Suspense fallback={<Glimmer />}>{tab === 'photos' ? <Photos /> : <Comments />}</Suspense>
    </div>
  );
}
```

Code splitting을 어디서할지 헷갈리면 라우터 단위로 해보자.

React.lazy는 default export만 지원한다.

```jsx
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;

// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";

// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```

이를 통해 tree shaking이 잘 작동하도록 해 사용하지 않는 컴포넌트를 pull하지 않는다.

## Context

> **Context** provides a way to pass data through the component tree without having to pass props down manually at every level.

```jsx
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

// Now, we have:
<Page user={user} avatarSize={avatarSize} />
// ... which renders ...
<PageLayout userLink={...} />
// ... which renders ...
<NavigationBar userLink={...} />
// ... which renders ...
{props.userLink}
```

단순히 prop을 여러 계층 전달하는게 문제라면 composition으로 해결할 수 있다. 컴포넌트 자체를 전달해보자. **Inversion of control**. Such inversion, however, isn’t the right choice in every case; moving more complexity higher in the tree makes those higher-level components more complicated and forces the lower-level components to be more flexible than you may want.

Context lets you “broadcast” such data, and changes to it, to all components below.

```js
const MyContext = React.createContext(defaultValue);
```

createContext는 Context 객체를 만든다. 리액트가 해당 객체를 subscribe하는 컴포넌트를 렌더링하면 트리에서 가장 가까운 Provider에서 값을 가져온다. 함수에 건네준 값은 Provider를 찾을 수 없을 때 사용된다.

```js
<MyContext.Provider value={/* some value */}>
```

모든 Context 객체는 Provider 리액트 컴포넌트를 포함한다. context를 consume하는 컴포넌트가 context 변화를 감지할 수 있게 한다. Providers can be nested to override values deeper within the tree.

Context.Consumer는 쓰나?? class에서는 아니고 functional에서 useContext 없을 때 썼던 듯.

Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context.

If two or more context values are often used together, you might want to consider creating your own render prop component that provides both.

## Error Boundaries

Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>;
```

Top-level에 위치시켜 뭔가 잘못되었다는 메시지를 보이거나, 특정 위젯에 위치시켜 앱 전체가 터지는 것을 막을 수도 있다.

React16부터 error boundary에 잡히지 않은 에러가 있으면 전체 react component tree가 언마운트된다.

[@babel/plugin-transform-react-jsx-source](https://www.npmjs.com/package/@babel/plugin-transform-react-jsx-source)

try-catch는 명령적 코드에만 작동하지만 리액트 컴포넌트는 선언적이다. Error boundary가 해결책.

Event handler는 잡지 못하는데, 여기서 에러가 발생해도 무엇을 렌더링할지 확실하기 때문이다.

## Forwarding Refs

> Ref forwarding is an opt-in feature that lets some components take a ref they receive, and pass it further down (in other words, “forward” it) to a child.

컴포넌트의 캡슐화가 leaf component에는 불편할 수도 있다.

```js
// button 반환하니 될 것 같아도 안되는 듯? 리액트에서 따로 관리해서 그런가봄.
// Regular function or class components don’t receive the ref argument, and ref is not available in props either.
const FancyButton = React.forwardRef((props, ref) => <button ref={ref}>{props.children}</button>);

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

ref is not a prop. Like key, it’s handled differently by React.

## Fragments

> Fragments let you group a list of children without adding extra nodes to the DOM.

key is the only attribute that can be passed to Fragment.

## Higher-Order Components

> A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature.

> a higher-order component is a function that takes a component and returns a new component.

[Mixins Considered Harmful](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html)

```jsx
// This function takes a component...
function withSubscription(WrappedComponent, selectData) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props),
      };
    }

    componentDidMount() {
      // ... that takes care of the subscription...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props),
      });
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <WrappedComponent
          data={this.state.data}
          {...this.props}
        />
      );
    }
  };
}

const CommentListWithSubscription = withSubscription(CommentList, (DataSource) =>
  DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(BlogPost, (DataSource, props) =>
  DataSource.getBlogPost(props.id)
);
```

상속을 사용하지 않고 original 컴포넌트를 container 컴포넌트에 wrapping하는 compose를 사용했음을 유넘.

HOC는 정보가 어떻게 사용되는지 신경쓰지 않고 wrapped 컴포넌트는 데이터가 어디서 왔는지 신경쓰지 않는다.

Mutating HOC는 피하라.

```jsx
// connect is a function that returns another function
const enhance = connect(commentListSelector, commentListActions);
// The returned function is a HOC, which returns a component that is connected
// to the Redux store
const ConnectedComment = enhance(CommentList);
// connect는 HOC를 뱉는 고차 함수이다.
// connect가 뱉는 Component => Component 함수는 입력과 출력이 같기에 compose하기에 용이하다.

const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent));
// ... you can use a function composition utility
// compose(f, g, h) is the same as (...args) => f(g(h(...args)))
const enhance = compose(
  // These are both single-argument HOCs
  withRouter,
  connect(commentSelector)
);
```

리액트의 diffing 알고리즘이 component identity를 사용하기에 렌더 함수 내부에서 HOC를 사용하면 안된다. state가 사라짐.

## Integrating with Other Libraries

PASS

## JSX In Depth

User-defined 컴포넌트인데 소문자로 시작하면 html 태그로 오해한다.

```jsx
// JSX 타입은 표현식일 수 없다.
<components[props.storyType] story={props.story} />;
```

if문과 for루프는 표현식이 아니기에 JSX 내부에서 바로 사용될 수 없다.

```jsx
// When you pass a string literal, its value is HTML-unescaped. So these two JSX expressions are equivalent???
<MyComponent message="&lt;3" />
<MyComponent message={'<3'} />
```

In general, we don’t recommend not passing a value for a prop, because it can be confused with the ES6 object shorthand.

Spread 문법은 유용하지만 불필요한 prop이나 유효하지 않은 HTML 어트리뷰트를 전달할 수 있다. 가끔씩만 사용하기.

리액트 컴포넌트는 element의 배열을 반환할 수도 있다.

[React: <React.Fragment> vs array](https://stackoverflow.com/questions/55236346/react-react-fragment-vs-array)

```jsx
// string template 대신에 이렇게 쓸 수도 있다.
<div>Hello {props.addressee}!</div>
```

false, null, undefined, true가 모두 유효한 children이기에 conditional render에서 유용하게 사용된다.

```jsx
<div>
  {showHeader && <Header />}
  <Content />
</div>

// 하지만 0과 같은 falsy value는 렌더링되니 조심
<div>
  {props.messages.length &&
    <MessageList messages={props.messages} />
  }
</div>
```

## Optimizing Performance

웹팩 등 이런저런 minifier별 적용법.

[Introducing the React Profiler](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html)

[react-window](https://react-window.now.sh/)

[Twitter Lite and High Performance React Progressive Web Apps at Scale](https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3)

When a component’s props or state change, React decides whether an actual DOM update is necessary by comparing the newly returned element with the previously rendered one.

If your React component’s render() function renders the same result given the same props and state, you can use [React.PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent) for a performance boost in some cases.

Most of the time, you can use React.PureComponent instead of writing your own shouldComponentUpdate.

[Immer](https://github.com/mweststrate/immer)

## Portals

> Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

child를 가장 가까운 parent node가 아닌 DOM에서 다른 위치에 삽입하는 것이 유용할 떄가 있다.

부모 컴포넌트가 overflow: hidden이나 z-index를 가지고 있지만 이를 break out해야할 때 주로 사용된다.

portal을 사용할 때 키보드 포커스를 관리하는 것이 매우 중요해짐을 기억하자.

[Learn React Portals by example](https://blog.logrocket.com/learn-react-portals-example/)

## Profiler API

> The Profiler measures how often a React application renders and what the “cost” of rendering is.

onRender 콜백을 받아 트리 내에 컴포넌트가 변경사항을 commit할 때마다 실행한다.

## React Without ES6

PASS

## React Without JSX

PASS

## Reconcilation

> This article explains the choices we made in React’s “diffing” algorithm so that component updates are predictable while being fast enough for high-performance apps.

[A Survey on Tree Edit Distance and Related Problems](https://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf)

한 트리에서 다른 트리로 최소한의 연산으로 갈 수 있는 방법을 계산하는 일반적인 알고리즘은 O(n^3)이라서 느리다.

따라서 리액트는 휴리스틱을 활용해 O(n) 알고리즘을 사용한다.

- 다른 타입의 두 element는 다른 트리를 만든다.
- 서로 다른 렌더간 어떤 자식 element가 stable한지를 key를 통해 힌트를 줄 수 있다.

같은 타입의 DOM 요소면 attribute만 바꾼다.

같은 타입의 컴포넌트 요소면 인스턴스가 유지된다. state가 유지됐었나??

```jsx
import React, { useState } from 'react';

export const App = () => {
  const [state, setState] = useState(false);
  return (
    <>
      <button onClick={() => setState(!state)}>ASD</button>
      {state ? <Children value={0} /> : <Children value={1} />}
    </>
  );
};

const Children = ({ value }) => {
  console.log(value);
  const [state, setState] = useState(value);
  return <p>{state}</p>;
};
```

휴리스틱을 활용하기 때문에 아래 가정에 부합하지 않으면 성능이 떨어질 수 있다.

- 서로 다른 타입의 컴포넌트간 subtree를 비교하지는 않는다.
- key값은 stable, predictable, unique해야한다.

## Refs and the DOM

일반적으로 parent component가 children과 소통하기 위해서는 prop을 사용한다.

Child를 명령적으로 수정하기 위한 escape hatch가 ref이다.

```jsx
// 갑자기 생각나서 ㅋ
import React, { useState } from 'react';

export const App = () => {
  const [state, setState] = useState(false);
  if (state) {
    return (
      <>
        <Children value={0} />
        <button onClick={() => setState((x) => !x)}>Change</button>
      </>
    );
  } else {
    return (
      <>
        <p>ASD</p>
        <Children value={10} />
        <button onClick={() => setState((x) => !x)}>Change</button>
      </>
    );
  }
};

export const App2 = () => {
  const [state, setState] = useState(false);
  return (
    <>
      {state && <p>ASD</p>}
      <Children value={0} />
      <button onClick={() => setState((x) => !x)}>Change</button>
    </>
  );
};

const Children = ({ value }) => {
  console.log(value);
  const [state, setState] = useState(value);
  return <p>{state}</p>;
};
```

You may not use the ref attribute on function components because they don’t have instances.

ref updates happen before componentDidMount or componentDidUpdate lifecycle methods.

함수 컴포넌트에서 쓰고싶으면 forwardRef를 사용해야한다. useImperativeHandle?

Ref forwarding lets components opt into exposing any child component’s ref as their own.

callback refs 패스,,,

## Render Props

```jsx
<DataProvider render={(data) => <h1>Hello {data.target}</h1>} />
```

this.props.render(this.state)를 통해 필요한 정보를 건네며 렌더링할 수 있다.

A render prop is a function prop that a component uses to know what to render.

## Static Type Checking

PASS

## Strict Mode

Production build에 영향을 주지 않는다.

```jsx
<React.StrictMode>
  <div>
    <ComponentOne />
    <ComponentTwo />
  </div>
</React.StrictMode>
```

예상하지 못한 side effect를 감지할 수 있다.

리액트는 두단계로 작동한다. Render 단계에서는 (브라우저의 경우) DOM에 어떤 변경을 주어야하는지 결정한다. render 함수를 호출해 이전 render와 결과를 비교한다. Commit 단계에서는 변경사항을 적용한다. lifecycle 함수도 이때 불린다. Commit은 빠르지만 render는 비교적 느린데 브라우저가 blocking되는 것을 막기 위해 concurrent mode를 개발중이다. 이는 리액트가 render phase lifecycle을 commit 전에 한 번 이상, 혹은 commit도 하기 전에 호출할 수 있음을 의미한다? 이때문에 lifecycle 함수들은 side effect가 없어야한다. 이를 감지하기 위해 몇몇 함수를 여러번 호출한다.

With Strict Mode starting in React 18, whenever a component mounts in development, React will simulate immediately unmounting and remounting the component:

## Typechecking With PropTypes

PASS

## Uncontrolled Components

> In most cases, we recommend using controlled components to implement forms. In a controlled component, form data is handled by a React component. The alternative is uncontrolled components, where form data is handled by the DOM itself.

[Controlled and uncontrolled form inputs in React don't have to be complicated](https://goshacmd.com/controlled-vs-uncontrolled-inputs-react/)

Uncontrolled component인데 초기값은 지정해주고 싶을 때 defaultValue 어트리뷰트를 활용하면 된다.

## Web Components

[Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
