---
title: Learn React
---

## Installation

### Start a New React Project

> React is a library that lets you organize UI code by breaking it apart into pieces called components. 

React doesn’t take care of routing or data management.

```
npx create-react-app my-app
```

튜토리얼에서는 npm대신에 npx를 쓰네?

## Quick Start

React apps are made out of components. 

> A component is a piece of the UI (user interface) that has its own logic and appearance.

React component names must always start with a capital letter.

### Conditional rendering

If you prefer more compact code, you can use the conditional ? operator. Unlike if, it works inside JSX.

When you don’t need the else branch, you can also use a shorter logical && syntax.

```jsx
<div>
  {isLoggedIn && <AdminPanel />}
</div>
```

### Responding to events

Do not call the event handler function: you only need to pass it down. React will call your event handler when the user clicks the button.

```jsx
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

### Updating the screen

Often, you’ll want your component to “remember” some information and display it.

If you render the same component multiple times, each will get its own state.

### Using Hooks

Functions starting with use are called Hooks.

Hooks are more restrictive than regular functions. You can only call Hooks at the **top level** of your components (or other Hooks). If you want to useState in a condition or a loop, extract a new component and put it there.

state를 상위 컴포넌트로 옮김으로서 컴포넌트간 상태를 공유할 수 있다. This is called “lifting state up”. 

### Thinking in React

**Break the UI into a component hierarchy**

**Build a static version in React**

It’s often easier to build the static version first and then add interactivity separately. 

In simpler examples, it’s usually easier to go top-down, and on larger projects, it’s easier to go bottom-up.

**Find the minimal but complete representation of UI state**

Think of state as the minimal set of changing data that your app needs to remember. Figure out the absolute minimal representation of the state your application needs and compute everything else on-demand. 

State의 기준
- Does it remain unchanged over time? If so, it isn’t state.
- Is it passed in from a parent via props? If so, it isn’t state.
- Can you compute it based on existing state or props in your component? If so, it definitely isn’t state!

Props are like arguments you pass to a function.

State is like a component’s memory.

**Identify where your state should live**

Remember: React uses one-way data flow, passing data down the component hierarchy from parent to child component.

If you can’t find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common parent component.

Hooks let you “hook into” a component’s render cycle. 

```jsx
<label>
    <input 
        type="checkbox" 
        checked={inStockOnly} 
    />
    {' '}
    Only show products in stock
</label>
// whitespace는 사라지니까 빈칸은 이렇게??
```

## Describing the UI

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
  )
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

But JSX elements aren’t “instances” because they don’t hold any internal state and aren’t real DOM nodes. They’re lightweight descriptions, like blueprints. 따라서 if...else에서 각각 반환하는 객체는 최종적으로 완전히 동일하다. 

React considers false as a “hole” in the JSX tree, just like null or undefined, and doesn’t render anything in its place.

### Rendering Lists

JSX elements directly inside a map() call always need keys. A well-chosen key helps React infer what exactly has happened, and make the correct updates to the DOM tree.

```jsx
import { Fragment } from 'react';

// 각 리스트의 아이템이 여러 DOM 노드들을 렌더해야할 떄. 

