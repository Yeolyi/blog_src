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

!@chapter1-3/reduceRight.js@! 

> In mathematics and computer science, currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each takes a single argument.

!@chapter1-3/currying.js@!

Recursion is a pattern that works particularly well with asynchronous processes. Functions can recall themselves when they're ready, like when the data is available or when a timer has finished.

!@chapter1-3/recursionAsync.js@!

Composition

A more elegant approach is to create a higher-order function we can use to compose functions into larger functions

!@chapter1-3/chaining.js@!

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

!@chapter5/babel.html@!

> If we use a React fragment, we can mimic the behavior of a wrapper without actually creating a new tag. 

Webpack 관련은 스킵. 

## 6. React State Management

지난 챕터에서 데이터가 프로퍼티를 따라 flow할 수 있는 component tree를 만들었다. Properties are half of the picture. State is the other half. 

> The state of a React application is driven by data that has the ability to change. 

!@chapter6/star-rating/src/starRating.js@!

무분별한 state의 사용은 디버깅을 어렵게하고 프로그램을 바꾸기 어렵게 만든다. 해결법 중 하나는 state를 component tree의 루트에서 자식 컴포넌트로 props를 통해 전달하는 것이다. 

!@chapter6/star-rating/src/App.js@!

!@chapter6/star-rating/src/ColorList.js@!

Just as we passed data down a component tree via props, interactinos can be passed back up the tree along with data via functino properties. 

> In React, a ref if an object that stores values for the lifetime of a component. 

!@chapter6/star-rating/src/AddColorForm.js@!

!@chapter6/star-rating/src/useInput.js@!

하지만 여러 요소를 지나 데이터를 건네는 것은 데이터를 사용하는 곳과 넣는 곳이 너무 먼 문제점을 낳는다. 

> A context provider is a React component you can wrap around your entire component tree or specific sections of your component tree.

> The context consumer is the React component that retrieves the data from context. 

!@chapter6/star-rating-context/src/index.js@!

!@chapter6/star-rating-context/src/ColorList.js@!

Hook을 통해 렌더링 부분과 로직 부분을 분리할 수 있다. 

## 7. Enhancing Components with Hooks

- useState, useRef, useContext
- useEffect, useLayoutEffect, useReducer
- useCallback, useMemo

> We use useEffect when a render needs to cause side effects. 

> Those things we want the component to do other than return UI are called effects.

렌더가 이루어질 때마나, useEffect는 렌더 이후의 최신 값들에 접근할 수 있다. 

```jsx
useEffect(() => {
    localStorage.setItem('checkbos-value', checked);
})
```

!@chapter7/dependency-array/src/index.js@!

이런 식의 custom hook을 만들 수도 있다. 

```jsx
const useJazzyNews = () => {
    const [posts, setPosts] = useState([]);
    const addPost = post => setPosts(allPosts => [post, ...allPosts]);

    useEffect(() => {
        newsFeed.subscribe(addPost);
        return () => newsFeed.unsubscribe(addPost);
    }, []);

    useEffect(() => {
        welcomeChime.play();
        return () => goodbyeChime.play();
    }, []);

    return posts;
}
```

Dependency array에 객체를 넣으면, rerender마다 새로운 인스턴스가 생기기에 useEffect가 매번 불리게 된다. 

> useMemo invokes a function to calculate a memoized value. 

Memoization할 때 그 memo. Dependency가 바뀔 때만 값을 재계산하여 반환한다. 

```jsx
// 반환값 타입이 뭘까,,,?
const words = useMemo(() => {
    const words = children.split(" ");
    return words;
}, [children]);

useEffect(() => {
    console.log('fresh render');
}, [words]);
```

> useCallback can be used like useMemo, but it memoizes functions instead of values. 

useMemo와 useCallback을 사용하여 useJazzyNews를 개선할 수 있다. 

