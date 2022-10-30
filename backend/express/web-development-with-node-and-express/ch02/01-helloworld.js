const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // regex 해석,,,
  // Clustering without capturing
  // https://stackoverflow.com/questions/3512471/what-is-a-non-capturing-group-in-regular-expressions
  const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
  switch (path) {
    case '':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Homepage');
      break;
    case '/about':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('About');
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      break;
  }
});

server.listen(port, () => {
  console.log(`server started on port ${port}`);
});
