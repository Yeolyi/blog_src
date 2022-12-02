---
title: Tutorial
---

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

Unlike the array push() method you might be more familiar with, the concat() method doesn’t mutate the original array, so we prefer it.

React elements are first-class JavaScript objects.

Because React cannot know our intentions, we need to specify a key property for each list item to differentiate each list item from its siblings. Even though key may look like it belongs in props, key cannot be referenced using this.props.key.