const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello');
});
// X-Powered-By: Express 가 사라진다.
// 위치는 상관없나?
app.disable('x-powered-by');
app.listen(3000);
