const express = require('express');
const expressHandlebars = require('express-handlebars');
const { credentials } = require('./config');
const flashMiddleware = require('./lib/middleware/flash');

const app = express();
const port = process.env.PORT || 3000;

app.engine(
  'handlebars',
  expressHandlebars.engine({
    defaultLayout: 'main',
  })
);
app.set('view engine', 'handlebars');

const cookieParser = require('cookie-parser');
app.use(cookieParser(credentials.cookieSecret));

const expressSession = require('express-session');
// 쿠키 미들웨어를 미리 적용해야함 유의
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
  })
);

app.use(flashMiddleware);

app.get('/', (req, res) => {
  req.session.flash = {
    type: 'danger',
    intro: 'Database error!',
    message: 'There was a database error; please try again later.',
  };
  return res.redirect(303, '/newsletter/archive');
});

app.get('/newsletter/archive', (req, res) => {
  res.render('homeWithFlash');
});

app.listen(port, () => console.log(`Express started on http://localhost:${port}`));
