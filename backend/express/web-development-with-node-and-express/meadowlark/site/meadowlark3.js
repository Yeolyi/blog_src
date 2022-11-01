const express = require('express');
const expressHandlebars = require('express-handlebars');
const handlers = require('./lib/handlers');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.engine(
  'handlebars',
  expressHandlebars.engine({
    defaultLayout: 'main',
  })
);
app.set('view engine', 'handlebars');

// 이제 이 handler들을 잘 쓰는지만 테스트하면 된다.
app.get('/', handlers.home);
app.get('/about', handlers.about);
app.use(handlers.notFound);
app.use(handlers.serverError);

// 앱이 모듈로써 require될 수 있도록 수정해야한다.
// 기존에는 직접 실행되기만 가능했던 구조.
// JS 파일을 node로 곧장 실행하면 require.main은 glolbal module과 같다.
if (require.main === module) {
  app.listen(port, () => console.log(`Express started on http://localhost:${port}`));
} else {
  module.exports = app;
}
