---
title: Escape Hatches
---

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
