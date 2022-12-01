---
title: React
---

## reactjs.org

[JSX Babel REPL](https://babeljs.io/repl/#?presets=react&code_lz=MYewdgzgLgBApgGzgWzmWBeGAeAFgRgD4AJRBEAGhgHcQAnBAEwEJsB6AwgbgChRJY_KAEMAlmDh0YWRiGABXVOgB0AczhQAokiVQAQgE8AkowAUAcjogQUcwEpeAJTjDgUACIB5ALLK6aRklTRBQ0KCohMQk6Bx4gA)

Using props and state, we can put together a small Todo application. This example uses state to track the current list of items as well as the text that the user has entered. **Although event handlers appear to be rendered inline, they will be collected and implemented using event delegation.**??

### Tutorial

```jsx
return React.createElement(
  'div',
  { className: 'shopping-list' },
  React.createElement('h1' /* ... h1 children ... */),
  React.createElement('ul' /* ... ul children ... */)
);
```

[Understanding JavaScript Functinon Invocation and "this"](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/)

React components can have state by setting this.state in their constructors.

All React component classes that have a constructor should start with a super(props) call.

After installing React DevTools, you can right-click on any element on the page, click “Inspect” to open the developer tools, and the React tabs (“⚛️ Components” and “⚛️ Profiler”) will appear as the last tabs to the right. Use “⚛️ Components” to inspect the component tree.

We may think that Board should just ask each Square for the Square’s state. Although this approach is possible in React, we discourage it because the code becomes difficult to understand, susceptible to bugs, and hard to refactor.

```jsx
// We split the returned element into multiple lines for readability, and added parentheses so that JavaScript doesn’t insert a semicolon after return and break our code.
renderSquare(i) {
  return (
    <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />
  );
}
```

In React, it’s conventional to use on[Event] names for props which represent events and handle[Event] for the methods which handle the events.

Since the Square components no longer maintain state, the Square components receive values from the Board component and inform the Board component when they’re clicked. In React terms, the Square components are now **controlled components**. The Board has full control over them.

The main benefit of immutability is that it helps you build pure components in React. Immutable data can easily determine if changes have been made, which helps to determine when a component requires re-rendering.



## 책

[Learning React](/learning-react)

## React Docs Beta

[출처](https://beta.reactjs.org)

### Learn React

[Installation](./installation/)

[Quick Start](./quick-start/)

[Describing the UI](./describing-the-UI/)

[Adding Interactivity](./adding-interactivity/)

[Managing State](./managing-state/)

[Escape Hatches](./escape-hatches/)
