// Handlebar 적용 이전

//  책에서는 app file로 지칭
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// 404 handler 이전에 추가해야함
// app.get is the method by which we're adding routes.
// trailing 슬래시나 쿼리스트링을 신경쓰지 않아도 된다.
app.get('/', (req, res) => {
  res.type('text/plain');
  res.send('Meadowlark Travel');
});

app.get('/about', (req, res) => {
  res.type('text/plain');
  res.send('About Meadowlark Travel');
});

// app.use로 미들웨어를 추가한다.
// catchall handler for anything that didn't get matched by a route.
// 따라서 순서가 중요하다.
app.use((req, res) => {
  // 실수로 type/plain으로 했는데 파일이 다운로드됨
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

// 여기만 인자가 4개로 err로 시작하네?
app.use((err, req, res, next) => {
  console.error(err.message);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(port, () => console.log(`Express started on http://localhost:${port}`));
