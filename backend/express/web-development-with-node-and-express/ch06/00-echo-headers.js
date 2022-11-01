const express = require('express');

const app = express();

app.get('/headers', (req, res) => {
  res.type('text/plain');
  const headers = Object.entries(req.headers).map(([key, value]) => `${key}: ${value}`);
  res.send(headers.join('\n'));
});

app.listen(3000);

/*
host: localhost:3000
upgrade-insecure-requests: 1
accept: text/html,application/xhtml+xml,application/xml;q=0.9,*\/*;q=0.8
user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15
accept-language: ko-KR,ko;q=0.9
accept-encoding: gzip, deflate
connection: keep-alive
*/
