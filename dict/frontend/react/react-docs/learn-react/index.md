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

Sometimes, you want the state of two components to always change together. To do it, remove state from both of them, move it to their closest common parent, and then pass it down to them via props. This is known as lifting state up, and it’s one of the most common things you will do writing React code.

> It is common to call a component with some local state “uncontrolled”.

> In contrast, you might say a component is “controlled” when the important information in it is driven by props rather than its own local state.

When writing a component, consider which information in it should be controlled (via props), and which information should be uncontrolled (via state)

[Single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth)

### Preserving and Resetting State

React associates each piece of state it’s holding with the correct component by where that component sits in the UI tree.

State is not kept in JSX tags. It’s associated with the tree position in which you put that JSX.

React preserves a component’s state for as long as it’s being rendered at its position in the UI tree.

When you render a different component in the same position, it resets the state of its entire subtree.

Nested Component는 렌더때마다 새로운 component function이 생성되므로 state가 렌더마다 초기화되는 문제가 있다. 

There are two ways to reset state when switching between them:

- Render components in different positions
- Give each component an explicit identity with key

Remember that keys are not globally unique. They only specify the position within the parent.

컴포넌트가 제거돼도 그 내용을 보관하는 방법
- 앱이 간단하다면 모두 렌더하고 CSS를 통해 숨길건 숨기기
- state를 상위로 옮기기. 가장 일반적인 방법. 
- localStorage에 저장된 값을 토대로 렌더링하기. 

### Extracting State Login into a Reducer

To reduce this complexity and keep all your logic in one easy-to-access place, you can move that state logic into a single function outside your component, called a “reducer.”

Instead of telling React “what to do” by setting state, you specify “what the user just did” by dispatching “actions” from your event handlers. 

```jsx
function handleDeleteTask(taskId) {
  dispatch(
    // "action" object:
    {
      type: 'deleted',
      id: taskId
    }
  );
}
```

보통 발생한 일을 묘사하는 type 문자열을 포함한다. 

