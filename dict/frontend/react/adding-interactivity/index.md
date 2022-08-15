---
title: Adding Interactivity
---

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