const listItems = people.map(person =>
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
);
```

Index as a key often leads to subtle and confusing bugs. Not only is this slow, but it will also lose any user input inside the list items?? 유저 인풋은 어떤 뜻일까. 

Note that your components won’t receive key as a prop. It’s only used as a hint by React itself. 

### Keeping Components Pure

React assumes that every component you write is a pure function. 

Now your component is pure, as the JSX it returns only depends on the guest prop.

React offers a “Strict Mode” in which it calls each component’s function twice during development. 이래서 위에 예제에서 1 2 3이 아닌 2 4 6이 나온 것. 

It’s completely fine to change variables and objects that you’ve just created while rendering. 컴포넌트 내부에서 생성한걸 바꾸는 것은 괜찮다. Local mutation이라 함. 

Side effect는 보통 렌더링 중이 아니라 on the side(비밀스럽게?) 발생한다. 

리액트에서 side effect는 보통 이벤트 핸들러 내부에서 발생한다. 이벤트는 핸들러가 컴포넌트 내부에서 정의되었다해도 렌더링중에 발생하지 않기 때문에 순수할 필요가 없다. 

적합한 이벤트 핸들러를 찾지 못했으면 useEffect를 사용할 수 있지만 마지막 수단이 되어야 한다. **가능한 한 렌더링만으로 로직을 표현하라.**

이 챕터는 다시 읽어보면 좋을 듯.

**왜 리액트는 purity를 신경쓸까?**

- 다양한 환경에서 동일하게 동작한다. 
- 입력이 같으면 렌더링을 건너뛰어 성능을 최적화할 수 있다. 
- 렌더링 중 데이터가 바뀌면 기존 렌더링을 즉시 중단해도 상관 없다. 

You should not mutate any of the inputs that your components use for rendering. That includes props, state, and context. To update the screen, “set” state instead of mutating preexisting objects.

sort는 원본 배열을 mutate시킨다. 

## Adding Interactivity

>  In React, data that changes over time is called state.

### Responding to Events

By convention, it is common to name event handlers as **handle** followed by the event name. 

[Everything you need to know about Design Systems](https://uxdesign.cc/everything-you-need-to-know-about-design-systems-54b109851969)

All events propagate in React except onScroll, which only works on the JSX tag you attach it to.

```jsx
e.stopPropagation();
```

자식 요소의 이벤트를 잡고 싶으면...


```jsx
<div onClickCapture={() => { /* this runs first */ }}>
  <button onClick={e => e.stopPropagation()} />
  <button onClick={e => e.stopPropagation()} />
</div>
```

1. 아래로 내려가며 모든 onClickCapture 호출
2. 눌린 요소의 onClick 실행
3. 위로 올라가며 모든 onClick 실행

Explicitly calling an event handler prop from a child handler is a good alternative to propagation.

```jsx
 e.preventDefault();
```

**Event handlers are the best place for side effects.** However, in order to change some information, you first need some way to store it. In React, this is done by using state, a component’s memory. You will learn all about it on the next page.

### State: A Component's Memory

> React, this kind of component-specific memory is called **state**.

1. Local variables don’t persist between renders.
2. Changes to local variables won’t trigger renders.

> Hooks are special functions that are only available while React is rendering.


Hooks are functions, but it’s helpful to think of them as unconditional declarations about your component’s needs. 모듈 상단에 import 하는 것과 비슷하게 생각하자. 

How does useState know which of the state variables to return?
- Hooks rely on a stable call order on every render of the same component.
- Internally, React holds an array of state pairs for every component.

!@hookMentalModel.html@!

!@hookMentalModel.js@!

State is local to a component instance on the screen. 

Unlike props, state is fully private to the component declaring it. The parent component can’t change it. 

What if you wanted both galleries to keep their states in sync? The right way to do it in React is to remove state from child components and add it to their closest shared parent. 

hook into = to become connected to

배열 역방향 순회에서 -1 % arr.length 하면 몇이 나오지?

### Render and Commit

**Trigger a render**

initial render와 state update가 렌더의 두 이유이다. 

initial render는 ReactDOM.render로 이루어진다. 

컴포넌트의 state가 바뀌면 queues a render. 

**React renders your components**

렌더가 트리거된 이후 리액트는 컴포넌트를 호출해 화면에 무엇을 보여줄지 알아본다. 

> “Rendering” is React calling your components.

초기 렌더에서는 root 컴포넌트를 호출하고, 이후에는 state 업데이트로 렌더가 트리거된 컴포넌트를 호출한다. 

초기 렌더에서는 DOM node들을 만들고, re-render에서는 이전 렌더와 비교 작업을 해 어떤 프로퍼티가 바뀌었는지 계산한다. commit phrase 전까지는 이 정보로 아무 작업도 하지 않는다. 

**React commits changes to the DOM**

초기 렌더에서는 appendChild로 모든 DOM 노드들을 넣고, 이후에는 렌더링 단계에서 계산된 minimum neccessary operation을 수행한다. 

### State as a Snapshot

Setting state variable does not change the state variable you already have, but instead triggers a re-render. 

When React re-renders a component:

1. React calls your function again.
2. Your function returns a new JSX snapshot.
3. React then updates the screen to match the snapshot you’ve returned.

State actually lives outside of your function.

When React calls your component, it gives you a snapshot of the state for that particular render. Your component returns a snapshot of the UI with a fresh set of props and event handlers in its JSX, all calculated using the state values from that render!

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      // Scheduled using a snapshot of the state at the time the user interacted with it
      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number);
        }, 3000);
      }}>+5</button>
    </>
  )
}

```

