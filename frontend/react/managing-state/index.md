---
title: Managing State
---

With React, you won’t modify the UI from code directly. For example, you won’t write commands like
“disable the button”, “enable the button”, “show the success message”, etc. Instead, you will
describe the UI you want to see for the different visual states of your component (“initial state”,
“typing state”, “success state”), and then trigger the state changes in response to user input.

### Reacting to Input with State

React uses a declarative way to manipulate the UI. Instead of manipulating individual pieces of the
UI directly, you describe the different states that your component can be in, and switch between
them in response to the user input. This is similar to how designers think about the UI.

> Declarative programming means describing the UI for each visual state rather than micromanaging
> the UI (imperative).

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

**Don't mirror props in state**. “Mirroring” props into state only makes sense when you want to
ignore all updates for a specific prop. By convention, start the prop name with initial or default
to clarify that its new values are ignored.

### Sharing State Between Components

Sometimes, you want the state of two components to always change together. To do it, remove state
from both of them, move it to their closest common parent, and then pass it down to them via props.
This is known as lifting state up, and it’s one of the most common things you will do writing React
code.

> It is common to call a component with some local state “uncontrolled”.

> In contrast, you might say a component is “controlled” when the important information in it is
> driven by props rather than its own local state.

When writing a component, consider which information in it should be controlled (via props), and
which information should be uncontrolled (via state)

[Single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth)

### Preserving and Resetting State

React associates each piece of state it’s holding with the correct component by where that component
sits in the UI tree.

State is not kept in JSX tags. It’s associated with the tree position in which you put that JSX.

React preserves a component’s state for as long as it’s being rendered at its position in the UI
tree.

When you render a different component in the same position, it resets the state of its entire
subtree.

Nested Component는 렌더때마다 새로운 component function이 생성되므로 state가 렌더마다 초기화되는 문
제가 있다.

There are two ways to reset state when switching between them:

- Render components in different positions
- Give each component an explicit identity with key

Remember that keys are not globally unique. They only specify the position within the parent.

컴포넌트가 제거돼도 그 내용을 보관하는 방법

- 앱이 간단하다면 모두 렌더하고 CSS를 통해 숨길건 숨기기
- state를 상위로 옮기기. 가장 일반적인 방법.
- localStorage에 저장된 값을 토대로 렌더링하기.

### Extracting State Login into a Reducer

To reduce this complexity and keep all your logic in one easy-to-access place, you can move that
state logic into a single function outside your component, called a “reducer.”

Instead of telling React “what to do” by setting state, you specify “what the user just did” by
dispatching “actions” from your event handlers.

```jsx
function handleDeleteTask(taskId) {
  dispatch(
    // "action" object:
    {
      type: 'deleted',
      id: taskId,
    }
  );
}
```

보통 발생한 일을 묘사하는 type 문자열을 포함한다.

```jsx
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

reduce와 유사한 형식으로 구성되어있다. reduce 함수에 전달되는 함수를 reducer라고한다. We recommend
to wrap each case block into the { and } curly braces so that variables declared inside of different
cases don’t clash with each other.

```jsx
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
```

A reducer is a pure function that doesn’t depend on your component.

Reducers must be pure, Each actino describes a single user interaction, even if that leads to
multiple changes in the data.

State updater function처럼 reducer도 렌더링 중 동작한다??. They should not send requests, schedule
timeouts, or perform any side effects.

### Passing Data Deeply with Context

> Context lets the parent component make some information available to any component in the tree
> below it—no matter how deep—without passing it explicitly through props.

> Lifting state up that high can lead to a situation sometimes called **“prop drilling.”**

If you don’t provide the context, React will use the default value you’ve specified in the previous
step.

The component will use the value of the nearest <LevelContext.Provider> in the UI tree above it.

Context lets you write components that “adapt to their surroundings” and display themselves
differently depending on where (or, in other words, in which context) they are being rendered.

Just because you need to pass some props several levels deep doesn’t mean you should put that
information into context.

Start by passing props, extract components and pass JSX as children them.

Theming, Current account, Routing, Managing state...

### Scaling Up with Reducer and Context

Custom Hooks. Your function is considered a custom Hook if its name starts with use. This lets you
use other Hooks, like useContext, inside it.

Create two contexts (for state and for dispatch functions). - 값에 접근만 해도되는 경우가 있으니까분
리하는건가?

- 객체로 만들어서 하나에 넣으면 번거로운 것도 있을 듯.
