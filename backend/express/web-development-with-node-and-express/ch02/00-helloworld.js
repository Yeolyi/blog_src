const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // text/html도 가능하지만 저자는 JS 내에서 HTML를 포함시키는 것을 피하려 한다.
  // 자세한 것은 챕터7
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello world!');
});

server.listen(port, () => {
  console.log(`server started on port ${port}`);
});
