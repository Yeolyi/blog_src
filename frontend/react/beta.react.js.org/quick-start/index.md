---
title: Quick Start
---

React apps are made out of components.

> A component is a piece of the UI (user interface) that has its own logic and appearance.

React component names must always start with a capital letter.

### Conditional rendering

If you prefer more compact code, you can use the conditional ? operator. Unlike if, it works inside JSX.

When you don’t need the else branch, you can also use a shorter logical && syntax.

```jsx
<div>{isLoggedIn && <AdminPanel />}</div>
```

### Responding to events

Do not call the event handler function: you only need to pass it down. React will call your event handler when the user clicks the button.

```jsx
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return <button onClick={handleClick}>Click me</button>;
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
  <input type="checkbox" checked={inStockOnly} /> Only show products in stock
</label>
// whitespace는 사라지니까 빈칸은 이렇게??
```
