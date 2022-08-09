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

## Adding Interactivity