```jsx
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

reduce와 유사한 형식으로 구성되어있다. reduce 함수에 전달되는 함수를 reducer라고 한다. We recommend to wrap each case block into the { and } curly braces so that variables declared inside of different cases don’t clash with each other. 

```jsx
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
```
 
A reducer is a pure function that doesn’t depend on your component. 

Reducers must be pure, Each actino describes a single user interaction, even if that leads to multiple changes in the data. 

State updater function처럼 reducer도 렌더링 중 동작한다??. They should not send requests, schedule timeouts, or perform any side effects.

### Passing Data Deeply with Context

> Context lets the parent component make some information available to any component in the tree below it—no matter how deep—without passing it explicitly through props.

> Lifting state up that high can lead to a situation sometimes called **“prop drilling.”**

If you don’t provide the context, React will use the default value you’ve specified in the previous step. 

The component will use the value of the nearest <LevelContext.Provider> in the UI tree above it.

Context lets you write components that “adapt to their surroundings” and display themselves differently depending on where (or, in other words, in which context) they are being rendered.

Just because you need to pass some props several levels deep doesn’t mean you should put that information into context.

Start by passing props, extract components and pass JSX as children them. 

Theming, Current account, Routing, Managing state...

### Scaling Up with Reducer and Context

Custom Hooks. Your function is considered a custom Hook if its name starts with use. This lets you use other Hooks, like useContext, inside it.

Create two contexts (for state and for dispatch functions). - 값에 접근만 해도 되는 경우가 있으니까 분리하는건가?
- 객체로 만들어서 하나에 넣으면 번거로운 것도 있을 듯. 

## Escape Hatches

### Referencing Values with Refs

> When you want a component to “remember” some information, but you don’t want that information to trigger new renders, you can use a ref.

ref.current property is intentionally mutable.

When a piece of information is only needed by event handlers and changing it doesn’t require a re-render, using a ref may be more efficient.

You shouldn’t read (or write) the current value during rendering.

```jsx
function useRef(initialValue) {
  const [ref, unused] = useState({ current: initialValue });
  return ref;
}
```

Treat refs as an escape hatch. Don’t read or write ref.current during rendering. useEffect 내에서만 하라는 뜻인가??

### Manipulating the DOM with Refs

```jsx
<div ref={myRef}>
```

You can then access this DOM node from your event handlers and use the built-in browser APIs defined on it.

[Element.scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)

Another solution is to pass a function to the ref attribute. This is called a “ref callback”. React will call your ref callback with the DOM node when it’s time to set the ref, and with null when it’s time to clear it.

By default React does not let a component access the DOM nodes of other components.

In design systems, it is a common pattern for low-level components like buttons, inputs, and so on, to forward their refs to their DOM nodes.

In React, every update is split in two phases:

During render, React calls your components to figure out what should be on the screen.
During commit, React applies changes to the DOM.

React sets ref.current during the commit. Usually, you will access refs from event handlers.

You can force React to update (“flush”) the DOM synchronously. To do this, import flushSync from react-dom and wrap the state update into a flushSync call:

Avoid changing DOM nodes managed by React. Modifying, adding children to, or removing children from elements that are managed by React can lead to inconsistent visual results or crashes like above.

### Synchronizing with Effects

> Effects let you run some code after rendering so that you can synchronize your component with some system outside of React.

리액트 컴포넌트에는 두 종류의 로직이 있다. 
- Rendering code
- Event handlers

> Effects let you specify side effects that are caused by rendering itself, rather than by a particular event. 

Notice that you can’t “choose” your dependencies.

To help you spot them quickly, in development React remounts every component once immediately after its initial mount.

> Inbetweening, also known as tweening, is a process in animation that involves creating intermediate frames, called inbetweens, between two keyframes.

> In animation and filmmaking, a key frame (or keyframe) is a drawing or shot that defines the starting and ending points of a smooth transition.

```jsx
useEffect(() => {
  let ignore = false;

  async function startFetching() {
    const json = await fetchTodos(userId);
    if (!ignore) {
      setTodos(json);
    }
  }

  startFetching();

  return () => {
    ignore = true;
  };
}, [userId]);
```

Writing fetch calls inside Effects is a very manual approach and it has significant downsides. 

This illustrates that if remounting breaks the logic of your application, this usually uncovers existing bugs. 

React always cleans up the previous render’s Effect before the next render’s Effect.

Each Effect “captures” the text value from its corresponding render.

### You Might Not Need an Effect

Effect는 외부 시스템과의 synchronize를 위해서 사용되어야 한다. 

- You don’t need Effects to transform data for rendering.
- You don’t need Effects to handle user events.

useMemo 훅으로 비용이 큰 계산을 캐싱할 수 있다. 

```jsx
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  const visibleTodos = useMemo(() => {
    // ✅ Does not re-run unless todos or filter change
    return getFilteredTodos(todos, filter);
  }, [todos, filter]);
  // ...
}
```

When you update a component during rendering, React throws away the returned JSX and immediately retries rendering. To avoid very slow cascading retries, React only lets you update the same component’s state during a render.

Always check whether you can reset all state with a key or calculate everything during rendering instead. 

When you’re not sure whether some code should be in an Effect or in an event handler, ask yourself why this code needs to run. Use Effects only for code that should run because the component was displayed to the user.

Avoid chains of Effects that adjust the state solely to trigger each other. In this case, it’s better to calculate what you can during rendering, and adjust the state in the event handler.

React has a purpose-built Hook for subscribing to an external store that is preferred instead. Delete the Effect and replace it with a call to **useSyncExternalStore**.

To fix the race condition, you need to add a cleanup function to ignore stale responses.

### Lifecycle of Reactive Effects

It’s a good way to think about components, but not about Effects. 컴포넌트와 efect는 분리해서 생각하기. 

Sometimes, it may also be necessary to start and stop synchronizing multiple times while the component remains mounted.

Instead, always focus on a single start/stop cycle at a time. It shouldn’t matter whether a component is mounting, updating, or unmounting. All you need to do is to describe how to start synchronization and how to stop it. If you do it well, your Effect will be resilient to being started and stopped as many times as it’s needed.

Each Effect in your code should represent a separate and independent synchronization process.