```jsx
const useJazzyNews = () = {
    const [_posts, setPosts] = useState([]);
    const addPost = post => setPosts(allPosts => [post, ...allPosts]);

    const posts = useMemo(() => _posts, [_posts]);

    useEffect(() => {
        newPostChime.play();
    }, [posts]);

    // 이하 동일
}
```

> **useLayoutEffect** is invoked after the render but before the browser paints the change.

> Browser paint: the time when the components' elements are actually added to the DOM

**Render** > useLayoutEffect > Browser paint > useEffect. 렌더가 가장 먼저네??

Browser paint에 반드시 필요한 effect이면 useLayoutEffect를 사용한다. 

```jsx
function useWindowSize() {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const resize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    useLayoutEffect(() => {
        window.addEventListener("resize", resize);
        resize();
        return () => window.removeEventListener("resize", resize);
    }, []);

    return [width, height];
}
```

### Rules to Follow with Hooks

- Hooks only run in the scope of a component.
- It's a good idea to break funtionality out into multiple Hooks.
- Hooks should only be called at the top level. if문을 써야되면 hook안에서.

> Lazy initial state. The initialState argument is the state used during the initial render. In subsequent renders, it is disregarded. If the initial state is the result of an expensive computation, you may provide a function instead, which will be executed only on the initial render.

hook 안에 async function이 필요하면 argument로 전달은 안되고 nested function에서 처리해야한다. 

### Improving Code with useReducer

> Instead of hardcoding behavior, we can abstract logic into a **reducer function** that will always produce the same result. 

```jsx
const [checked, setChecked] = useState(false);
// 불필요하게 복잡하다. 
<input
    onchange{() => setChecked(checked => !checked)}
/>

// If the same input is provided to a function, the sam eoutput should be expected. 
const [checked, toggle] = useReducer(checked => !checked, false);
const [number, setNumber] = useReducer((number, newNumber) => number+newNumber, 0);
```

> In React, a pure component is a component that always renders the same output, given the saem properties. 

> The memo function can be used to create a component that will only render when its properties change. 

```jsx
const Cat = ({name, meow = f => f}) = {
    return <p onClick={() => meow(name)}>{name}</p>;
}
// PureCat will only cause the Cat to render when the properties change. 
// Second argument sent to the memo function is a predicate.
// The function decides wheter to reerender a cat or not. 
const PureCat = memo(
    Cat, 
    (prevProps, nextProps) => prevProps.name === nextProps.name
);
// 위에 처럼 memo를 사용하거나, useCallback으로 변환한 meow를 건네주거나 둘 중 하나. 
```

> The **React Profiler** can be used to measure the performance of each of your components.

## 8. Incorporating Data

In this chapter, we're going to take a look at various techniques for loading and working with data form the source. 

### Requesting Data

파일을 POST하기 위해서는 body에 파일이 위치함을 서버에 알리는 multipart-formdata request가 필요하다. body에 FormData를 담아 보낸다. 

```js
const formData = new FormData();
formData.append('avatar', imgFile);
fetch("/create/user", { method: "POST", body: formData });
```

유저를 식별하기 위한 토큰은 보통 Authorization header에 담긴다. 토큰은 특정 서비스에 로그인하거나, open standard protocol인 OAuth를 사용하는 서드파티 웹에서 제공된다.

!@chapter8/github-user/src/GithubUser.js@!

> We can save data locally to the browser using the Web Storage API

- window.sessionStorage: 유저의 세션에 저장. 탭을 닫거나 브라우저를 재시작하면 사라진다. 
- window.localStorage: 제거 전까지 계속 남는다. 

!@chapter8/github-user/src/storage.js@!

Cache-Control: max-age=<EXP_DATE>를 통해 HTTP가 캐시를 처리할 수 있게 할 수도 있다. 

!@chapter8/github-user/src/GithubUser2.js@!

### Render Props

> Properties that are rendered.

비동기 컴포넌트의 재사용성을 극대화시키는데 유용하다. 

!@chapter8/github-user/src/List.js@!

위 작업을 위한 더 나은 컴포넌트가 존재한다. 

