const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();

const fortunes = [
  'Conquer your fears or they will conquer you.',
  'Rivers need springs.',
  "Do not fear what you don't know.",
  'You will have a pleasant surprise.',
  'Whenever possible, keep it simple',
];

// static 미들웨어는 각 정적 파일에 대한 라우트를 만드는 것과 같은 효과를 가진다.
app.use(express.static(__dirname + '/public'));

app.engine(
  'handlebars',
  // 책에는 engine 안씀. 달라진 듯?
  expressHandlebars.engine({
    defaultLayout: 'main',
  })
);
app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', { fortune: randomFortune });
});

app.use((req, res) => {
  res.status(404);
  res.render('404');
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render('500');
});

app.listen(port, () => console.log(`Express started on http://localhost:${port}`));
