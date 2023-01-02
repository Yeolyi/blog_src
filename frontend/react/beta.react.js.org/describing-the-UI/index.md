---
title: Describing the UI
---

```jsx
let guest = 0;

function Cup() {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
```

2 4 6으로 뜸. 왜???

### Your First Component

You can even jumpstart your project with the thousands of components shared by the React open source community like Chakra UI and Material UI.

> a React component is a JavaScript function that you can sprinkle with markup.

React components are regular JavaScript functions, but their names must start with a capital letter or they won’t work!

소문자로 시작하면 HTML 태그로 간주되는 듯?

return과 다른 줄에 있으면 괄호를 반드시 붙여야 한다.

[What are the rules for JavaScript's automatic semicolon insertion (ASI)?](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi)

Frameworks like Next.js take this a step further. Instead of using an empty HTML file and letting React “take over” managing the page with JavaScript, they also generate the HTML automatically from your React components. This allows your app to show some content before the JavaScript code loads. 무슨 뜻일까,,,

### Importing and Exporting Components

If you use a framework with file-based routing, such as Next.js, your root component will be different for every page.

Either './Gallery.js' or './Gallery' will work with React, though the former is closer to how native ES Modules work.

A file can have no more than one default export, but it can have as many named exports as you like.

### Writing Markup with JSX

But as the Web became more interactive, logic increasingly determined content. JavaScript was in charge of the HTML! This is why in React, **rendering logic and markup live together** in the same place—components.

React Fragment - JSX looks like HTML, but under the hood it is transformed into plain JavaScript objects. You can’t return two objects from a function without wrapping them into an array. This explains why you also can’t return two JSX tags without wrapping them into another tag or a fragment.

### Javascript in JSX with Curly Braces

Any JavaScript expression will work between curly braces, including function calls.

### Passing Props to a Component

React components use props to communicate with each other.

> Props are the information that you pass to a JSX tag.

React component functions accept a single argument, a props object:

```jsx
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

Use spread syntax with restraint. If you’re using it in every other component, something is wrong. Often, it indicates that you should split your components and pass children as JSX.

When you nest content inside a JSX tag, the parent component will receive that content in a prop called children

Props are immutable. When a component needs to change its props, it will have to “ask” its parent component to pass it different props - a new object. **Don’t try to “change props”.**

### Conditional Rendering

In practice, returning null from a component isn’t common because it might surprise a developer trying to render it. More often, you would conditionally include or exclude the component in the parent component’s JSX.

But JSX elements aren’t “instances” because they don’t hold any internal state and aren’t real DOM nodes. They’re lightweight descriptions, like blueprints. 따라서 if...else에서 각각 반환하는 객체는최종적으로 완전히 동일하다.

React considers false as a “hole” in the JSX tree, just like null or undefined, and doesn’t render anything in its place.

### Rendering Lists

JSX elements directly inside a map() call always need keys. A well-chosen key helps React infer what exactly has happened, and make the correct updates to the DOM tree.

```jsx
import { Fragment } from 'react';

// 각 리스트의 아이템이 여러 DOM 노드들을 렌더해야할 떄.

const listItems = people.map((person) => (
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
));
```

Index as a key often leads to subtle and confusing bugs. Not only is this slow, but it will also lose any user input inside the list items?? 유저 인풋은 어떤 뜻일까.

Note that your components won’t receive key as a prop. It’s only used as a hint by React itself.

### Keeping Components Pure

React assumes that every component you write is a pure function.

Now your component is pure, as the JSX it returns only depends on the guest prop.

React offers a “Strict Mode” in which it calls each component’s function twice during development. 이래서 위에 예제에서 1 2 3이 아닌 2 4 6이 나온 것.

It’s completely fine to change variables and objects that you’ve just created while rendering. 컴포넌트 내부에서 생성한걸 바꾸는 것은 괜찮다. Local mutation이라 함.

Side effect는 보통 렌더링 중이 아니라 on the side(비밀스럽게?) 발생한다.

리액트에서 side effect는 보통 이벤트 핸들러 내부에서 발생한다. 이벤트는 핸들러가컴포넌트 내부에서 정의되었다해도 렌더링중에 발생하지 않기 때문에 순수할 필요가없다.

적합한 이벤트 핸들러를 찾지 못했으면 useEffect를 사용할 수 있지만 마지막 수단이되어야 한다. **가능한한 렌더링만으로 로직을 표현하라.**

이 챕터는 다시 읽어보면 좋을 듯.

**왜 리액트는 purity를 신경쓸까?**

- 다양한 환경에서 동일하게 동작한다.
- 입력이 같으면 렌더링을 건너뛰어 성능을 최적화할 수 있다.
- 렌더링 중 데이터가 바뀌면 기존 렌더링을 즉시 중단해도 상관 없다.

You should not mutate any of the inputs that your components use for rendering. That includes props, state, and context. To update the screen, “set” state instead of mutating preexisting objects.

sort는 원본 배열을 mutate시킨다.