### Virtualized Lists

실제 앱에서는 데이터가 많고 이를 한번에 렌더할 수는 없다. 

windowing/virtualization. 가장 유명한건 react-window/react-virtualized. 

!@chapter8/github-user/src/VirtualizedList.js@!

### --

!@chapter8/github-user/src/useFetch.js@!

!@chapter8/github-user/src/Fetch.js@!

!@chapter8/github-user/src/GithubUser3.js@!

!@chapter8/github-user/src/useIterator.js@!

!@chapter8/github-user/src/UserDetails.js@! 

> 유저 정보를 불러오고 이후 유저의 레포 목록을 불러온다. We call these requests waterfall requests because they happen one right after the other—they’re dependent on each other.

!@chapter8/github-user/src/RepositoryReadme.js@! 

크롬의 Network 탭에서 네트워크 속도를 조절할 수 있다. XHR로 필터링하여 fetch 만 골라서 볼 수 있다. Waterfall에서 그래프도 볼 수 있음. 

이후 책에서 위 구조를 평면화? 병렬화?하는 작업을 하지만 생략.

리액트 요소가 사라졌는데 업데이트를 시도하면(네트워크가 느린 등의 이유로 인해) 'Can't perform a React state update on an unmounted component.'라는 경고가 뜬다. 

```js
// useState를 안쓰는 이유??
/*
Keep in mind that useRef doesn’t notify you when its content changes. Mutating the .current property doesn’t cause a re-render. If you want to run some code when React attaches or detaches a ref to a DOM node, you may want to use a callback ref instead.
*/
// 리렌더링과 관련된 듯?
export function useMountedRef() {
    const mounted = useRef(false);
    useEffect(() => {
        mounted.current = true;
        return () => (mounted.current = false);
    });
    return mounted;
}
```

It’s always a good idea to test your app under slow network conditions. These bugs will be revealed and eliminated.

### Introducing GraphQL

> GraphQL is a declarative solution for communicating with APIs. A GraphQL query is a declarative description of the data we’re requesting.

GraphQL 관련은 일단 스킵.

## 9. Suspense

스킵. 

## 10. React Testing

스킵

## 11. React Router

> **Routing** is the process of defining endpoints for your client’s requests.

> Each **route** is an endpoint that can be entered into the browser's location bar.

> The **Router component** passes information about the current location to any children that are nested inside of it. The Router component should be used once and placed near the root of our component tree.

> The wrapper component for any routes we want to render is called **Routes**. Inside of Routes, we’ll use a **Route component** for each page we want to render.

Routes가 Router에게 window의 위치가 바뀌었을 때 어떤 컴포넌트를 렌더할지 알려준다. 

모든 Route 컴포넌트는 window의 현 위치에 따라 이들을 선택하는 Routes에 감싸져야한다. 

!@chapter11/router-example/src/index.js@!

!@chapter11/router-example/src/App.js@!

!@chapter11/router-example/src/Home.js@!

페이지에 위계를 주고 싶으면 아래와 같이 Route를 nest하면 된다. 

```jsx
function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />}>
                    <Route
                        path="services"
                        element={<Services />}
                    />
                    <Route
                        path="history"
                        element={<History />}
                    />
                    <Route
                        path="location"
                        element={<Location />}
                    />
                </Route>
                <Route
                    path="events"
                    element={<Events />}
                />
                <Route
                    path="products"
                    element={<Products />}
                /> <Route
                    path="contact"
                    element={<Contact />}
                />
                <Route path="*" element={<Whoops404 />} />
            </Routes>
        </div>);
}
```

이때 /about/history에서 About은 보이지만 History는 보이지 않는데, 이 때 Outlet을 사용한다. Child Content를 렌더링하고 싶은 곳에 Outlet을 배치한다. 

Redirect로 리다이렉트한다. 

```jsx
<Redirect
    from="services"
    to="about/services"
/>
```

Routing parameter 생략. 

## 12. React and the Server


