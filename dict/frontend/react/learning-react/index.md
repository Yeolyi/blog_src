---
title: Learning React
---

[GitHub](https://github.com/facebook/react-devtools)

## 1. Welcome to React

[React blog](https://reactjs.org/blog)

[React Developer Tools](https://github.com/facebook/react-devtools)

React itself is an example of a useful npm library.

*package.json* describies the project and all its dependencies. 

Yarn was released in 2016 by Facebook in collaboration with Exponent, Google, and Tilde.

## 2. JavaScript for React

> DHTML(Dynamic HTML; 동적 HTML)은 정적 마크업 언어인 HTML과 클라이언트 기반 스크립트 언어(자바스크립트 같은) 그리고 스타일 정의 언어인 CSS를 조합하여 대화형 웹 사이트를 제작하는 기법을 의미한다. 경쟁 기술로는 애니메이션을 위한 어도비 플래시나 자바, AJAX, 애플릿, SVG 등이 있다(SVG는 아직까지 주요 웹 브라우저에서 잘 지원되지 않는다).

[AJAX what is it? (it’s not DHTML)](https://derivadow.com/2007/01/05/ajax-what-is-it-its-not-dhtml/)

[kangax compatibility table](http://kangax.github.io/compat-table/esnext/)

Function declarations are hoisted and function expression are not. 

화살표가 리턴 값을 바로 가리키면 return을 생략할 수 있다. 

화살표 함수에서 객체를 반환하려면 중괄호를 소괄호로 묶어야한다!

[Babel REPL](https://babeljs.io/repl)

```javascript
const sandwich = {
    bread: "dutch crunch",
    meat: "tuna"
};
const { bread, meat } = sandwich;

const foo = {
    bar: {
        x: 10
    }
}
const { bar: { x }} = foo;

const morning = {
    breakfast: 'oatmeal', 
    lunch: 'peanut butter and jelly'
};
const dinner = 'mac and cheese';
console.log({ ...morning, dinner });
```

Today, React is beginning to move away from classes, instead using functions to construct components.

ES6 Module -> import, export?
CommonJS -> module.exports, require

## 3. Functional Programming with JavaScript

Many of the features that are included in the latest JS syntax are present because they support functional programming techniques. In functional JS, we can think of out code as being a collection of functions that can be composed into applications.

함수형 프로그래밍은 선언형 프로그래밍이라는 더 넓은 범주의 프로그래밍 기법에 속한다. 

Declarative programming is a style of programming where applications are structured in a way that prioritizes describing what should happen over defining how it should happen.

In a declarative program, the syntax itself describes what souel happen, and the details of how things happen are abstracted away.

[Declarative Programming wiki](http://wiki.c2.com/?DeclarativeProgramming)

```javascript
// Building a DOM

// Imperative approach
const target = document.getElementById('target');
const wrapper = document.createElement('div');
const headline = document.createElement('h1x');

wrapper.id = 'welcome';
headline.innerText = 'Hello World';

wrapper.appendChild(headline);
target.appendChild(wrapper);

// Declarative approach
const { render } = ReactDOM;

const Welcom = () => (
    <div id='welcome'>
        <h1>Hello World</h1>
    </div>
);

render(<Welcome />, document.getElementById('target'));
```

> React is declarative.

Core concepts of functional programming
- Immutability
- Purity
- Data transformation
- High-order functions
- Recursion

```javascript
const rateColor = function(color, rating) {
    // return Object.assign({}, color, {rating: rating});
    return { ...color, rating };
}
```

> A pure function is a function that returns a value that's computed based on its arguments. Pure functions are naturally testable.

> In React, the UI is expressed with pure functions.

When writing functions, try to follow these three rules:

1. The function should take in at least one argument. 
2. The function should return a value or another function.
3. The function should not change or mutate any of its arguments. 

!@reduceRight.js@! 

> In mathematics and computer science, currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each takes a single argument.

!@currying.js@!

Recursion is a pattern that works particularly well with asynchronous processes. Functions can recall themselves when they're ready, like when the data is available or when a timer has finished.

!@recursionAsync.js@!

Composition

A more elegant approach is to create a higher-order function we can use to compose functions into larger functions

!@chaining.js@!

In functional programs, we should use functions over values wherever possible. 

[λ-Calculus: Then & Now](https://turing100.acm.org/lambda_calculus_timeline.pdf)

## 4. How React Works

> JSX is a tag-based JS syntax that looks a lot like HTML

> React is the library for creating views. 

> ReactDOM is the library used to actually render the UI in the browser.

HTML is simply a set of instructions that a browser follows when constructing the DOM.

AJAX의 발명으로 웹 앱 전체가 UI 업데이트를 JS에 맏겨 단일 페이지에서 동작할 수 있게 되었다. SPA에서 브라우저는 하나의 HTML 문서를 로드한다. 

리액트는 DOM을 우리 대신 업데이트하도록 디자인된 라이브러리이다. 

React DOM은 React element로 구성되어있다. 

!@chapter4/createElement.html@!

The major advantage of using React is its ability to separate data from UI elements.

!@chapter4/seperateData.html@!

Components allow us to reuse the same structure, and then we can populate those structures with different sets of data.

!@chapter4/props.html@!

## 5. React with JSX

> JSX combines the JS from JavaScript and the X from XML. It is a JS extension that allows us to define React elements using a tag-based syntax directly within our JS code. 

```jsx
React.createElement(IngredientsList, {list: [...]});
<Ingredients list={[...]}>
// 여기서도 그냥 IngredientesList({[...]}) 해주면 안되나?
// 기계적 변환이라서 어쩔 수 없는건가,,
// 모든 JSX는 Babel을 통해 createElement 호출로 변환된다. 
```

Component 프로퍼티들은 string이나 중괄호로 쌓인 JS expression 두 타입만 받는다. 중괄호로 쌓인 것들은 평가(evaluate)된다. 

[CDN](https://www.cloudflare.com/ko-kr/learning/cdn/what-is-a-cdn/)

> If we use a React fragment, we can mimic the behavior of a wrapper without actually creating a new tag. 

Webpack 관련은 스킵. 

## 6. React State Management



## 7. Enhancing Components with Hooks

## 8. Incorporating Data

## 9. Suspense

## 10. React Testing

## 11. React Router

## 12. React and the Server


