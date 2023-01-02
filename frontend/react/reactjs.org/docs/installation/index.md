---
title: Installation
---

## Add React to a Website

The majority of websites aren’t, and don’t need to be, single-page apps. With a few lines of code and no build tooling, try React in a small part of your website.

You can place a “container” <div> anywhere inside the <body> tag. You may have as many independent DOM containers on one page as you need. They are usually empty — React will replace any existing content inside DOM containers.

[예시](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605)

[여러 render 예시](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605)

[terser](https://github.com/terser/terser)

아래를 통해 JSX를 빠르게 사용해볼 수 있다.

```jsx
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
// 이후 JSX가 있는 script 태그를 type="text/babel"로 설정
// 느림
```

```bash
npm install babel-cli@6 babel-preset-react-app@3
npx babel --watch src --out-dir . --presets react-app/prod
```

[npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)

## Create a New React App

A JavaScript build toolchain typically consists of:

- A package manager, such as Yarn or npm. It lets you take advantage of a vast ecosystem of third-party packages, and easily install or update them.
- A bundler, such as webpack or Parcel. It lets you write modular code and bundle it together into small packages to optimize load time.
- A compiler such as Babel. It lets you write modern JavaScript code that still works in older browsers.

[Creating a React App… From Scratch](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658)

## CDN Links

crossorigin 세팅을 추천. 더 나은 에러 핸들링 경험을 준다??

```html
<script
  crossorigin
  src="..."
></script>
```
