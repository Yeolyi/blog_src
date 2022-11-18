---
title: Webpack
---

## Guides

> This section contains guides for understanding and mastering the wide variety of tools and features that webpack offers.

### Getting Started

dist는 distribution.

script에 있던 lodash를 npm으로 옮기는 작업을 했다.

웹팩은 transpile 작업도 한다. 하지만 import나 export문 외에는 바꾸지 않으니 더 나아가려면 Babel과 같은 transpiler를 웹팩의 loader system으로 사용한다.

### Asset Management

명시적인 의존성과 같이 웹팩을 통해 JS에서 얻을 수 있는 이점을 다른 종류의 에셋에도 적용할 수 있다.

JS 모듈에서 CSS 파일을 import하기 위해 style-loader와 css-loader가 필요하다. 스타일 태그가 JS로 인해 동적으로 페이지에 삽입된다.

css-loader는 url 이런거 처리하려고 있는거 같은데 이 예제에서는 없어도 되는건가??

asset/resource는 일반적인 이미지 import를 처리해주는 것 같고 css-loader를 사용하면 CSS의 url('./my-image.png')같은 것도 처리해준다. html-loader도 <img src="./my-image.png"/> 이런거.

이외에도 csv-loader, xml-loader 등 많다. This can be especially helpful when implementing some sort of data visualization using a tool like d3. Instead of making an ajax request and parsing the data at runtime you can load it into your module during the build process so that the parsed data is ready to go as soon as the module hits the browser.

위 방법들을 통해 전역적인 /assets에 의존하지 않고 에셋들을 그룹화할 수 있다.

### Output Management

```js
const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
    print: './src/print.js',
  },
  output: {
    filename: [name].bundle.js,
    path: path.resolve(__dirname, 'dist'),
    // 매번 dist 폴더를 삭제한다.
    clear: true,
  },
};
```

[path.resolve([...paths])](https://nodejs.org/api/path.html#pathresolvepaths)

html-webpack-plugin으로 HTML 내부에 있는 의존성도 처리할 수 있다.

### Development

```js
module.exports {
  mode: 'development',
  // ...
}
```

웹팩이 소스 코드를 번들하면 에러가 떴을 때 뭔지 알기 힘들어진다. 자바스크립트가 제공하는 source map을 사용해보자. [An Introduction to Source Maps](https://blog.teamtreehouse.com/introduction-source-maps)

```js
// 전: index.bundle.js:2:75584
devtool: 'inline-source-map';
// 후: print.js:1
```

매번 npm run build를 하지 않기 위해 웹팩의 Watch Mode / webpack-dev-server / webpack-dev-middleware 중 하나를 사용할 수 있다. 보통 webpack-dev-server를 사용하고 싶을 것.

webpack --watch. 얘만 있으면 브라우저를 refresh해야한다. 그래도 live-server랑은 조합이 좋은 듯? root path가 지저분해지는걸 막으려면 webpack-dev-server를 쓰는게 좋을 듯함.

webpack-dev-server는 output.path에 있는 파일을 사용한다. 결과적으로 http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename]로 접근할 수 있다.

```js
module.exports = {
  // ...
  devServer: {
    static: './dist',
  },
  optimization: {
    // 현재 하나 이상의 entrypoint가 있기에 없으면 안됨
    // 자세한 내용은 code splitting 참고
    runtimeChunk: 'single',
  },
};
```

```json
{
  "scripts": {
    "start": "webpack serve --open"
  }
}
```

webpack-dev-middleware is a wrapper that will emit files processed by webpack to a server. Express의 미들웨어로 사용할 수 있다.

### Code Splitting

### Caching

### Authoring Libraries

### Environment Vairables

### Build Performance

### Content Security Policies

### Development - vagrant

### Dependency Management

### Installation

### Hot Module Replacement

### Tree Shaking

### Production

### Lazy Loading

### ECMAScript Modules

### Shimming

### TypeScript

### Web Workers

### Progressive Web Application

### Public Path

### Integrations

### Asset Modules

### Advanced entry

### Package exports

## Concepts

[webpack concepts](https://webpack.js.org/concepts)

### Concepts

웹팩은 현대적인 자바스크립트 어플리케이션을 위한 정적 모듈 번들러이다. 내부적으로 의존성 그래프를 만든다. 프로젝트의 모듈들을 모아 하나 이상의 번들을 만든다. 번들은 컨텐츠를 제공하는 정적인 에셋이다.

```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Entry point는 의존성 그래프가 시작할 위치를 가리킨다.
  entry: './path/to/my/entry/file.js',
  // 번들들을 놓을 위치와 그 이름
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
  },
  // 웹팩은 JS와 JSON만 이해한다.
  // Loader는 웹팩이 다른 종류의 파일을 처리해서 유효한 모듈로 변환하고 의존성 그래프에 추가할 수 있도록 한다.
  module: {
    // test로 파일을 특정하고 use로 로더를 특정한다.
    // 정규표현식이지 문자열이 아님에 유의. 문자열이면 그 경로의 파일만 처리한다.
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
  // 플러그인은 번들 최적화, 에셋 관리, 환경 변수 주입등의 더 넓은 일을 할 수 있다.
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
  // development, production, none
  mode: 'production',
};
```

웹팩은 ES5-compliant한 모든 브라우저를 지원한다.

### Entry Points

```js
module.exports = {
  // 여러 entry들을 지정할 수 있다.
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js',
  },
};
```

filename 프로퍼티로 출력 파일의 이름을 지정해줄 수 있다.

### Output

### Loaders

### Plugins

### Configuration

### Modules

### Module Resolution

### Module Federation

### Dependency Graph

### Targets

### The Manifest

### Hot Module Replacement

### Why Webpack

### Under the Hood