React keeps the state values “fixed” within one render’s event handlers. 

Variables and event handlers don’t “survive” re-renders. Every render has its own event handlers.
- Event handlers created in the past have the state values from the render in which they were created.

You can mentally substitute state in event handlers, similarly to how you think about the rendered JSX???

### Queueing a Series of State Updates

React waits until all code in the event handlers has run before processing your state updates.

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);
	console.log('asdasd');
  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setTimeout(() => {
          setNumber(100);
        }, 2000);
      }}>+3</button>
    </>
  )
}
// 콜백까지 기다리는건 아니니까,,,?
// 암튼 setNumer는 계속 유효하구나
```

React does not batch across multiple intentional events like clicks.

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        // pass updater function
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}
// It is a way to tell React to “do something with the state value” instead of just replacing it.
```

It’s common to name the updater function argument by the first letters of the corresponding state variable:

```jsx
setLastName(ln => ln.reverse());
```

```jsx
import { useState } from 'react';

export default function RequestTracker() {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  async function handleClick() {
    setPending(p => p+1);
    await delay(3000);
    setPending(p => p-1);
    // 그 순간의 값으로 설정하려면 함수로 건네줘야한다. 
    // c+1을 전달하면 이벤트 헨들러 호출될 당시의 c값으로 하는 듯. 
    setCompleted(c => c+1);
  }

  return (
    <>
      <h3>
        Pending: {pending}
      </h3>
      <h3>
        Completed: {completed}
      </h3>
      <button onClick={handleClick}>
        Buy     
      </button>
    </>
  );
}

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

```

### Updating Objects in State

Although objects in React state are technically mutable, you should treat them as if they were immutable

Note that the ... spread syntax is “shallow”—it only copies things one level deep. 

```jsx
setPerson({
    ...person,
    [e.target.name]: e.target.value
    // 여러 필드에 동일한 이벤트 핸들러 사용하기. 
    // Dynamic name의 활용
    // e.target.name은 <input>의 name 프로퍼티
});
```

Nested object를 할 때는 잘 분리해서 하기. Objects are not really nested. 다른 객체를 가르킬 뿐. 

**Immer** is a popular library that lets you write using the convenient but mutating syntax and takes care of producing the copies for you. The draft provided by Immer is a special type of object, called a Proxy, that “records” what you do with it. 프록시 공부해보자. 

### Updating Arrays in State

In general, you should only mutate objects that you have just created. 

## Managing State

With React, you won’t modify the UI from code directly. For example, you won’t write commands like “disable the button”, “enable the button”, “show the success message”, etc. Instead, you will describe the UI you want to see for the different visual states of your component (“initial state”, “typing state”, “success state”), and then trigger the state changes in response to user input.

### Reacting to Input with State

React uses a declarative way to manipulate the UI. Instead of manipulating individual pieces of the UI directly, you describe the different states that your component can be in, and switch between them in response to the user input. This is similar to how designers think about the UI.

> Declarative programming means describing the UI for each visual state rather than micromanaging the UI (imperative).

1. Identify your component’s different visual states
2. Determine what triggers those state changes(state diagram?)
3. Represent the state in memory using useState
4. Remove any non-essential state variables
5. Connect the event handlers to set the state

### Choosing the State Structure

- Group related state.
- Avoid contradictions in state.
- Avoid redundant state.
- Avoid duplication in state.
- Avoid deeply nested state.

```jsx
const isSending = status === 'sending';
// 한 렌더링 안에서는 state가 바뀌지 않으니 이렇게 써도 상관 없는 듯?
```

**Don't mirror props in state**. “Mirroring” props into state only makes sense when you want to ignore all updates for a specific prop. By convention, start the prop name with initial or default to clarify that its new values are ignored.



### Sharing State Between Components

### Preserving and Resetting State

### Extracting State Login into a Reducer

### Passing Data Deeply with Context

### Scaling Up with Reducer and Context
